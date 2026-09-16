import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  TrainingModule,
  TrainingProgress,
  TrainingGift,
  Target,
  Sale,
  AdditionRequest,
  ApplicationSubmission
} from './types';
import {
  SEED_USERS,
  SEED_TRAINING_MODULES,
  SEED_PROGRESS,
  SEED_TRAINING_GIFTS,
  SEED_TARGETS,
  SEED_SALES,
  SEED_ADDITION_REQUESTS,
  SEED_APPLICATIONS
} from './seedData';

interface PipelineRunLog {
  timestamp: string;
  processedCount: number;
  details: string[];
}

interface ForgeContextType {
  // Current session & auth
  currentUser: User | null;
  users: User[];
  switchUser: (userId: string) => void;
  createApprovedTraineeAccount: (applicationId: string, customEmail?: string) => User;

  // Training & Modules
  modules: TrainingModule[];
  progress: TrainingProgress[];
  gifts: TrainingGift[];
  isModuleCompleted: (moduleId: string, userId?: string) => boolean;
  toggleModuleComplete: (moduleId: string) => void;
  submitTrainingGiftRequest: (businessOrProjectName: string, projectDescription: string) => void;
  scheduleLiveCall: (scheduledTime: string) => void;
  decideTraineePromotion: (userId: string, decision: 'approve' | 'not_approve', notes?: string) => void;

  // Targets & Daily Queue
  targets: Target[];
  downloadTargetPacket: (targetId: string) => void;
  logTargetOutcome: (targetId: string, outcome: 'sold' | 'declined', notes?: string) => void;
  addTonightTargets: (businessInput: string, source?: 'auto' | 'self_sourced') => void;
  runOvernightPipelineSimulation: () => PipelineRunLog;

  // Sales & Commissions
  sales: Sale[];
  recordSale: (data: {
    targetId?: string;
    customerName: string;
    customerEmail: string;
    amount?: number;
    subscriptionUpsell?: boolean;
    repId?: string;
  }) => Sale;

  // Additions
  additionRequests: AdditionRequest[];
  createAdditionRequest: (data: {
    siteName: string;
    type: 'page' | 'feature' | 'custom';
    description: string;
    customPrice?: number;
    saleId?: string;
    targetId?: string;
  }) => AdditionRequest;
  updateAdditionStatus: (
    id: string,
    updates: {
      payment_status?: 'quoted' | 'paid' | 'refunded';
      build_status?: 'quoted' | 'paid' | 'building' | 'shipped';
      customPrice?: number;
    }
  ) => void;

  // Applications
  applications: ApplicationSubmission[];
  submitApplication: (app: Omit<ApplicationSubmission, 'id' | 'status' | 'submitted_at'>) => void;
  rejectApplication: (id: string) => void;

  // System stats & state reset
  resetToDefaults: () => void;
  lastPipelineLog: PipelineRunLog | null;
}

const ForgeContext = createContext<ForgeContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'forge_users_v1',
  CURRENT_USER_ID: 'forge_current_user_id_v1',
  PROGRESS: 'forge_progress_v1',
  GIFTS: 'forge_gifts_v1',
  TARGETS: 'forge_targets_v1',
  SALES: 'forge_sales_v1',
  ADDITIONS: 'forge_additions_v1',
  APPLICATIONS: 'forge_applications_v1',
  PIPELINE_LOG: 'forge_pipeline_log_v1'
};

export const ForgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage with defaults
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    return saved ? JSON.parse(saved) : SEED_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    return saved || 'user-admin-d';
  });

  const [progress, setProgress] = useState<TrainingProgress[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return saved ? JSON.parse(saved) : SEED_PROGRESS;
  });

  const [gifts, setGifts] = useState<TrainingGift[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GIFTS);
    return saved ? JSON.parse(saved) : SEED_TRAINING_GIFTS;
  });

  const [targets, setTargets] = useState<Target[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TARGETS);
    return saved ? JSON.parse(saved) : SEED_TARGETS;
  });

  const [sales, setSales] = useState<Sale[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SALES);
    return saved ? JSON.parse(saved) : SEED_SALES;
  });

  const [additionRequests, setAdditionRequests] = useState<AdditionRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ADDITIONS);
    return saved ? JSON.parse(saved) : SEED_ADDITION_REQUESTS;
  });

  const [applications, setApplications] = useState<ApplicationSubmission[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return saved ? JSON.parse(saved) : SEED_APPLICATIONS;
  });

  const [lastPipelineLog, setLastPipelineLog] = useState<PipelineRunLog | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PIPELINE_LOG);
    return saved ? JSON.parse(saved) : null;
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GIFTS, JSON.stringify(gifts));
  }, [gifts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TARGETS, JSON.stringify(targets));
  }, [targets]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SALES, JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADDITIONS, JSON.stringify(additionRequests));
  }, [additionRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    if (lastPipelineLog) {
      localStorage.setItem(STORAGE_KEYS.PIPELINE_LOG, JSON.stringify(lastPipelineLog));
    }
  }, [lastPipelineLog]);

  const currentUser = users.find(u => u.id === currentUserId) || users[0] || null;

  const switchUser = (userId: string) => {
    const exists = users.find(u => u.id === userId);
    if (exists) {
      setCurrentUserId(userId);
    }
  };

  const isModuleCompleted = (moduleId: string, userId?: string): boolean => {
    const uid = userId || currentUser?.id;
    if (!uid) return false;
    return progress.some(p => p.user_id === uid && p.module_id === moduleId);
  };

  const toggleModuleComplete = (moduleId: string) => {
    if (!currentUser) return;
    const uid = currentUser.id;
    const exists = progress.find(p => p.user_id === uid && p.module_id === moduleId);

    let updatedProgress: TrainingProgress[];
    if (exists) {
      updatedProgress = progress.filter(p => !(p.user_id === uid && p.module_id === moduleId));
    } else {
      const newEntry: TrainingProgress = {
        id: `prog-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        user_id: uid,
        module_id: moduleId,
        completed_at: new Date().toISOString()
      };
      updatedProgress = [...progress, newEntry];
    }
    setProgress(updatedProgress);

    // Check if user has now completed all modules
    const userCompletedCount = updatedProgress.filter(p => p.user_id === uid).length;
    if (userCompletedCount >= SEED_TRAINING_MODULES.length) {
      // Completed all modules! Flip to training_complete if trainee
      setUsers(prev =>
        prev.map(u => {
          if (u.id === uid && u.role === 'trainee' && u.training_status === 'in_progress') {
            return { ...u, training_status: 'training_complete' };
          }
          return u;
        })
      );
    } else {
      // Revert if unchecked
      setUsers(prev =>
        prev.map(u => {
          if (u.id === uid && u.role === 'trainee' && u.training_status === 'training_complete') {
            return { ...u, training_status: 'in_progress' };
          }
          return u;
        })
      );
    }
  };

  const submitTrainingGiftRequest = (businessOrProjectName: string, projectDescription: string) => {
    if (!currentUser) return;
    const newGift: TrainingGift = {
      id: `gift-${Date.now()}`,
      user_id: currentUser.id,
      business_or_project_name: businessOrProjectName,
      project_description: projectDescription,
      spec_site_url: `https://preview-${businessOrProjectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.forgemode.preview`,
      built_at: new Date().toISOString(), // automatically simulated build by Forge Mode engine
      editor_access_granted: true,
      call_scheduled_at: null,
      call_completed_at: null,
      call_outcome: 'pending',
      created_at: new Date().toISOString()
    };
    setGifts(prev => [newGift, ...prev.filter(g => g.user_id !== currentUser.id)]);
  };

  const scheduleLiveCall = (scheduledTime: string) => {
    if (!currentUser) return;
    setGifts(prev =>
      prev.map(g => {
        if (g.user_id === currentUser.id) {
          return { ...g, call_scheduled_at: scheduledTime };
        }
        return g;
      })
    );
  };

  const decideTraineePromotion = (
    userId: string,
    decision: 'approve' | 'not_approve',
    notes?: string
  ) => {
    const now = new Date().toISOString();

    // 1. Update user role and status
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          if (decision === 'approve') {
            return {
              ...u,
              role: 'rep' as UserRole,
              training_status: 'promoted' as const,
              promoted_to_rep_at: now,
              notes: notes || u.notes
            };
          } else {
            return {
              ...u,
              training_status: 'not_promoted' as const,
              notes: notes || u.notes
            };
          }
        }
        return u;
      })
    );

    // 2. Update gift record
    setGifts(prev =>
      prev.map(g => {
        if (g.user_id === userId) {
          return {
            ...g,
            call_completed_at: now,
            call_outcome: decision === 'approve' ? 'approved' : 'not_approved',
            d_notes: notes || g.d_notes
          };
        }
        return g;
      })
    );

    // 3. If approved, seed their first queue targets if none exist
    if (decision === 'approve') {
      const rep = users.find(u => u.id === userId);
      const repName = rep ? rep.full_name : 'New Rep';
      const starterTargets: Target[] = [
        {
          id: `target-starter-1-${Date.now()}`,
          rep_id: userId,
          rep_name: repName,
          business_name: 'Guidry Cypress & Sawmill',
          category: 'Timber & Sawmill',
          city: 'Kaplan',
          state: 'LA',
          contact_info: {
            owner_name: 'Claude Guidry',
            phone: '(337) 643-9821',
            email: 'cguidry@guidrysawmill.com',
            address: '412 Guidry Rd, Kaplan, LA 70548',
            google_rating: 4.8,
            review_count: 27
          },
          spec_site_url: 'https://spec-guidry-cypress.forgemode.preview',
          pitch_notes: {
            hook: "Claude, you've supplied Acadiana with rough-sawn cypress for 30 years, but folks in Lafayette looking for custom beams can't find your board-foot pricing on their phones.",
            existing_pain: 'No website, only word-of-mouth; misses high-margin new home construction orders.',
            demo_angle: 'Show him the live board-foot dimension calculator and custom mantle quote form.',
            objection_prep: 'If he says word of mouth is enough: "This brings you the commercial architects who pay top dollar."',
            close_script: "It's built and ready to go live tonight for $250 flat."
          },
          source: 'auto',
          status: 'ready',
          requested_at: now,
          built_at: now,
          downloaded_at: null,
          outcome_logged_at: null
        },
        {
          id: `target-starter-2-${Date.now()}`,
          rep_id: userId,
          rep_name: repName,
          business_name: 'Hebert Brothers Diesel & Tractor Repair',
          category: 'Ag & Diesel Mechanic',
          city: 'Gueydan',
          state: 'LA',
          contact_info: {
            owner_name: 'Mark Hebert',
            phone: '(337) 536-1234',
            email: 'office@heberttractor.net',
            address: '110 Main St, Gueydan, LA 70542',
            google_rating: 4.9,
            review_count: 36
          },
          spec_site_url: 'https://spec-hebert-tractor.forgemode.preview',
          pitch_notes: {
            hook: "Mark, harvest season is rolling in and rice farmers need emergency road service fast.",
            existing_pain: 'Their listing only has a landline with no after-hours dispatch request.',
            demo_angle: 'Emergency field service button with immediate SMS alert to his mechanics.',
            objection_prep: 'Too busy: "This filters out tire-kickers and collects deposits before you roll the truck."',
            close_script: "$250 flat fee. We turn it live tonight."
          },
          source: 'auto',
          status: 'ready',
          requested_at: now,
          built_at: now,
          downloaded_at: null,
          outcome_logged_at: null
        }
      ];
      setTargets(prev => [...starterTargets, ...prev]);
    }
  };

  const createApprovedTraineeAccount = (applicationId: string, customEmail?: string): User => {
    const app = applications.find(a => a.id === applicationId);
    const email = customEmail || app?.email || `trainee.${Date.now()}@forgemode.com`;
    const fullName = app?.full_name || 'Approved Trainee';
    const now = new Date().toISOString();

    const newTrainee: User = {
      id: `user-trainee-${Date.now()}`,
      email,
      full_name: fullName,
      role: 'trainee',
      training_status: 'in_progress',
      approved_at: now,
      promoted_to_rep_at: null,
      created_at: now,
      phone: app?.phone || '',
      notes: `Approved applicant from form. Availability: ${app?.availability || 'Immediate'}. Experience: ${app?.sales_experience || 'None'}.`
    };

    setUsers(prev => [newTrainee, ...prev]);

    // Mark application as approved
    if (app) {
      setApplications(prev =>
        prev.map(a => (a.id === applicationId ? { ...a, status: 'approved', reviewed_at: now } : a))
      );
    }

    return newTrainee;
  };

  const downloadTargetPacket = (targetId: string) => {
    const now = new Date().toISOString();
    setTargets(prev =>
      prev.map(t => {
        if (t.id === targetId && t.status === 'ready') {
          return {
            ...t,
            status: 'downloaded',
            downloaded_at: now
          };
        }
        return t;
      })
    );
  };

  const recordSale = (data: {
    targetId?: string;
    customerName: string;
    customerEmail: string;
    amount?: number;
    subscriptionUpsell?: boolean;
    repId?: string;
  }): Sale => {
    const rep_id = data.repId || currentUser?.id || 'user-rep-marcus';
    const rep = users.find(u => u.id === rep_id);
    const amount = data.amount || 250.0;
    const subscription_upsell = !!data.subscriptionUpsell;
    const commission_base = amount * 0.25; // 25% standard base
    const commission_bonus = subscription_upsell ? 25.0 : 0.0;
    const total_commission = commission_base + commission_bonus;
    const now = new Date().toISOString();

    const newSale: Sale = {
      id: `sale-${Date.now()}`,
      rep_id,
      rep_name: rep?.full_name || 'Sales Rep',
      target_id: data.targetId || null,
      customer_name: data.customerName,
      customer_email: data.customerEmail,
      amount,
      subscription_upsell,
      commission_base,
      commission_bonus,
      total_commission,
      payment_intent_id: `pi_live_${Date.now()}`,
      closed_at: now,
      paid_at: now // paid same day per dossier
    };

    setSales(prev => [newSale, ...prev]);

    // If tied to a target, update target status to 'sold'
    if (data.targetId) {
      setTargets(prev =>
        prev.map(t => {
          if (t.id === data.targetId) {
            return {
              ...t,
              status: 'sold',
              outcome_logged_at: now,
              notes: `Closed deal for $${amount}. Stripe PI: ${newSale.payment_intent_id}`
            };
          }
          return t;
        })
      );
    }

    return newSale;
  };

  const logTargetOutcome = (targetId: string, outcome: 'sold' | 'declined', notes?: string) => {
    const now = new Date().toISOString();
    const target = targets.find(t => t.id === targetId);

    if (outcome === 'sold' && target) {
      recordSale({
        targetId: target.id,
        customerName: target.business_name,
        customerEmail: target.contact_info.email || 'customer@client.com',
        repId: target.rep_id
      });
    } else {
      setTargets(prev =>
        prev.map(t => {
          if (t.id === targetId) {
            return {
              ...t,
              status: 'declined',
              outcome_logged_at: now,
              notes: notes || 'Called, owner declined or unavailable.'
            };
          }
          return t;
        })
      );
    }
  };

  const addTonightTargets = (businessInput: string, source: 'auto' | 'self_sourced' = 'auto') => {
    if (!currentUser) return;
    const lines = businessInput
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0);

    const now = new Date().toISOString();
    const newTargets: Target[] = lines.map((line, idx) => {
      // Line format could be: "Business Name, Town, Phone" or just "Business Name"
      const parts = line.split(',').map(p => p.trim());
      const businessName = parts[0] || 'Local Business Prospect';
      const city = parts[1] || 'Vermilion Parish';
      const phone = parts[2] || '(337) 555-0100';

      return {
        id: `target-queued-${Date.now()}-${idx}`,
        rep_id: currentUser.id,
        rep_name: currentUser.full_name,
        business_name: businessName,
        category: 'Local Service / Trade',
        city,
        state: 'LA',
        contact_info: {
          owner_name: 'Business Owner',
          phone,
          email: `contact@${businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
          address: `${city}, LA`,
          google_rating: 4.8,
          review_count: 24
        },
        spec_site_url: `https://spec-${businessName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.forgemode.preview`,
        pitch_notes: {
          hook: `${businessName} has strong local foot traffic and customer goodwill, but zero instant mobile estimate capability.`,
          existing_pain: 'Loses high-value emergency leads to bigger competitors with fast mobile sites.',
          demo_angle: 'Show the instant price estimator and one-touch dispatch button.',
          objection_prep: 'If too busy: "This site automates quotes so you spend zero hours giving prices over the phone."',
          close_script: '$250 flat launch. Live tonight.'
        },
        source,
        status: 'queued',
        requested_at: now,
        built_at: null,
        downloaded_at: null,
        outcome_logged_at: null
      };
    });

    setTargets(prev => [...newTargets, ...prev]);
  };

  const runOvernightPipelineSimulation = (): PipelineRunLog => {
    const now = new Date().toISOString();
    let processedCount = 0;
    const details: string[] = [];

    setTargets(prev => {
      return prev.map(t => {
        // 1. Process queued targets -> research -> build -> ready
        if (t.status === 'queued' || t.status === 'building') {
          processedCount++;
          details.push(
            `[1:00 AM BUILD] Researched & Built spec site for: ${t.business_name} (${t.city}, LA) -> Status: READY`
          );
          return {
            ...t,
            status: 'ready' as TargetStatus,
            built_at: now
          };
        }

        // 2. Soft mark rollover: unworked targets roll to no_contact next morning
        // If it was 'ready' without download, or 'downloaded' without outcome logged
        // and it was created prior to current run
        if (t.status === 'downloaded' && !t.outcome_logged_at) {
          details.push(
            `[SOFT MARK] Target ${t.business_name} downloaded but no outcome logged -> Rolled to no_contact`
          );
          return {
            ...t,
            status: 'no_contact' as TargetStatus,
            outcome_logged_at: now,
            notes: 'Rolled over automatically as soft mark (unworked target capacity signal).'
          };
        }

        return t;
      });
    });

    const log: PipelineRunLog = {
      timestamp: now,
      processedCount,
      details: details.length > 0 ? details : ['No queued targets to build. Queue is clean.']
    };

    setLastPipelineLog(log);
    return log;
  };

  const createAdditionRequest = (data: {
    siteName: string;
    type: 'page' | 'feature' | 'custom';
    description: string;
    customPrice?: number;
    saleId?: string;
    targetId?: string;
  }): AdditionRequest => {
    const rep_id = currentUser?.id || 'user-rep-marcus';
    const rep = users.find(u => u.id === rep_id);

    let price = 0;
    let commission = 0;

    if (data.type === 'page') {
      price = 75.0;
      commission = 18.75; // 25% of 75
    } else if (data.type === 'feature') {
      price = 150.0;
      commission = 37.5; // 25% of 150
    } else {
      // Custom: quoted
      price = data.customPrice || 350.0;
      commission = price * 0.25;
    }

    const newAddition: AdditionRequest = {
      id: `add-${Date.now()}`,
      rep_id,
      rep_name: rep?.full_name || 'Sales Rep',
      sale_id: data.saleId || null,
      target_id: data.targetId || null,
      site_name: data.siteName,
      type: data.type,
      description: data.description,
      price,
      commission,
      payment_status: 'quoted',
      build_status: 'quoted',
      requested_at: new Date().toISOString(),
      shipped_at: null,
      paid_at: null
    };

    setAdditionRequests(prev => [newAddition, ...prev]);
    return newAddition;
  };

  const updateAdditionStatus = (
    id: string,
    updates: {
      payment_status?: 'quoted' | 'paid' | 'refunded';
      build_status?: 'quoted' | 'paid' | 'building' | 'shipped';
      customPrice?: number;
    }
  ) => {
    const now = new Date().toISOString();
    setAdditionRequests(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextPrice = updates.customPrice !== undefined ? updates.customPrice : item.price;
          const nextComm = updates.customPrice !== undefined ? nextPrice * 0.25 : item.commission;

          const nextPaymentStatus = updates.payment_status || item.payment_status;
          let nextBuildStatus = updates.build_status || item.build_status;

          // Dossier Rule: Payment collects BEFORE build starts
          // payment_status: paid gates build_status moving to building
          if (nextBuildStatus === 'building' && nextPaymentStatus !== 'paid') {
            alert('Payment must be collected before build can start! Status remains quoted/paid.');
            return item;
          }

          const shipped_at =
            nextBuildStatus === 'shipped' && !item.shipped_at ? now : item.shipped_at;
          const paid_at =
            nextPaymentStatus === 'paid' && !item.paid_at ? now : item.paid_at;

          return {
            ...item,
            price: nextPrice,
            commission: nextComm,
            payment_status: nextPaymentStatus,
            build_status: nextBuildStatus,
            shipped_at,
            paid_at
          };
        }
        return item;
      })
    );
  };

  const submitApplication = (app: Omit<ApplicationSubmission, 'id' | 'status' | 'submitted_at'>) => {
    const newApp: ApplicationSubmission = {
      ...app,
      id: `app-${Date.now()}`,
      status: 'pending',
      submitted_at: new Date().toISOString()
    };
    setApplications(prev => [newApp, ...prev]);
  };

  const rejectApplication = (id: string) => {
    setApplications(prev =>
      prev.map(a =>
        a.id === id ? { ...a, status: 'rejected', reviewed_at: new Date().toISOString() } : a
      )
    );
  };

  const resetToDefaults = () => {
    setUsers(SEED_USERS);
    setCurrentUserId('user-admin-d');
    setProgress(SEED_PROGRESS);
    setGifts(SEED_TRAINING_GIFTS);
    setTargets(SEED_TARGETS);
    setSales(SEED_SALES);
    setAdditionRequests(SEED_ADDITION_REQUESTS);
    setApplications(SEED_APPLICATIONS);
    setLastPipelineLog(null);
    localStorage.clear();
  };

  return (
    <ForgeContext.Provider
      value={{
        currentUser,
        users,
        switchUser,
        createApprovedTraineeAccount,
        modules: SEED_TRAINING_MODULES,
        progress,
        gifts,
        isModuleCompleted,
        toggleModuleComplete,
        submitTrainingGiftRequest,
        scheduleLiveCall,
        decideTraineePromotion,
        targets,
        downloadTargetPacket,
        logTargetOutcome,
        addTonightTargets,
        runOvernightPipelineSimulation,
        sales,
        recordSale,
        additionRequests,
        createAdditionRequest,
        updateAdditionStatus,
        applications,
        submitApplication,
        rejectApplication,
        resetToDefaults,
        lastPipelineLog
      }}
    >
      {children}
    </ForgeContext.Provider>
  );
};

export const useForge = () => {
  const context = useContext(ForgeContext);
  if (!context) {
    throw new Error('useForge must be used within a ForgeProvider');
  }
  return context;
};
