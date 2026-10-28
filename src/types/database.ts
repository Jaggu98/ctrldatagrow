// Database TypeScript interfaces for Supabase PostgreSQL tables

export type ApplicationStatus = 'pending' | 'under_review' | 'approved' | 'rejected';

export interface Speaker {
  id: string;
  registration_id: string;
  full_name: string;
  email: string;
  phone: string;
  designation: string;
  company: string;
  preferred_mode: string;
  linkedin_url: string;
  portfolio_url?: string | null;
  topics: string;
  speaking_experience?: string | null;
  fee_range?: string | null;
  agree_verify: boolean;
  resume_url?: string | null;
  status: ApplicationStatus;
  internal_notes?: string | null;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  created_at: string;
  updated_at: string;
}

export type SpeakerInsert = Omit<Speaker, 'id' | 'registration_id' | 'status' | 'created_at' | 'updated_at' | 'internal_notes' | 'reviewed_by' | 'reviewed_at'> & {
  registration_id?: string;
  status?: ApplicationStatus;
};

export interface CampusAmbassador {
  id: string;
  application_id: string;
  full_name: string;
  email: string;
  phone: string;
  college_name: string;
  city_state: string;
  branch: string;
  year_of_study: string;
  linkedin_url: string;
  club_involvement?: string | null;
  outreach_plan: string;
  resume_url?: string | null;
  status: ApplicationStatus;
  internal_notes?: string | null;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  created_at: string;
  updated_at: string;
}

export type CampusAmbassadorInsert = Omit<CampusAmbassador, 'id' | 'application_id' | 'status' | 'created_at' | 'updated_at' | 'internal_notes' | 'reviewed_by' | 'reviewed_at'> & {
  application_id?: string;
  status?: ApplicationStatus;
};

export interface AdminUser {
  id: string;
  user_id: string;
  email: string;
  role: 'admin' | 'super_admin';
  full_name?: string | null;
  created_at: string;
}

export interface SubmissionResponse<T> {
  success: boolean;
  data?: T;
  referenceId?: string;
  error?: string;
}
