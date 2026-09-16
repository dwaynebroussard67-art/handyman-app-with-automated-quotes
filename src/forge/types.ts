export type UserRole = 'trainee' | 'rep' | 'admin';
export type TrainingStatus = 'in_progress' | 'training_complete' | 'promoted' | 'not_promoted';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  training_status: TrainingStatus;
  approved_at: string;
  promoted_to_rep_at: string | null;
  created_at: string;
  phone?: string;
  avatar_url?: string;
  notes?: string;
}

export interface TrainingModule {
  id: string;
  day_number: number;
  title: string;
  phase: 'Foundation' | 'Graduated Field Practice' | 'Mastery & Capstone';
  summary: string;
  content: string;
  action_item: string;
  display_order: number;
  read_time_minutes: number;
}

export interface TrainingProgress {
  id: string;
  user_id: string;
  module_id: string;
  completed_at: string;
  notes?: string;
}

export interface TrainingGift {
  id: string;
  user_id: string;
  business_or_project_name: string;
  project_description?: string;
  spec_site_url: string;
  built_at: string | null;
  editor_access_granted: boolean;
  call_scheduled_at: string | null;
  call_completed_at: string | null;
  call_outcome: 'approved' | 'not_approved' | 'pending';
  d_notes?: string;
  created_at: string;
}

export type TargetSource = 'auto' | 'self_sourced';
export type TargetStatus =
  | 'queued'
  | 'building'
  | 'ready'
  | 'downloaded'
  | 'sold'
  | 'declined'
  | 'no_contact';

export interface Target {
  id: string;
  rep_id: string;
  rep_name?: string;
  business_name: string;
  category: string;
  city: string;
  state: string;
  contact_info: {
    owner_name: string;
    phone: string;
    email: string;
    address: string;
    google_rating?: number;
    review_count?: number;
  };
  spec_site_url: string;
  pitch_notes: {
    hook: string;
    existing_pain: string;
    demo_angle: string;
    objection_prep: string;
    close_script: string;
  };
  source: TargetSource;
  status: TargetStatus;
  requested_at: string;
  built_at: string | null;
  downloaded_at: string | null;
  outcome_logged_at: string | null;
  notes?: string;
}

export interface Sale {
  id: string;
  rep_id: string;
  rep_name?: string;
  target_id: string | null;
  customer_name: string;
  customer_email: string;
  amount: number;
  subscription_upsell: boolean;
  commission_base: number;
  commission_bonus: number;
  total_commission: number;
  payment_intent_id?: string;
  closed_at: string;
  paid_at: string | null;
}

export type AdditionType = 'page' | 'feature' | 'custom';
export type PaymentStatus = 'quoted' | 'paid' | 'refunded';
export type BuildStatus = 'quoted' | 'paid' | 'building' | 'shipped';

export interface AdditionRequest {
  id: string;
  rep_id: string;
  rep_name?: string;
  sale_id: string | null;
  target_id: string | null;
  site_name: string;
  type: AdditionType;
  description: string;
  price: number;
  commission: number;
  payment_status: PaymentStatus;
  build_status: BuildStatus;
  requested_at: string;
  shipped_at: string | null;
  paid_at: string | null;
  stripe_payment_id?: string;
}

export interface ApplicationSubmission {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  sales_experience: 'None' | 'Some' | 'Experienced';
  traits: string[];
  availability: string;
  why: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  reviewed_at?: string;
}
