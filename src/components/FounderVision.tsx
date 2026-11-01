import React, { useState, useEffect, useRef } from 'react';
import { Quote, Linkedin, Award, Briefcase, Eye } from 'lucide-react';

interface FounderVisionProps {
  onOpenPartnerModal?: () => void;
}

interface RollingCounterProps {
  end: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  startTrigger: boolean;
}

const RollingCounter: React.FC<RollingCounterProps> = ({
  end,
  decimals = 0,
  duration = 1800,
  prefix = '',
  suffix = '',
  startTrigger,
}) => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!startTrigger) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic: starts fast and smoothly decelerates into place
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = easeOut * end;

      setVal(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setVal(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration, startTrigger]);

  const displayVal =
    decimals > 0
      ? val.toFixed(decimals)
      : Math.floor(val).toLocaleString();

  return (
    <span>
      {prefix}
      {displayVal}
      {suffix}
    </span>
  );
};

export const FounderVision: React.FC<FounderVisionProps> = ({ onOpenPartnerModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-[#0B1F33] text-white overflow-hidden border-y border-[#1769AA]/20"
    >
      <div id="founder" className="absolute -top-24 pointer-events-none" />
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

                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href="https://www.linkedin.com/in/pondara-jagadeesh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0077B5]/20 hover:bg-[#0077B5]/40 border border-[#0077B5]/50 text-xs font-semibold text-[#8ED0EA] transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>Connect on LinkedIn</span>
                  </a>
                  <a
                    href="https://topmate.io/pondara_jagadeesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D6A84F]/20 hover:bg-[#D6A84F]/40 border border-[#D6A84F]/50 text-xs font-semibold text-[#F2D082] transition-colors"
                  >
                    <Award className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>Book on Topmate</span>
                  </a>
                </div>
              </div>
            </div>

            {/* CEO Track Record & Impact Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
              {/* LinkedIn Followers */}
              <a
                href="https://www.linkedin.com/in/pondara-jagadeesh/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 sm:p-5 rounded-xl bg-[#0E243A]/90 border border-[#1769AA]/30 hover:border-[#0077B5] hover:bg-[#102d4a] transition-all flex flex-col justify-between shadow-lg group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-slate-300">
                    LinkedIn
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#0077B5]/20 flex items-center justify-center text-[#38bdf8] group-hover:scale-110 transition-transform">
                    <Linkedin className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                    <RollingCounter
                      end={20}
                      suffix="k+"
                      startTrigger={isVisible}
                    />
                  </div>
                  <span className="text-xs text-slate-300 group-hover:text-sky-300 font-medium mt-0.5 flex items-center justify-between">
                    <span>Followers</span>
                    <span className="text-[10px] text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">View Profile →</span>
                  </span>
                </div>
              </a>

              {/* Quora Views */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#0E243A]/90 border border-[#1769AA]/30 hover:border-[#138A9E]/50 transition-all flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-slate-300">
                    Quora
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#B92B27]/20 flex items-center justify-center text-[#f87171]">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                    <RollingCounter
                      end={4.6}
                      decimals={1}
                      suffix=" Million"
                      startTrigger={isVisible}
                    />
                  </div>
                  <span className="text-xs text-slate-300 font-medium mt-0.5 block">
                    Content Views
                  </span>
                </div>
              </div>

              {/* Topmate */}
              <a
                href="https://topmate.io/pondara_jagadeesh"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 sm:p-5 rounded-xl bg-[#0E243A]/90 border border-[#1769AA]/30 hover:border-[#D6A84F] hover:bg-[#102d4a] transition-all flex flex-col justify-between shadow-lg group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#D6A84F]">
                    Topmate
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#D6A84F]/20 flex items-center justify-center text-[#D6A84F] group-hover:scale-110 transition-transform">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                    <RollingCounter
                      end={0.1}
                      decimals={1}
                      prefix="Top "
                      suffix="%"
                      startTrigger={isVisible}
                    />
                    <span className="text-sm font-semibold text-slate-300 ml-1.5">
                      Mentor
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D6A84F]/15 text-[#E6BC65] border border-[#D6A84F]/30">
                      ★ Top Speaker 2024
                    </span>
                    <span className="text-[10px] text-[#F2D082] opacity-0 group-hover:opacity-100 transition-opacity">Book 1:1 →</span>
                  </div>
                </div>
              </a>

              {/* IT Industry Experience */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#0E243A]/90 border border-[#1769AA]/30 hover:border-[#138A9E]/50 transition-all flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#138A9E]">
                    Experience
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#138A9E]/20 flex items-center justify-center text-[#138A9E]">
                    <Briefcase className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                    <RollingCounter
                      end={6}
                      suffix=" yrs+"
                      startTrigger={isVisible}
                    />
                  </div>
                  <span className="text-xs text-slate-300 font-medium mt-0.5 block">
                    Years of IT Experience
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              {onOpenPartnerModal && (
                <button
                  onClick={onOpenPartnerModal}
                  className="inline-flex items-center gap-2 bg-[#138A9E] hover:bg-[#0E6D82] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  <span>Request a session with leadership</span>
                  <span>→</span>
                </button>
              )}
              <a
                href="https://topmate.io/pondara_jagadeesh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#D6A84F] hover:bg-[#C2943D] text-[#0B1F33] text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-md transition-all active:scale-[0.98]"
              >
                <Award className="w-4 h-4 text-[#0B1F33]" />
                <span>Book Mentorship on Topmate</span>
                <span>↗</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
