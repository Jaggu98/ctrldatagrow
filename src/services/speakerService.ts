import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Speaker, SpeakerInsert, ApplicationStatus, SubmissionResponse } from '../types/database';

export interface SpeakerFormInput {
  fullName: string;
  email: string;
  phone: string;
  designation: string;
  company: string;
  preferredMode: string;
  linkedinUrl: string;
  portfolioUrl?: string;
  topics: string;
  speakingExperience?: string;
  feeRange?: string;
  agreeVerify: boolean;
  resumeUrl?: string;
}

export interface SpeakerFilterOptions {
  status?: ApplicationStatus | 'all';
  searchQuery?: string;
  limit?: number;
  offset?: number;
}

/**
 * Validate speaker registration form inputs
 */
export const validateSpeakerInput = (input: SpeakerFormInput): { isValid: boolean; error?: string } => {
  if (!input.fullName || input.fullName.trim().length < 2) {
    return { isValid: false, error: 'Please enter your full name.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }

  const cleanPhone = input.phone.replace(/[\s\-\(\)\+]/g, '');
  if (!input.phone || cleanPhone.length < 8) {
    return { isValid: false, error: 'Please enter a valid phone/WhatsApp number.' };
  }

  if (!input.designation || input.designation.trim().length < 2) {
    return { isValid: false, error: 'Please enter your current designation or role.' };
  }

  if (!input.company || input.company.trim().length < 2) {
    return { isValid: false, error: 'Please enter your company or organization name.' };
  }

  if (!input.linkedinUrl || !input.linkedinUrl.includes('linkedin.com')) {
    return { isValid: false, error: 'Please enter a valid LinkedIn profile URL (mandatory for verification).' };
  }

  if (!input.topics || input.topics.trim().length < 3) {
    return { isValid: false, error: 'Please enter your key topics or domains of expertise.' };
  }

  return { isValid: true };
};

/**
 * Generate a unique client-side registration ID (SPK-YYYYMMDD-XXXXXX)
 */
export const generateSpeakerReferenceId = (): string => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `SPK-${dateStr}-${randomStr}`;
};

/**
 * Submit speaker application to Supabase with automatic retry on network glitches
 */
export const submitSpeakerApplication = async (
  input: SpeakerFormInput
): Promise<SubmissionResponse<Speaker>> => {
  // 1. Validate fields
  const validation = validateSpeakerInput(input);
  if (!validation.isValid) {
    return { success: false, error: validation.error };
  }

  // 2. Check Supabase config
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Simulating fallback persistence in development.');
    // Simulated fallback response for local development when credentials are still pending
    const simRef = generateSpeakerReferenceId();
    return {
      success: true,
      referenceId: simRef,
      data: {
        id: crypto.randomUUID ? crypto.randomUUID() : 'simulated-id',
        registration_id: simRef,
        full_name: input.fullName.trim(),
        email: input.email.trim(),
        phone: input.phone.trim(),
        designation: input.designation.trim(),
        company: input.company.trim(),
        preferred_mode: input.preferredMode,
        linkedin_url: input.linkedinUrl.trim(),
        portfolio_url: input.portfolioUrl?.trim() || null,
        topics: input.topics.trim(),
        speaking_experience: input.speakingExperience?.trim() || null,
        fee_range: input.feeRange?.trim() || null,
        agree_verify: input.agreeVerify,
        resume_url: input.resumeUrl || null,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    };
  }

  const generatedRef = generateSpeakerReferenceId();

  const record: SpeakerInsert = {
    registration_id: generatedRef,
    full_name: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    designation: input.designation.trim(),
    company: input.company.trim(),
    preferred_mode: input.preferredMode,
    linkedin_url: input.linkedinUrl.trim(),
    portfolio_url: input.portfolioUrl?.trim() || null,
    topics: input.topics.trim(),
    speaking_experience: input.speakingExperience?.trim() || null,
    fee_range: input.feeRange?.trim() || null,
    agree_verify: input.agreeVerify,
    resume_url: input.resumeUrl || null,
    status: 'pending',
  };

  // 3. Execution with exponential backoff retry (up to 2 retries)
  let attempts = 0;
  const maxAttempts = 2;
  let lastError: any = null;

  while (attempts <= maxAttempts) {
    try {
      const { error } = await supabase
        .from('speakers')
        .insert([record]);

      if (error) {
        throw error;
      }

      return {
        success: true,
        referenceId: generatedRef,
      };
    } catch (err: any) {
      lastError = err;
      attempts++;
      if (attempts <= maxAttempts) {
        // Exponential backoff delay: 400ms, then 800ms
        await new Promise((resolve) => setTimeout(resolve, attempts * 400));
      }
    }
  }

  // Format user-friendly error message
  const errorMsg =
    lastError?.message ||
    lastError?.error_description ||
    'Network error: Failed to submit speaker application. Please check your internet connection and try again.';

  return {
    success: false,
    error: errorMsg,
  };
};

/**
 * Administrative: Fetch speaker applications with filtering and pagination
 */
export const fetchSpeakers = async (
  options: SpeakerFilterOptions = {}
): Promise<{ speakers: Speaker[]; totalCount: number; error?: string }> => {
  try {
    let query = supabase.from('speakers').select('*', { count: 'exact' });

    if (options.status && options.status !== 'all') {
      query = query.eq('status', options.status);
    }

    if (options.searchQuery && options.searchQuery.trim().length > 0) {
      const q = `%${options.searchQuery.trim()}%`;
      query = query.or(
        `full_name.ilike.${q},email.ilike.${q},company.ilike.${q},designation.ilike.${q},topics.ilike.${q},registration_id.ilike.${q}`
      );
    }

    query = query.order('created_at', { ascending: false });

    if (typeof options.limit === 'number') {
      const offset = options.offset || 0;
      query = query.range(offset, offset + options.limit - 1);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      speakers: (data as Speaker[]) || [],
      totalCount: count || 0,
    };
  } catch (err: any) {
    return {
      speakers: [],
      totalCount: 0,
      error: err?.message || 'Failed to fetch speaker applications.',
    };
  }
};

/**
 * Administrative: Update speaker status (e.g., pending -> approved / rejected)
 */
export const updateSpeakerStatus = async (
  id: string,
  status: ApplicationStatus,
  internalNotes?: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const updatePayload: any = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (typeof internalNotes === 'string') {
      updatePayload.internal_notes = internalNotes;
    }

    const { error } = await supabase
      .from('speakers')
      .update(updatePayload)
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to update application status.',
    };
  }
};

/**
 * Export speaker records to formatted CSV string
 */
export const exportSpeakersToCsv = (speakers: Speaker[]): string => {
  const headers = [
    'Registration ID',
    'Full Name',
    'Email',
    'Phone',
    'Designation',
    'Company',
    'Preferred Mode',
    'LinkedIn URL',
    'Portfolio URL',
    'Topics',
    'Speaking Experience',
    'Fee Range',
    'Status',
    'Submitted At',
  ];

  const rows = speakers.map((s) => [
    `"${s.registration_id || ''}"`,
    `"${(s.full_name || '').replace(/"/g, '""')}"`,
    `"${s.email || ''}"`,
    `"${s.phone || ''}"`,
    `"${(s.designation || '').replace(/"/g, '""')}"`,
    `"${(s.company || '').replace(/"/g, '""')}"`,
    `"${(s.preferred_mode || '').replace(/"/g, '""')}"`,
    `"${s.linkedin_url || ''}"`,
    `"${s.portfolio_url || ''}"`,
    `"${(s.topics || '').replace(/"/g, '""')}"`,
    `"${(s.speaking_experience || '').replace(/"/g, '""')}"`,
    `"${(s.fee_range || '').replace(/"/g, '""')}"`,
    `"${s.status || ''}"`,
    `"${new Date(s.created_at).toLocaleString()}"`,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
};
