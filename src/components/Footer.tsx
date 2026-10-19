import React from 'react';
import { Logo } from './Logo';
import { Mail, MapPin, Linkedin, ArrowUp, ExternalLink, Award, UserCheck, Calendar } from 'lucide-react';

interface FooterProps {
  onOpenPartnerModal?: () => void;
  onOpenSpeakerModal?: () => void;
  onOpenAmbassadorModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPartnerModal,
  onOpenSpeakerModal,
  onOpenAmbassadorModal
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#0B1F33] text-white pt-16 pb-12 border-t border-[#1769AA]/20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="white" />

            <p className="text-xs sm:text-sm text-sky-200/80 leading-relaxed max-w-sm mt-3">
              Ctrl + Data + Grow connects technical colleges, universities, and student chapters with verified senior industry leaders, live workshops, hackathons, and curated micro-resources.
            </p>

            <div className="pt-2 text-xs text-sky-200/70 space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#38BDF8]" />
                <a href="mailto:partnerships@ctrl-data-grow.com" className="hover:text-white transition-colors">
                  partnerships@ctrl-data-grow.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#38BDF8]" />
                <span>Visakhapatnam, Hyderabad & Bengaluru, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-[#0077b5]" />
                <a
                  href="https://www.linkedin.com/company/ctrl-data-grow/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#60A5FA] hover:text-white font-medium inline-flex items-center gap-1 transition-colors"
                >
                  linkedin.com/company/ctrl-data-grow
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 1: Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-sky-200/80">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#founder" className="hover:text-white transition-colors">Founder Vision</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">12 Engagement Formats</a></li>
              <li><a href="#domains" className="hover:text-white transition-colors">10 Tech Disciplines</a></li>
              <li><a href="#resources" className="hover:text-white transition-colors">Student Knowledge Hub</a></li>
              <li><a href="#hackathons" className="hover:text-white transition-colors">Hackathon Co-Sponsorship</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Dual Testimonials</a></li>
              <li><a href="#trust-safety" className="hover:text-white transition-colors">Trust & Safety Charter</a></li>
            </ul>
            {onOpenPartnerModal && (
              <div className="pt-2">
                <button
                  onClick={onOpenPartnerModal}
                  className="text-left text-xs font-semibold text-[#60A5FA] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Campus Session (15 Fields) →</span>
                </button>
              </div>
            )}
          </div>

          {/* Column 2: Student & Ambassador Community */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#D6A84F]" />
              Student Community
            </h4>
            <ul className="space-y-2 text-xs text-sky-200/80">
              <li>
                <a href="#resources" className="hover:text-white transition-colors">
                  ₹19 Micro-Priced Roadmaps & Vaults
                </a>
              </li>
              <li>
                {onOpenAmbassadorModal ? (
                  <button
                    onClick={onOpenAmbassadorModal}
                    className="text-left hover:text-[#4ADE80] text-emerald-300 font-semibold transition-colors cursor-pointer"
                  >
                    Apply as Campus Ambassador →
                  </button>
                ) : (
                  <a href="#about" className="hover:text-white">Campus Ambassador Program</a>
                )}
              </li>
              <li><a href="#hackathons" className="hover:text-white transition-colors">Hackathon Grants (Up to ₹2L)</a></li>
              <li><a href="#resources" className="hover:text-white transition-colors">Free College Guides & Roadmaps</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Student Placement Hall of Fame</a></li>
            </ul>

            {onOpenAmbassadorModal && (
              <div className="pt-2">
                <button
                  onClick={onOpenAmbassadorModal}
                  className="w-full text-xs font-bold py-2 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Join Campus Ambassador Network</span>
                </button>
              </div>
            )}
          </div>

          {/* Column 3: Industry Resource Persons */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-[#60A5FA]" />
              Industry Resource Persons
            </h4>
            <p className="text-xs text-sky-200/80 leading-relaxed">
              Are you an active software architect, data lead, or product manager? Teach on college campuses during weekends.
            </p>
            <div className="pt-1 space-y-2">
              {onOpenSpeakerModal && (
                <button
                  onClick={onOpenSpeakerModal}
                  className="w-full text-xs font-bold py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#1769AA] to-[#138A9E] hover:brightness-110 text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Apply as Speaker (Weekend Sessions)</span>
                </button>
              )}
              <p className="text-[11px] text-gray-400">
                All speaker profiles are verified on LinkedIn before directory listing.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/company/ctrl-data-grow/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0077b5] flex items-center justify-center text-white hover:brightness-110 transition-colors shadow-sm"
                title="LinkedIn Official Page"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sky-200/60 gap-4">
          <div>
            © 2026 Ctrl + Data + Grow (CDG). All rights reserved. Founded by Jagadeesh Pondara.
          </div>

          <div className="flex items-center gap-6">
            <a href="#trust-safety" className="hover:text-white transition-colors">Trust & Safety Charter</a>
            <a href="#privacy" className="hover:text-white transition-colors">Academic Privacy</a>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
