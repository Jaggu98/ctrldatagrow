import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize server-side Supabase client with privileged SERVICE_ROLE key or ANON key
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

const isServerConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  !supabaseUrl.includes('your-project-id')
);

const supabase = createClient(
  supabaseUrl && supabaseUrl.startsWith('http') ? supabaseUrl : 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Ctrl + Data + Grow API',
    supabaseConfigured: isServerConfigured,
    timestamp: new Date().toISOString(),
  });
});

// Middleware: Verify Admin Authorization
const requireAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired authentication session' });
    }

    // Verify user is registered in admin_users or has admin role
    const { data: adminRecord, error: adminErr } = await supabase
      .from('admin_users')
      .select('role')
      .or(`user_id.eq.${user.id},email.eq.${user.email}`)
      .single();

    if (adminErr || !adminRecord) {
      return res.status(403).json({ error: 'Forbidden: User is not an authorized administrator' });
    }

    req.adminUser = user;
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Internal error verifying administrator privileges' });
  }
};

// ====================================================================
// Speaker Registration API Endpoints
// ====================================================================

// POST /api/speakers/register
app.post('/api/speakers/register', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      designation,
      company,
      preferredMode,
      linkedinUrl,
      portfolioUrl,
      topics,
      speakingExperience,
      feeRange,
      agreeVerify,
      resumeUrl,
    } = req.body;

    // Field validation
    if (!fullName || fullName.trim().length < 2) {
      return res.status(400).json({ error: 'Full name is required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Valid email address is required.' });
    }
    if (!phone || phone.replace(/\D/g, '').length < 8) {
      return res.status(400).json({ error: 'Valid phone/WhatsApp number is required.' });
    }
    if (!designation || !company || !topics || !linkedinUrl) {
      return res.status(400).json({ error: 'Designation, company, topics, and LinkedIn profile URL are required.' });
    }

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const registrationId = `SPK-${dateStr}-${randomHex}`;

    const record = {
      registration_id: registrationId,
      full_name: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      designation: designation.trim(),
      company: company.trim(),
      preferred_mode: preferredMode || 'Both Online & Offline (Weekends)',
      linkedin_url: linkedinUrl.trim(),
      portfolio_url: portfolioUrl ? portfolioUrl.trim() : null,
      topics: topics.trim(),
      speaking_experience: speakingExperience ? speakingExperience.trim() : null,
      fee_range: feeRange ? feeRange.trim() : null,
      agree_verify: Boolean(agreeVerify),
      resume_url: resumeUrl || null,
      status: 'pending',
    };

    if (!isServerConfigured) {
      // Mock persistence in dev environment
      return res.status(201).json({
        success: true,
        referenceId: registrationId,
        data: { ...record, id: 'simulated-' + Date.now(), created_at: new Date().toISOString() },
      });
    }

    const { data, error } = await supabase
      .from('speakers')
      .insert([record])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      referenceId: data.registration_id || registrationId,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to submit speaker registration.',
    });
  }
});

// GET /api/admin/speakers
app.get('/api/admin/speakers', requireAdmin, async (req, res) => {
  try {
    const { status, search, limit = 50, offset = 0 } = req.query;

    let query = supabase.from('speakers').select('*', { count: 'exact' });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (search && search.trim().length > 0) {
      const q = `%${search.trim()}%`;
      query = query.or(`full_name.ilike.${q},email.ilike.${q},company.ilike.${q},topics.ilike.${q},registration_id.ilike.${q}`);
    }

    query = query.order('created_at', { ascending: false }).range(Number(offset), Number(offset) + Number(limit) - 1);

    const { data, error, count } = await query;
    if (error) throw error;

    res.json({
      speakers: data || [],
      total: count || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch speakers.' });
  }
});

// PATCH /api/admin/speakers/:id/status
app.patch('/api/admin/speakers/:id/status', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, internalNotes } = req.body;

    const allowed = ['pending', 'under_review', 'approved', 'rejected'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${allowed.join(', ')}` });
    }

    const updatePayload = {
      status,
      updated_at: new Date().toISOString(),
      reviewed_by: req.adminUser.id,
      reviewed_at: new Date().toISOString(),
    };

    if (internalNotes) updatePayload.internal_notes = internalNotes;

    const { data, error } = await supabase
      .from('speakers')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, speaker: data });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to update speaker status.' });
  }
});

// ====================================================================
// Campus Ambassador Registration API Endpoints
// ====================================================================

// POST /api/campus-ambassadors/register
app.post('/api/campus-ambassadors/register', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      collegeName,
      cityState,
      branch,
      yearOfStudy,
      linkedinUrl,
      clubInvolvement,
      outreachPlan,
      resumeUrl,
    } = req.body;

    // Field validation
    if (!fullName || fullName.trim().length < 2) {
      return res.status(400).json({ error: 'Full name is required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Valid email address is required.' });
    }
    if (!phone || phone.replace(/\D/g, '').length < 8) {
      return res.status(400).json({ error: 'Valid WhatsApp number is required.' });
    }
    if (!collegeName || !cityState || !branch || !linkedinUrl || !outreachPlan) {
      return res.status(400).json({ error: 'College name, location, branch, LinkedIn URL, and outreach plan are required.' });
    }

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const applicationId = `AMB-${dateStr}-${randomHex}`;

    const record = {
      application_id: applicationId,
      full_name: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      college_name: collegeName.trim(),
      city_state: cityState.trim(),
      branch: branch.trim(),
      year_of_study: yearOfStudy || '3rd Year',
      linkedin_url: linkedinUrl.trim(),
      club_involvement: clubInvolvement ? clubInvolvement.trim() : null,
      outreach_plan: outreachPlan.trim(),
      resume_url: resumeUrl || null,
      status: 'pending',
    };

    if (!isServerConfigured) {
      return res.status(201).json({
        success: true,
        referenceId: applicationId,
        data: { ...record, id: 'simulated-' + Date.now(), created_at: new Date().toISOString() },
      });
    }

    const { data, error } = await supabase
      .from('campus_ambassadors')
      .insert([record])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      referenceId: data.application_id || applicationId,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to submit campus ambassador application.',
    });
  }
});

// GET /api/admin/campus-ambassadors
app.get('/api/admin/campus-ambassadors', requireAdmin, async (req, res) => {
  try {
    const { status, search, limit = 50, offset = 0 } = req.query;

    let query = supabase.from('campus_ambassadors').select('*', { count: 'exact' });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (search && search.trim().length > 0) {
      const q = `%${search.trim()}%`;
      query = query.or(`full_name.ilike.${q},email.ilike.${q},college_name.ilike.${q},branch.ilike.${q},application_id.ilike.${q}`);
    }

    query = query.order('created_at', { ascending: false }).range(Number(offset), Number(offset) + Number(limit) - 1);

    const { data, error, count } = await query;
    if (error) throw error;

    res.json({
      ambassadors: data || [],
      total: count || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch campus ambassadors.' });
  }
});

// PATCH /api/admin/campus-ambassadors/:id/status
app.patch('/api/admin/campus-ambassadors/:id/status', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, internalNotes } = req.body;

    const allowed = ['pending', 'under_review', 'approved', 'rejected'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${allowed.join(', ')}` });
    }

    const updatePayload = {
      status,
      updated_at: new Date().toISOString(),
      reviewed_by: req.adminUser.id,
      reviewed_at: new Date().toISOString(),
    };

    if (internalNotes) updatePayload.internal_notes = internalNotes;

    const { data, error } = await supabase
      .from('campus_ambassadors')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, ambassador: data });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to update ambassador status.' });
  }
});

// Start listening if run directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Ctrl + Data + Grow API server running on port ${PORT}`);
    console.log(`📡 Supabase connection status: ${isServerConfigured ? 'Configured ✅' : 'Pending configuration ⚠️'}`);
  });
}

export default app;
