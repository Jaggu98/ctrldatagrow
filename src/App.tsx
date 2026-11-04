import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PlanCard } from './components/PlanCard';
import { StatsStrip } from './components/StatsStrip';
import { FounderVision } from './components/FounderVision';
import { TwelveWays } from './components/TwelveWays';
import { ProcessSteps } from './components/ProcessSteps';
import { StudentResources } from './components/StudentResources';
import { HackathonSponsorship } from './components/HackathonSponsorship';
import { TrustSafety } from './components/TrustSafety';
import { Gallery } from './components/Gallery';
import { Insights } from './components/Insights';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { PartnerModal } from './components/PartnerModal';
import { SpeakerApplicationModal } from './components/SpeakerApplicationModal';
import { CampusAmbassadorModal } from './components/CampusAmbassadorModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Expert } from './data/mockData';

export function App() {
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isSpeakerModalOpen, setIsSpeakerModalOpen] = useState(false);
  const [isAmbassadorModalOpen, setIsAmbassadorModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | undefined>(undefined);

  useEffect(() => {
    const syncRouteWithModals = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      // Check for Admin
      if (hash === '#admin' || path === '/admin') {
        setIsAdminModalOpen(true);
      }

      // Check for Register / Resource Person
      if (
        path === '/register' ||
        path.startsWith('/register') ||
        hash === '#register' ||
        hash === '#register-speaker' ||
        hash === '#resource-person'
      ) {
        setIsSpeakerModalOpen(true);
      }
    };

    syncRouteWithModals();

    const handlePopState = () => {
      syncRouteWithModals();
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (!path.startsWith('/register') && hash !== '#register' && hash !== '#resource-person') {
        setIsSpeakerModalOpen(false);
      }
      if (hash !== '#admin' && path !== '/admin') {
        setIsAdminModalOpen(false);
      }
    };

    window.addEventListener('hashchange', syncRouteWithModals);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('hashchange', syncRouteWithModals);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleOpenPartnerModal = (expert?: Expert | null, format?: string) => {
    setSelectedExpert(expert || null);
    setSelectedFormat(format || undefined);
    setIsPartnerModalOpen(true);
  };

  const handleOpenSpeakerModal = () => {
    if (window.location.pathname !== '/register') {
      window.history.pushState(null, '', '/register');
    }
    setIsSpeakerModalOpen(true);
  };

  const handleCloseSpeakerModal = () => {
    setIsSpeakerModalOpen(false);
    if (window.location.pathname === '/register' || window.location.pathname.startsWith('/register')) {
      window.history.pushState(null, '', '/');
    } else if (window.location.hash === '#register' || window.location.hash === '#resource-person') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const handleOpenAmbassadorModal = () => {
    setIsAmbassadorModalOpen(true);
  };

  const handleOpenAdminModal = () => {
    setIsAdminModalOpen(true);
  };

  const handleSelectFormat = (formatName: string) => {
    setSelectedFormat(formatName);
    setSelectedExpert(null);
    setIsPartnerModalOpen(true);
  };

  const handleExploreExperts = () => {
    const el = document.getElementById('experts');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0B1F33] font-sans antialiased selection:bg-[#138A9E] selection:text-white">
      {/* 1. Header and Navigation with Multi-Action Access */}
      <Navbar
        onOpenPartnerModal={() => handleOpenPartnerModal()}
        onOpenSpeakerModal={handleOpenSpeakerModal}
        onOpenAmbassadorModal={handleOpenAmbassadorModal}
      />

      <main>
        {/* 2. Hero Section with Embedded Marquee */}
        <Hero
          onOpenPartnerModal={() => handleOpenPartnerModal()}
          onExploreExperts={handleExploreExperts}
        />

        {/* 3. Campus Session Planning Card */}
        <PlanCard
          onSelectExpert={(expert) => handleOpenPartnerModal(expert)}
        />

        {/* 4. Statistics Strip (50/50 Section Boundary Overlap) */}
        <StatsStrip />

        {/* 5. Bridging the Gap Between Classrooms and the Real World */}
        {/* <BridgingGap /> */}
        {/* 7. Brand Slide 10: Twelve Ways to Bring Industry to Campus */}

        <TwelveWays
          onSelectFormat={handleSelectFormat}
        />

        {/* 6. Brand Slide 7: A Vision to Bring Industry Closer to Every Campus (Founder & CEO Jagadeesh Pondara) */}
        <FounderVision
          onOpenPartnerModal={() => handleOpenPartnerModal()}
        />

        

        {/* 8. Brand Slide 11: Experiences that Go Beyond the Classroom (10 Disciplines & Filters) */}
        {/* <BeyondClassroom
          onSelectCategory={(_cat) => handleOpenPartnerModal(null, _cat)}
          onExploreExperts={handleExploreExperts}
        /> */}

        {/* 9. Simple, Seamless, Impactful (Process Steps) */}
        <ProcessSteps />

        {/* 10. Learn from Industry Leaders (Expert Directory + Weekend Speaker Enrollment Banner) */}
        {/* <ExpertDirectory
          onSelectExpert={(expert) => handleOpenPartnerModal(expert)}
          onOpenSpeakerModal={handleOpenSpeakerModal}
        /> */}

        {/* 11. Student Knowledge Hub & Micro-Priced Resources (Free Guides + ₹19 Micro-Priced Vaults + Ambassador Banner) */}
        <StudentResources
          onOpenAmbassadorModal={handleOpenAmbassadorModal}
        />

        {/* 12. Hackathon Co-Sponsorship & Corporate Talent Acquisition */}
        <HackathonSponsorship
          onRequestSponsorship={() => handleOpenPartnerModal(null, 'Hackathon Mentorship & Jury')}
        />

        {/* 13. Creating Meaningful Campus Experiences */}
        {/* <ValueFeatures /> */}

        {/* 15. Brand Slide 4: Institutional Trust & Safety Standards */}
        <TrustSafety />

        {/* 16. Moments from Our Campus Events (Gallery) */}
        <Gallery
          onOpenPartnerModal={() => handleOpenPartnerModal()}
        />

        {/* 17. Insights for Colleges and Students */}
        <Insights />

        {/* 18. FAQ Section */}
        <FaqSection
          onContactClick={() => handleOpenPartnerModal()}
        />

        {/* 19. Final CTA Banner */}
        <FinalCta
          onOpenPartnerModal={() => handleOpenPartnerModal()}
        />
      </main>

      {/* 20. Footer with Official LinkedIn Link & Multi-Action Links */}
      <Footer
        onOpenPartnerModal={() => handleOpenPartnerModal()}
        onOpenSpeakerModal={handleOpenSpeakerModal}
        onOpenAmbassadorModal={handleOpenAmbassadorModal}
        onOpenAdmin={handleOpenAdminModal}
      />

      {/* Global Interactive Partner Modal (Brand Slide 12: Campus Booking Form · 15 Fields) */}
      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
        preselectedExpert={selectedExpert}
        initialFormat={selectedFormat}
      />

      {/* Brand Slide 3: Weekend Resource Person Application Modal (with mandatory LinkedIn verification notice) */}
      <SpeakerApplicationModal
        isOpen={isSpeakerModalOpen}
        onClose={handleCloseSpeakerModal}
      />

      {/* Brand Slide 2: Campus Ambassador Application Modal */}
      <CampusAmbassadorModal
        isOpen={isAmbassadorModalOpen}
        onClose={() => setIsAmbassadorModalOpen(false)}
      />

      {/* Authorized Admin Portal */}
      <AdminDashboard
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
}

export default App;
