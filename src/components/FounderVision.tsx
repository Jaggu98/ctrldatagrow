import React from 'react';
import { Quote, Linkedin } from 'lucide-react';

interface FounderVisionProps {
  onOpenPartnerModal?: () => void;
}

export const FounderVision: React.FC<FounderVisionProps> = ({ onOpenPartnerModal }) => {
  return (
    <section id="founder" className="relative py-20 md:py-28 bg-[#0B1F33] text-white overflow-hidden border-y border-[#1769AA]/20">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#138A9E]/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 w-80 h-80 bg-[#D6A84F]/5 rounded-full blur-3xl" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#138A9E]/15 border border-[#138A9E]/30 text-[#138A9E] text-xs font-bold tracking-widest uppercase mb-4">
            <span>Leadership & Purpose</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            A vision to bring industry <span className="text-[#138A9E]">closer to every campus</span>
          </h2>
        </div>

        {/* Main 2-Column Founder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Official Gold Framed Founder Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm sm:max-w-md w-full">
              {/* Subtle ambient gold halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#D6A84F]/40 to-[#138A9E]/30 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#D6A84F]/30 bg-[#071321]">
                <img
                  src="/images/founder-jagadeesh.png"
                  alt="Jagadeesh Pondara - CEO & Founder of Ctrl + Data + Grow"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Founder's Quote & Verified Institutional Pillars */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Primary Quote Box */}
            <div className="relative bg-[#102A45]/80 backdrop-blur-md rounded-2xl p-7 sm:p-9 border border-[#1769AA]/30 shadow-xl">
              <Quote className="w-10 h-10 text-[#138A9E]/40 mb-4" />
              
              <blockquote className="text-base sm:text-lg md:text-xl text-slate-100 font-normal leading-relaxed italic space-y-4">
                <p>
                  &ldquo;I believe education becomes more meaningful when academic knowledge meets real-world experience. Ctrl + Data + Grow is envisioned as a bridge between campuses and industry professionals, creating opportunities for students to learn directly from people who solve real business and technology problems every day.&rdquo;
                </p>
                <p>
                  &ldquo;Our goal is to make industry exposure more accessible, practical, and valuable for academic institutions and students across India.&rdquo;
                </p>
              </blockquote>

              {/* Byline in Premium Gold */}
              <div className="mt-7 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] text-[#D6A84F] uppercase block">
                    JAGADEESH PONDARA &nbsp;•&nbsp; FOUNDER &amp; CEO
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5 block">
                    Ctrl + Data + Grow · Enterprise Industry-Campus Network
                  </span>
                </div>

                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1769AA]/20 hover:bg-[#1769AA]/40 border border-[#1769AA]/40 text-xs font-semibold text-[#8ED0EA] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Institutional Trust & Verification Pillars */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 rounded-xl bg-[#0E243A] border border-[#1769AA]/20">
                <div className="flex items-center gap-2 mb-1.5 text-xs font-bold tracking-wider uppercase text-[#138A9E]">
                  <ShieldCheck className="w-4 h-4 text-[#2BAE66]" />
                  <span>Verified Credentials Only</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Strict policy against unverified claims. Every speaker profile, case study, and syllabus mapping is authenticated before stepping on campus.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-[#0E243A] border border-[#1769AA]/20">
                <div className="flex items-center gap-2 mb-1.5 text-xs font-bold tracking-wider uppercase text-[#D6A84F]">
                  <CheckCircle2 className="w-4 h-4 text-[#D6A84F]" />
                  <span>Academic Alignment</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Engineered specifically to complement university board-of-studies syllabi with actionable production architecture and placement clarity.
                </p>
              </div>
            </div> */}

            {onOpenPartnerModal && (
              <div className="pt-2">
                <button
                  onClick={onOpenPartnerModal}
                  className="inline-flex items-center gap-2 bg-[#138A9E] hover:bg-[#0E6D82] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  <span>Request a session with leadership</span>
                  <span>→</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
