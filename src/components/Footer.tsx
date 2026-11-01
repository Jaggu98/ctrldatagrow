import React from 'react';
import { Logo } from './Logo';
import { Mail, MapPin, Linkedin, Youtube, ArrowUp, ExternalLink, Award, UserCheck, Calendar, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenPartnerModal?: () => void;
  onOpenSpeakerModal?: () => void;
  onOpenAmbassadorModal?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPartnerModal,
  onOpenSpeakerModal,
  onOpenAmbassadorModal,
  onOpenAdmin
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
                  href="https://www.linkedin.com/company/ctrl-data-grow/home/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#60A5FA] hover:text-white font-medium inline-flex items-center gap-1 transition-colors"
                >
                  linkedin.com/company/ctrl-data-grow
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Youtube className="w-4 h-4 text-[#FF0000]" />
                <a
                  href="https://www.youtube.com/@CtrlDataJourney/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#60A5FA] hover:text-white font-medium inline-flex items-center gap-1 transition-colors"
                >
                  youtube.com/@CtrlDataJourney
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
              <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#team" className="hover:text-white transition-colors">Team &amp; Leadership</a></li>
              <li><a href="#resources" className="hover:text-white transition-colors">Student Resources</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Courses &amp; Formats</a></li>
              <li><a href="#hackathons" className="hover:text-white transition-colors">Hackathon Co-Sponsorship</a></li>
              <li><a href="#trust-safety" className="hover:text-white transition-colors">Trust &amp; Safety Charter</a></li>
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
                  className="w-full text-xs font-bold py-2.5 px-3 rounded-lg bg-[#1286A0] hover:bg-[#0E6D82] text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Apply as Speaker (Weekend Sessions)</span>
                </button>
              )}
              <p className="text-[11px] text-gray-400">
                All speaker profiles are verified on LinkedIn before directory listing.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href="https://www.linkedin.com/company/ctrl-data-grow/home/"
                target="_blank"
                rel="noreferrer"
                className="h-9 px-3 rounded-lg bg-[#0077b5] flex items-center gap-1.5 text-white text-xs font-semibold hover:brightness-110 transition-all shadow-sm"
                title="LinkedIn Official Company Page"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.youtube.com/@CtrlDataJourney/videos"
                target="_blank"
                rel="noreferrer"
                className="h-9 px-3 rounded-lg bg-[#CC0000] hover:bg-[#FF0000] flex items-center gap-1.5 text-white text-xs font-semibold transition-all shadow-sm"
                title="Ctrl + Data + Grow Official YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
                <span>YouTube</span>
              </a>
              <a
                href="https://topmate.io/pondara_jagadeesh"
                target="_blank"
                rel="noreferrer"
                className="h-9 px-3 rounded-lg bg-[#D6A84F] hover:bg-[#C2943D] text-[#0B1F33] flex items-center gap-1.5 text-xs font-bold transition-all shadow-sm"
                title="Founder Mentorship on Topmate"
              >
                <Award className="w-4 h-4 text-[#0B1F33]" />
                <span>Topmate</span>
              </a>
              <a
                href="https://www.linkedin.com/in/pondara-jagadeesh/"
                target="_blank"
                rel="noreferrer"
                className="h-9 px-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 flex items-center gap-1.5 text-white text-xs font-semibold transition-all shadow-sm"
                title="Founder & CEO LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Founder</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sky-200/60 gap-4">
          <div>
            © 2026 Ctrl + Data + Grow (CDG). All rights reserved. Founded by{' '}
            <a
              href="https://www.linkedin.com/in/pondara-jagadeesh/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#60A5FA] hover:text-white font-medium underline underline-offset-2 transition-colors"
            >
              Jagadeesh Pondara
            </a>
            {' '}(
            <a
              href="https://topmate.io/pondara_jagadeesh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D6A84F] hover:text-[#F2D082] transition-colors"
            >
              Topmate ↗
            </a>
            ).
          </div>

          <div className="flex items-center gap-6">
            <a href="#trust-safety" className="hover:text-white transition-colors">Trust & Safety Charter</a>
            <a href="#privacy" className="hover:text-white transition-colors">Academic Privacy</a>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hover:text-[#138A9E] text-slate-400 text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                title="Open Supabase Admin Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#138A9E]" />
                <span>Admin Desk</span>
              </button>
            )}
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
