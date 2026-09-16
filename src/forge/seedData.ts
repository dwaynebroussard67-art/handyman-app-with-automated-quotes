import {
  User,
  Target,
  Sale,
  AdditionRequest,
  ApplicationSubmission,
  TrainingGift,
  TrainingProgress,
  SEED_TRAINING_MODULES
} from './seedModules';

// Re-export seed modules
export { SEED_TRAINING_MODULES };

export const SEED_USERS: User[] = [
  {
    id: 'user-admin-d',
    email: 'd@forgemode.com',
    full_name: 'Dwayne "D" Broussard',
    role: 'admin',
    training_status: 'promoted',
    approved_at: '2026-06-01T08:00:00Z',
    promoted_to_rep_at: '2026-06-01T08:00:00Z',
    created_at: '2026-06-01T08:00:00Z',
    phone: '(337) 555-0199',
    notes: 'Founder & Operator, Forge Mode'
  },
  {
    id: 'user-rep-marcus',
    email: 'marcus.vance@forgemode.com',
    full_name: 'Marcus Vance',
    role: 'rep',
    training_status: 'promoted',
    approved_at: '2026-07-01T09:00:00Z',
    promoted_to_rep_at: '2026-08-01T14:30:00Z',
    created_at: '2026-07-01T09:00:00Z',
    phone: '(337) 555-0142',
    notes: 'Top performing sales hire. High daily queue discipline.'
  },
  {
    id: 'user-trainee-sarah',
    email: 'sarah.miller@forgemode.com',
    full_name: 'Sarah Miller',
    role: 'trainee',
    training_status: 'in_progress',
    approved_at: '2026-08-15T11:00:00Z',
    promoted_to_rep_at: null,
    created_at: '2026-08-15T11:00:00Z',
    phone: '(337) 555-0188',
    notes: 'Approved applicant currently working through Day 1-7 Foundation modules.'
  },
  {
    id: 'user-trainee-caleb',
    email: 'caleb.landry@forgemode.com',
    full_name: 'Caleb Landry',
    role: 'trainee',
    training_status: 'training_complete',
    approved_at: '2026-07-10T10:00:00Z',
    promoted_to_rep_at: null,
    created_at: '2026-07-10T10:00:00Z',
    phone: '(337) 555-0163',
    notes: 'Finished all 60 days of modules! Gift site submitted; awaiting end-of-training call with D.'
  }
];

export const SEED_PROGRESS: TrainingProgress[] = [
  // Sarah has completed Days 1, 2, 3
  {
    id: 'prog-sarah-1',
    user_id: 'user-trainee-sarah',
    module_id: 'mod-1',
    completed_at: '2026-08-16T14:20:00Z',
  },
  {
    id: 'prog-sarah-2',
    user_id: 'user-trainee-sarah',
    module_id: 'mod-2',
    completed_at: '2026-08-17T16:10:00Z',
  },
  {
    id: 'prog-sarah-3',
    user_id: 'user-trainee-sarah',
    module_id: 'mod-3',
    completed_at: '2026-08-18T10:45:00Z',
  },
  // Marcus has completed all
  ...SEED_TRAINING_MODULES.map((m, idx) => ({
    id: `prog-marcus-${idx}`,
    user_id: 'user-rep-marcus',
    module_id: m.id,
    completed_at: '2026-07-28T18:00:00Z'
  })),
  // Caleb has completed all and is in training_complete status
  ...SEED_TRAINING_MODULES.map((m, idx) => ({
    id: `prog-caleb-${idx}`,
    user_id: 'user-trainee-caleb',
    module_id: m.id,
    completed_at: '2026-08-30T17:00:00Z'
  }))
];

export const SEED_TRAINING_GIFTS: TrainingGift[] = [
  {
    id: 'gift-caleb',
    user_id: 'user-trainee-caleb',
    business_or_project_name: "Caleb's Custom Cypress Woodworking",
    project_description: 'Handcrafted outdoor Louisiana cypress picnic tables, swings, and cutting boards.',
    spec_site_url: 'https://caleb-cypress-craft.forgemode.preview',
    built_at: '2026-09-01T12:00:00Z',
    editor_access_granted: true,
    call_scheduled_at: '2026-09-17T15:00:00Z',
    call_completed_at: null,
    call_outcome: 'pending',
    d_notes: 'Caleb built great momentum in mock calls. Ready to evaluate on tomorrow call.',
    created_at: '2026-08-31T10:00:00Z'
  },
  {
    id: 'gift-marcus',
    user_id: 'user-rep-marcus',
    business_or_project_name: 'Vance Mobile Detailing Acadiana',
    project_description: 'Ceramic coatings and truck wash for oilfield and farm trucks.',
    spec_site_url: 'https://vance-detailing.forgemode.preview',
    built_at: '2026-08-01T12:00:00Z',
    editor_access_granted: true,
    call_scheduled_at: '2026-08-01T14:00:00Z',
    call_completed_at: '2026-08-01T14:30:00Z',
    call_outcome: 'approved',
    d_notes: 'Strong closer, hungry, values aligned. Approved on the call.',
    created_at: '2026-07-29T09:00:00Z'
  }
];

export const SEED_TARGETS: Target[] = [
  {
    id: 'target-1',
    rep_id: 'user-rep-marcus',
    rep_name: 'Marcus Vance',
    business_name: 'Broussard & Sons Cajun Backhoe Service',
    category: 'Excavation & Trenching',
    city: 'Erath',
    state: 'LA',
    contact_info: {
      owner_name: 'Tommy Broussard',
      phone: '(337) 937-4412',
      email: 'tbroussardexcavation@gmail.com',
      address: '1402 S Broadway St, Erath, LA 70533',
      google_rating: 4.9,
      review_count: 38
    },
    spec_site_url: 'https://spec-broussard-backhoe.forgemode.preview',
    pitch_notes: {
      hook: "Tommy, you're the highest-rated backhoe crew in Vermilion Parish with 38 five-star reviews, but when people search on phones in Abbeville they find an unformatted yellow-pages stub.",
      existing_pain: 'No automated trenching or culvert calculator; loses weekend emergency jobs to Lafayette contractors.',
      demo_angle: 'Pull up the spec site on your phone right now: look at the instant culvert install estimator and one-tap emergency dispatch button.',
      objection_prep: 'If he says he has enough work: "This filters out tire-kickers so you only dig 200ft+ jobs."',
      close_script: "It's built and ready to map to broussardbackhoe.com tonight starting at $500 minimum custom launch with no ceiling. Can I send the Stripe deposit link?"
    },
    source: 'auto',
    status: 'ready',
    requested_at: '2026-09-15T18:00:00Z',
    built_at: '2026-09-16T01:14:00Z',
    downloaded_at: null,
    outcome_logged_at: null
  },
  {
    id: 'target-2',
    rep_id: 'user-rep-marcus',
    rep_name: 'Marcus Vance',
    business_name: 'Pelican State Small Engine Repair',
    category: 'Mower & Equipment Repair',
    city: 'Abbeville',
    state: 'LA',
    contact_info: {
      owner_name: 'Dale Hebert',
      phone: '(337) 893-1944',
      email: 'dale@pelicanengines.net',
      address: '2214 Veterans Memorial Dr, Abbeville, LA 70510',
      google_rating: 4.8,
      review_count: 52
    },
    spec_site_url: 'https://spec-pelican-smallengine.forgemode.preview',
    pitch_notes: {
      hook: "Dale, your shop is backed up 3 weeks on zero-turns, but you're still answering the phone 50 times a day telling folks what a carburetor overhaul costs.",
      existing_pain: 'Wasting 3 hours daily giving routine pricing over the counter.',
      demo_angle: 'Our spec site features the instant diagnostic quote tool. Customers pick their mower brand, see baseline service rates, and pre-pay their $50 drop-off deposit.',
      objection_prep: 'If he says he does not use computers: "Your customers do. 84% look up repair shops on mobile phones."',
      close_script: 'We already imported your standard tune-up checklist. $500 minimum custom launch flips it live by sundown.'
    },
    source: 'auto',
    status: 'ready',
    requested_at: '2026-09-15T18:00:00Z',
    built_at: '2026-09-16T01:22:00Z',
    downloaded_at: null,
    outcome_logged_at: null
  },
  {
    id: 'target-3',
    rep_id: 'user-rep-marcus',
    rep_name: 'Marcus Vance',
    business_name: 'Bayou Country Metal Roofing',
    category: 'Contractor / Roofing',
    city: 'Kaplan',
    state: 'LA',
    contact_info: {
      owner_name: 'Keith LeBlanc',
      phone: '(337) 643-2281',
      email: 'keith@bayoumetalroof.com',
      address: '809 N Eleazar Ave, Kaplan, LA 70548',
      google_rating: 4.7,
      review_count: 29
    },
    spec_site_url: 'https://spec-bayou-metalroof.forgemode.preview',
    pitch_notes: {
      hook: 'Keith, hurricane season is when metal roofers either feast or lose quotes to big marketing firms from Baton Rouge.',
      existing_pain: 'His existing site was created in 2011 and has flash errors on mobile.',
      demo_angle: 'Show him the standing seam vs exposed fastener visual selector with instant price-per-square-foot estimate.',
      objection_prep: 'If he says his buddy handles his site: "Ask your buddy if he can make your site load in 0.4 seconds on 5G."',
      close_script: '$500 minimum custom launch fee. Zero monthly retainer unless you want custom additions.'
    },
    source: 'self_sourced',
    status: 'downloaded',
    requested_at: '2026-09-15T16:30:00Z',
    built_at: '2026-09-16T01:35:00Z',
    downloaded_at: '2026-09-16T09:15:00Z',
    outcome_logged_at: null
  },
  {
    id: 'target-4',
    rep_id: 'user-rep-marcus',
    rep_name: 'Marcus Vance',
    business_name: 'Acadian Turf & Weed Pros',
    category: 'Lawn Care & Spraying',
    city: 'Maurice',
    state: 'LA',
    contact_info: {
      owner_name: 'Darren Fontenot',
      phone: '(337) 898-7711',
      email: 'darren@acadianturf.com',
      address: '9200 Maurice Ave, Maurice, LA 70555',
      google_rating: 5.0,
      review_count: 44
    },
    spec_site_url: 'https://spec-acadian-turf.forgemode.preview',
    pitch_notes: {
      hook: "Darren, you're 5 stars all the way across Vermilion and Lafayette parish, but when folks search weed control on Maurice Ave, your listing links to a 404 page.",
      existing_pain: 'Broken website domain expired 6 months ago.',
      demo_angle: 'We rebuilt your full lawn calendar and treatment plan menu into a clean 1-page mobile powerhouse.',
      objection_prep: 'Cost objection: "One single annual aeration/spray contract is worth $900. This site pays for itself with one click."',
      close_script: "Let's connect your domain today. $500 minimum custom launch."
    },
    source: 'auto',
    status: 'sold',
    requested_at: '2026-09-14T18:00:00Z',
    built_at: '2026-09-15T01:10:00Z',
    downloaded_at: '2026-09-15T08:45:00Z',
    outcome_logged_at: '2026-09-15T11:20:00Z',
    notes: 'Closed in 8 minutes! Darren loved the green lawn treatment calculator. Upgraded with Stripe.'
  },
  {
    id: 'target-5',
    rep_id: 'user-rep-marcus',
    rep_name: 'Marcus Vance',
    business_name: 'Vermilion Marine & Outboard Tuning',
    category: 'Marine Repair',
    city: 'Intracoastal City',
    state: 'LA',
    contact_info: {
      owner_name: 'Clint Primeaux',
      phone: '(337) 893-9002',
      email: 'cprimeauxmarine@cox.net',
      address: 'Route 1 Box 88, Intracoastal City, LA 70510',
      google_rating: 4.6,
      review_count: 21
    },
    spec_site_url: 'https://spec-vermilion-marine.forgemode.preview',
    pitch_notes: {
      hook: "Clint, shrimpers and bayou sports fishermen are pulling in every weekend looking for quick lower-unit seals.",
      existing_pain: 'Zero web presence except an outdated Facebook group.',
      demo_angle: 'Mobile-first site highlighting emergency trailer repair and outboard diagnostics.',
      objection_prep: 'Owner retiring soon: "Great site helps you pass the business to your boy at a higher valuation."',
      close_script: '$500 minimum custom launch.'
    },
    source: 'auto',
    status: 'declined',
    requested_at: '2026-09-14T18:00:00Z',
    built_at: '2026-09-15T01:40:00Z',
    downloaded_at: '2026-09-15T14:10:00Z',
    outcome_logged_at: '2026-09-15T14:45:00Z',
    notes: 'Called, spoke with Clint. Decided he is retiring at end of year and winding down work.'
  },
  {
    id: 'target-6',
    rep_id: 'user-rep-marcus',
    rep_name: 'Marcus Vance',
    business_name: 'Cajun Precision Welding & Fab',
    category: 'Welding & Custom Metal',
    city: 'Delcambre',
    state: 'LA',
    contact_info: {
      owner_name: 'Beau Romero',
      phone: '(337) 685-3310',
      email: 'beau@cajunprecision.com',
      address: '304 Railroad Ave, Delcambre, LA 70528',
      google_rating: 4.9,
      review_count: 31
    },
    spec_site_url: 'https://spec-cajun-precision-welding.forgemode.preview',
    pitch_notes: {
      hook: 'Beau, you build the toughest aluminum skiffs and farm hitches in Iberia/Vermilion.',
      existing_pain: 'No portfolio photos online; relies solely on word-of-mouth.',
      demo_angle: 'Show the custom fabrication photo gallery and quick project quote request form.',
      objection_prep: 'Too busy: "This filters out tire-kickers asking for free estimates."',
      close_script: '$500 minimum custom launch (no cap).'
    },
    source: 'auto',
    status: 'no_contact',
    requested_at: '2026-09-13T18:00:00Z',
    built_at: '2026-09-14T01:10:00Z',
    downloaded_at: null,
    outcome_logged_at: '2026-09-15T08:00:00Z',
    notes: 'Rolled over automatically as soft mark (unworked target capacity signal).'
  }
];

export const SEED_SALES: Sale[] = [
  {
    id: 'sale-1',
    rep_id: 'user-rep-marcus',
    rep_name: 'Marcus Vance',
    target_id: 'target-4',
    customer_name: 'Acadian Turf & Weed Pros (Darren Fontenot)',
    customer_email: 'darren@acadianturf.com',
    amount: 500.0,
    subscription_upsell: true,
    commission_base: 125.0,
    commission_bonus: 50.0,
    total_commission: 175.0,
    payment_intent_id: 'pi_3Misfit_AcadianTurf_500',
    closed_at: '2026-09-15T11:20:00Z',
    paid_at: '2026-09-15T18:00:00Z'
  },
  {
    id: 'sale-2',
    rep_id: 'user-rep-marcus',
    rep_name: 'Marcus Vance',
    target_id: null,
    customer_name: 'Gautreaux Cajun Boudin & Cracklins',
    customer_email: 'gautreauxboudin@gmail.com',
    amount: 500.0,
    subscription_upsell: false,
    commission_base: 125.0,
    commission_bonus: 0.0,
    total_commission: 125.0,
    payment_intent_id: 'pi_3Misfit_Gautreaux_500',
    closed_at: '2026-09-08T15:45:00Z',
    paid_at: '2026-09-08T18:00:00Z'
  },
  {
    id: 'sale-3',
    rep_id: 'user-rep-marcus',
    rep_name: 'Marcus Vance',
    target_id: null,
    customer_name: 'Acadiana Custom Fencing LLC',
    customer_email: 'office@acadianafence.com',
    amount: 750.0,
    subscription_upsell: true,
    commission_base: 187.5,
    commission_bonus: 50.0,
    total_commission: 237.5,
    payment_intent_id: 'pi_3Misfit_Fence_750',
    closed_at: '2026-08-25T16:10:00Z',
    paid_at: '2026-08-25T18:30:00Z'
  }
];

export const SEED_ADDITION_REQUESTS: AdditionRequest[] = [
  {
    id: 'add-1',
    rep_id: 'user-rep-marcus',
    rep_name: 'Marcus Vance',
    sale_id: 'sale-1',
    target_id: 'target-4',
    site_name: 'Acadian Turf & Weed Pros',
    type: 'page',
    description: 'Commercial Pest & Mosquito Fogging page with seasonal chemical treatment schedule table.',
    price: 75.0,
    commission: 18.75,
    payment_status: 'paid',
    build_status: 'shipped',
    requested_at: '2026-09-15T13:00:00Z',
    shipped_at: '2026-09-15T17:15:00Z',
    paid_at: '2026-09-15T17:30:00Z',
    stripe_payment_id: 'pi_add_turf_page_75'
  },
  {
    id: 'add-2',
    rep_id: 'user-rep-marcus',
    rep_name: 'Marcus Vance',
    sale_id: 'sale-3',
    target_id: null,
    site_name: 'Acadiana Custom Fencing LLC',
    type: 'feature',
    description: 'Instant Linear Foot Fence Cost Estimator with material toggle (Wood, Chain Link, Ornamental Iron).',
    price: 150.0,
    commission: 37.5,
    payment_status: 'paid',
    build_status: 'building',
    requested_at: '2026-09-16T08:30:00Z',
    shipped_at: null,
    paid_at: '2026-09-16T09:00:00Z',
    stripe_payment_id: 'pi_add_fence_feature_150'
  },
  {
    id: 'add-3',
    rep_id: 'user-rep-marcus',
    rep_name: 'Marcus Vance',
    sale_id: 'sale-2',
    target_id: null,
    site_name: 'Gautreaux Cajun Boudin & Cracklins',
    type: 'custom',
    description: 'Wholesale Pre-Order Catering Form with automated PDF invoice generator for church fairs and tailgate events.',
    price: 400.0,
    commission: 100.0,
    payment_status: 'quoted',
    build_status: 'quoted',
    requested_at: '2026-09-16T11:15:00Z',
    shipped_at: null,
    paid_at: null
  }
];

export const SEED_APPLICATIONS: ApplicationSubmission[] = [
  {
    id: 'app-1',
    full_name: 'Jacob Landry',
    email: 'jlandry88@gmail.com',
    phone: '(337) 849-2011',
    sales_experience: 'Some',
    traits: ['Self-motivated', 'Honest', 'Persistent'],
    availability: 'Immediately',
    why: 'Born and raised in Vermilion Parish. Know all the farmers and boat shops between Abbeville and Intracoastal. Need an opportunity where real work pays real money.',
    status: 'pending',
    submitted_at: '2026-09-16T08:12:00Z'
  },
  {
    id: 'app-2',
    full_name: 'Taylor Broussard',
    email: 'tbroussard.creatives@yahoo.com',
    phone: '(337) 298-5541',
    sales_experience: 'None',
    traits: ['Coachable', 'Independent thinker', 'Strong personal values'],
    availability: '2 weeks notice',
    why: 'Read partnering.html and loved D\'s philosophy about looking for what is good. Tired of toxic sales cultures where you are treated like a number.',
    status: 'pending',
    submitted_at: '2026-09-15T19:40:00Z'
  },
  {
    id: 'app-3',
    full_name: 'Sarah Miller',
    email: 'sarah.miller@forgemode.com',
    phone: '(337) 555-0188',
    sales_experience: 'Experienced',
    traits: ['Self-motivated', 'Coachable', 'Persistent', 'Honest'],
    availability: 'Immediately',
    why: 'Prior B2B sales in telecom. Looking for high integrity and rapid delivery.',
    status: 'approved',
    submitted_at: '2026-08-14T10:00:00Z',
    reviewed_at: '2026-08-15T11:00:00Z'
  }
];
