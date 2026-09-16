import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ContactProvider } from './context/ContactContext';
import { ForgeProvider } from './forge/ForgeContext';
import { AccessKeySwitcher } from './forge/components/AccessKeySwitcher';
import { RouteGate } from './forge/RouteGate';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Quote from './pages/Quote';

// Forge Mode Sales Pipeline + Training Portal pages
import { TrainingPortal } from './forge/pages/TrainingPortal';
import { RepQueue } from './forge/pages/RepQueue';
import { AddTonightTargets } from './forge/pages/AddTonightTargets';
import { BuildRequest } from './forge/pages/BuildRequest';
import { Commissions } from './forge/pages/Commissions';
import { AdminDashboard } from './forge/pages/AdminDashboard';
import { ApplyPage } from './forge/pages/ApplyPage';

export default function App() {
  return (
    <ContactProvider>
      <ForgeProvider>
        <BrowserRouter>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#06060f' }}>
            {/* Real-time Access Key Tier Switcher (Admin / Rep / Trainee) */}
            <AccessKeySwitcher />

            {/* Platform Navigation */}
            <Navbar />

            {/* Main Content Router */}
            <main style={{ flex: 1 }}>
              <Routes>
                {/* Public & Customer Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/quote" element={<Quote />} />
                <Route path="/apply" element={<ApplyPage />} />

                {/* Gated Route Map according to Dossier §7: */}
                {/* 1. /training -> Trainee, Rep, Admin */}
                <Route
                  path="/training"
                  element={
                    <RouteGate allowedRoles={['trainee', 'rep', 'admin']}>
                      <TrainingPortal />
                    </RouteGate>
                  }
                />

                {/* 2. /queue -> Rep, Admin */}
                <Route
                  path="/queue"
                  element={
                    <RouteGate allowedRoles={['rep', 'admin']}>
                      <RepQueue />
                    </RouteGate>
                  }
                />

                {/* 3. /queue/add-target -> Rep, Admin */}
                <Route
                  path="/queue/add-target"
                  element={
                    <RouteGate allowedRoles={['rep', 'admin']}>
                      <AddTonightTargets />
                    </RouteGate>
                  }
                />

                {/* 4. /build-request -> Rep, Admin */}
                <Route
                  path="/build-request"
                  element={
                    <RouteGate allowedRoles={['rep', 'admin']}>
                      <BuildRequest />
                    </RouteGate>
                  }
                />

                {/* 5. /commissions -> Rep (own), Admin (all) */}
                <Route
                  path="/commissions"
                  element={
                    <RouteGate allowedRoles={['rep', 'admin']}>
                      <Commissions />
                    </RouteGate>
                  }
                />

                {/* 6. /admin -> Admin only */}
                <Route
                  path="/admin"
                  element={
                    <RouteGate allowedRoles={['admin']}>
                      <AdminDashboard />
                    </RouteGate>
                  }
                />

                {/* Catch all fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
      </ForgeProvider>
    </ContactProvider>
  );
}
