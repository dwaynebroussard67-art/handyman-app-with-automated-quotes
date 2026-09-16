-- ============================================================================
-- Forge Mode Sales Pipeline + Training Portal — Schema Migration
-- Database: Supabase / Postgres
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE (Integrated with Forge Mode Auth / Access Tiers)
-- Roles: 'trainee' | 'rep' | 'admin'
-- Trainees who completed modules transition through status 'training_complete'
-- before D's manual promotion to 'rep'.
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('trainee', 'rep', 'admin')),
  training_status TEXT NOT NULL DEFAULT 'in_progress' CHECK (training_status IN ('in_progress', 'training_complete', 'promoted', 'not_promoted')),
  approved_at TIMESTAMPTZ DEFAULT NOW(),
  promoted_to_rep_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  phone TEXT,
  notes TEXT
);

-- 2. TRAINING MODULES (60-Day Program seed structured from OPERATOR-PLAYBOOK)
CREATE TABLE IF NOT EXISTS public.training_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  day_number INT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  phase TEXT NOT NULL, -- 'Foundation' | 'Graduated Field Practice' | 'Mastery & Capstone'
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  action_item TEXT NOT NULL,
  display_order INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TRAINING PROGRESS (Tracks module completion per trainee)
CREATE TABLE IF NOT EXISTS public.training_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES public.training_modules(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  UNIQUE(user_id, module_id)
);

-- 4. TRAINING GIFTS (§5a End-of-Training Compensation)
-- Real site built for trainee ($250+ value) regardless of promotion outcome
CREATE TABLE IF NOT EXISTS public.training_gifts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  business_or_project_name TEXT NOT NULL,
  project_description TEXT,
  spec_site_url TEXT,
  built_at TIMESTAMPTZ,
  editor_access_granted BOOLEAN DEFAULT FALSE,
  call_scheduled_at TIMESTAMPTZ,
  call_completed_at TIMESTAMPTZ,
  call_outcome TEXT CHECK (call_outcome IN ('approved', 'not_approved', 'pending')),
  d_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TARGETS (Overnight-built prospect queue)
-- Status flow: queued -> building -> ready -> downloaded -> sold | declined | no_contact
CREATE TABLE IF NOT EXISTS public.targets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rep_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  category TEXT,
  city TEXT,
  state TEXT,
  phone TEXT,
  email TEXT,
  decision_maker TEXT,
  contact_info TEXT, -- Full packet with phone/email/address (hidden until download)
  spec_site_url TEXT,
  pitch_notes TEXT,
  source TEXT NOT NULL DEFAULT 'auto' CHECK (source IN ('auto', 'self_sourced')),
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'building', 'ready', 'downloaded', 'sold', 'declined', 'no_contact')),
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  built_at TIMESTAMPTZ,
  downloaded_at TIMESTAMPTZ,
  outcome_logged_at TIMESTAMPTZ,
  notes TEXT
);

-- 6. SALES (Closed deals & commission tracking)
-- Minimum custom sale: $500.00 (no cap) -> 25% base commission ($125.00 min) + optional $50 same-day subscription upsell bonus
CREATE TABLE IF NOT EXISTS public.sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rep_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  target_id UUID REFERENCES public.targets(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  amount NUMERIC(10, 2) NOT NULL DEFAULT 500.00,
  subscription_upsell BOOLEAN NOT NULL DEFAULT FALSE,
  commission_base NUMERIC(10, 2) NOT NULL DEFAULT 125.00,
  commission_bonus NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  payment_intent_id TEXT,
  closed_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

-- 7. ADDITION REQUESTS (Upsell / post-sale pipeline)
-- Types: 'page' ($75 / $18.75 comm), 'feature' ($150 / $37.50 comm), 'custom' (quoted, 25% comm)
CREATE TABLE IF NOT EXISTS public.addition_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rep_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  sale_id UUID REFERENCES public.sales(id) ON DELETE SET NULL,
  target_id UUID REFERENCES public.targets(id) ON DELETE SET NULL,
  site_name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('page', 'feature', 'custom')),
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  commission NUMERIC(10, 2) NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'quoted' CHECK (payment_status IN ('quoted', 'paid', 'refunded')),
  build_status TEXT NOT NULL DEFAULT 'quoted' CHECK (build_status IN ('quoted', 'paid', 'building', 'shipped')),
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  shipped_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  stripe_payment_id TEXT
);

-- 8. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_targets_rep_status ON public.targets (rep_id, status);
CREATE INDEX IF NOT EXISTS idx_targets_status ON public.targets (status);
CREATE INDEX IF NOT EXISTS idx_training_progress_user ON public.training_progress (user_id);
CREATE INDEX IF NOT EXISTS idx_sales_rep ON public.sales (rep_id);
CREATE INDEX IF NOT EXISTS idx_addition_requests_rep ON public.addition_requests (rep_id);
CREATE INDEX IF NOT EXISTS idx_addition_requests_status ON public.addition_requests (build_status, payment_status);

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addition_requests ENABLE ROW LEVEL SECURITY;

-- Reading training modules is open to all authenticated users
CREATE POLICY "Training modules readable by authenticated"
  ON public.training_modules FOR SELECT
  TO authenticated USING (true);

-- Users can read their own user record or admin can read all
CREATE POLICY "Users read own or admin all"
  ON public.users FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- Trainee progress: user reads/inserts their own, admin reads all
CREATE POLICY "Training progress self or admin"
  ON public.training_progress FOR ALL
  TO authenticated
  USING (auth.uid() = user_id OR (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- Targets: rep reads their own 'ready' or 'downloaded' or 'sold', admin reads all
CREATE POLICY "Targets rep own or admin"
  ON public.targets FOR ALL
  TO authenticated
  USING (auth.uid() = rep_id OR (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- Sales: rep reads own, admin reads all
CREATE POLICY "Sales rep own or admin"
  ON public.sales FOR ALL
  TO authenticated
  USING (auth.uid() = rep_id OR (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');

-- Addition requests: rep reads/creates own, admin reads/updates all
CREATE POLICY "Additions rep own or admin"
  ON public.addition_requests FOR ALL
  TO authenticated
  USING (auth.uid() = rep_id OR (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');
