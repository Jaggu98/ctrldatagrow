import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { CampusAmbassador, CampusAmbassadorInsert, ApplicationStatus, SubmissionResponse } from '../types/database';

export interface AmbassadorFormInput {
  fullName: string;
  email: string;
  phone: string;
  collegeName: string;
  cityState: string;
  branch: string;
  yearOfStudy: string;
  linkedinUrl: string;
  clubInvolvement?: string;
  outreachPlan: string;
  resumeUrl?: string;
}

export interface AmbassadorFilterOptions {
  status?: ApplicationStatus | 'all';
  searchQuery?: string;
  limit?: number;
  offset?: number;
}

/**
 * Validate campus ambassador application form inputs
 */
export const validateAmbassadorInput = (input: AmbassadorFormInput): { isValid: boolean; error?: string } => {
  if (!input.fullName || input.fullName.trim().length < 2) {
    return { isValid: false, error: 'Please enter your full name.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }

  const cleanPhone = input.phone.replace(/[\s\-\(\)\+]/g, '');
  if (!input.phone || cleanPhone.length < 8) {
    return { isValid: false, error: 'Please enter a valid WhatsApp phone number.' };
  }

  if (!input.collegeName || input.collegeName.trim().length < 2) {
    return { isValid: false, error: 'Please enter your college or university name.' };
  }

  if (!input.cityState || input.cityState.trim().length < 2) {
    return { isValid: false, error: 'Please enter your college city and state.' };
  }

  if (!input.branch || input.branch.trim().length < 2) {
    return { isValid: false, error: 'Please specify your department or branch (e.g. CSE, AI, ECE).' };
  }

  if (!input.linkedinUrl || !input.linkedinUrl.includes('linkedin.com')) {
    return { isValid: false, error: 'Please enter a valid LinkedIn profile URL for student verification.' };
  }

  if (!input.outreachPlan || input.outreachPlan.trim().length < 10) {
    return { isValid: false, error: 'Please briefly describe how you plan to connect CDG with student clubs or campus heads.' };
  }

  return { isValid: true };
};

/**
 * Generate a unique client-side application ID (AMB-YYYYMMDD-XXXXXX)
 */
export const generateAmbassadorReferenceId = (): string => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `AMB-${dateStr}-${randomStr}`;
};

/**
 * Submit campus ambassador application to Supabase with automatic retry
 */
export const submitCampusAmbassador = async (
  input: AmbassadorFormInput
): Promise<SubmissionResponse<CampusAmbassador>> => {
  // 1. Validate fields
  const validation = validateAmbassadorInput(input);
  if (!validation.isValid) {
    return { success: false, error: validation.error };
  }

  // 2. Check Supabase config
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: 'Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables (e.g. in Vercel Project Settings).',
    };
  }

  const generatedRef = generateAmbassadorReferenceId();

  const record: CampusAmbassadorInsert = {
    application_id: generatedRef,
    full_name: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    college_name: input.collegeName.trim(),
    city_state: input.cityState.trim(),
    branch: input.branch.trim(),
    year_of_study: input.yearOfStudy,
    linkedin_url: input.linkedinUrl.trim(),
    club_involvement: input.clubInvolvement?.trim() || null,
    outreach_plan: input.outreachPlan.trim(),
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
        .from('campus_ambassadors')
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
        await new Promise((resolve) => setTimeout(resolve, attempts * 400));
      }
    }
  }

  const errorMsg =
    lastError?.message ||
    lastError?.error_description ||
    'Network error: Failed to submit ambassador application. Please check your internet connection and try again.';

  return {
    success: false,
    error: errorMsg,
  };
};

/**
 * Administrative: Fetch campus ambassador applications with filtering and pagination
 */
export const fetchCampusAmbassadors = async (
  options: AmbassadorFilterOptions = {}
): Promise<{ ambassadors: CampusAmbassador[]; totalCount: number; error?: string }> => {
  try {
    let query = supabase.from('campus_ambassadors').select('*', { count: 'exact' });

    if (options.status && options.status !== 'all') {
      query = query.eq('status', options.status);
    }

    if (options.searchQuery && options.searchQuery.trim().length > 0) {
      const q = `%${options.searchQuery.trim()}%`;
      query = query.or(
        `full_name.ilike.${q},email.ilike.${q},college_name.ilike.${q},city_state.ilike.${q},branch.ilike.${q},application_id.ilike.${q}`
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
      ambassadors: (data as CampusAmbassador[]) || [],
      totalCount: count || 0,
    };
  } catch (err: any) {
    return {
      ambassadors: [],
      totalCount: 0,
      error: err?.message || 'Failed to fetch campus ambassador applications.',
    };
  }
};

/**
 * Administrative: Update campus ambassador status
 */
export const updateAmbassadorStatus = async (
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
      .from('campus_ambassadors')
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
 * Export ambassador records to formatted CSV string
 */
export const exportAmbassadorsToCsv = (ambassadors: CampusAmbassador[]): string => {
  const headers = [
    'Application ID',
    'Full Name',
    'Email',
    'Phone',
    'College Name',
    'City & State',
    'Branch',
    'Year of Study',
    'LinkedIn URL',
    'Club Involvement',
    'Outreach Plan',
    'Status',
    'Submitted At',
  ];

  const rows = ambassadors.map((a) => [
    `"${a.application_id || ''}"`,
    `"${(a.full_name || '').replace(/"/g, '""')}"`,
    `"${a.email || ''}"`,
    `"${a.phone || ''}"`,
    `"${(a.college_name || '').replace(/"/g, '""')}"`,
    `"${(a.city_state || '').replace(/"/g, '""')}"`,
    `"${(a.branch || '').replace(/"/g, '""')}"`,
    `"${(a.year_of_study || '').replace(/"/g, '""')}"`,
    `"${a.linkedin_url || ''}"`,
    `"${(a.club_involvement || '').replace(/"/g, '""')}"`,
    `"${(a.outreach_plan || '').replace(/"/g, '""')}"`,
    `"${a.status || ''}"`,
    `"${new Date(a.created_at).toLocaleString()}"`,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
};
