import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ArrowRight, Award, UserCheck } from 'lucide-react';

interface NavbarProps {
  onOpenPartnerModal: () => void;
  onOpenSpeakerModal?: () => void;
  onOpenAmbassadorModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPartnerModal,
  onOpenSpeakerModal,
  onOpenAmbassadorModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Team', href: '#team' },
    { label: 'Student Resources', href: '#resources' },
    { label: 'Courses', href: '#courses' },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-200 border-b ${
      scrolled ? 'border-[#C5E2EC] shadow-md py-2.5' : 'border-[#EAF4F8] py-3.5'
    }`}>
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2 group focus:outline-none shrink-0">
          <Logo variant="full" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13.5px] font-medium text-[#153F60] hover:text-[#1286A0] transition-colors tracking-tight whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons Group */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Join as Speaker */}
          {onOpenSpeakerModal && (
            <button
              onClick={onOpenSpeakerModal}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#153F60] hover:text-[#1286A0] bg-[#F3F9FC] hover:bg-[#E4F2F7] px-3.5 py-2 rounded-full border border-[#D7EDF4] transition-all cursor-pointer whitespace-nowrap"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#1769AA]" />
              <span>Join as Speaker</span>
            </button>
          )}

          {/* Ambassador */}
          {/* {onOpenAmbassadorModal && (
            <button
              onClick={onOpenAmbassadorModal}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#138A9E] hover:text-[#0c5966] bg-[#EAF6FA] hover:bg-[#d8eef5] px-3.5 py-2 rounded-full border border-[#B8E2F2] transition-all cursor-pointer whitespace-nowrap"
            >
              <Award className="w-3.5 h-3.5 text-[#138A9E]" />
              <span>Ambassador</span>
            </button>
          )} */}

          {/* Main Partner Button */}
          <button
            onClick={onOpenPartnerModal}
            className="inline-flex items-center gap-2 bg-[#1286A0] hover:bg-[#0E6D82] text-white text-[13px] font-bold px-4 py-2 rounded-full shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98] cursor-pointer whitespace-nowrap"
          >
            <span>Book Campus Session</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={onOpenPartnerModal}
            className="text-xs font-bold bg-[#1286A0] text-white px-3 py-1.5 rounded-full"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#153F60] hover:text-[#1286A0] hover:bg-[#F3F9FC] rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#D7EDF4] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#153F60] hover:text-[#1286A0] hover:bg-[#F3F9FC] px-3 py-2 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-[#EAF4F8] space-y-2">
              {onOpenSpeakerModal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSpeakerModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#F3F9FC] text-[#153F60] font-bold py-2.5 rounded-xl border border-[#D7EDF4] text-xs"
                >
                  <UserCheck className="w-4 h-4 text-[#1769AA]" />
                  <span>Join as Speaker (Weekend Sessions)</span>
                </button>
              )}

              {onOpenAmbassadorModal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAmbassadorModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#EAF6FA] text-[#138A9E] font-bold py-2.5 rounded-xl border border-[#B8E2F2] text-xs"
                >
                  <Award className="w-4 h-4 text-[#138A9E]" />
                  <span>Apply as Campus Ambassador</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPartnerModal();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#1286A0] hover:bg-[#0E6D82] text-white font-bold py-3 rounded-xl shadow-sm transition-colors text-xs"
              >
                <span>Book Campus Session (15 Fields)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
