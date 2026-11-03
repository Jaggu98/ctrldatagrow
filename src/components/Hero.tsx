import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { INSTITUTIONS } from '../data/mockData';

interface HeroProps {
  onOpenPartnerModal: () => void;
  onExploreExperts: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPartnerModal, onExploreExperts }) => {
  // Duplicate institution list for seamless marquee loop
  const marqueeList = [...INSTITUTIONS, ...INSTITUTIONS];

  return (
    <section id="hero" className="relative pt-10 pb-12 md:pt-14 md:pb-16 overflow-hidden bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column (Editorial Content) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#103957] tracking-tight leading-[1.18] mb-5">
              Real industry minds, live in your{' '}
              <span className="text-[#1286A0]">lecture hall.</span>
            </h1>

            {/* Concise Supporting Copy */}
            <p className="text-base sm:text-lg text-[#244866] leading-relaxed mb-8 max-w-xl font-normal">
              Empower your students with direct access to senior practitioners through live guest lectures, hands-on workshops, and industry mentorship.
            </p>

            {/* Clean Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-8">
              <button
                onClick={onOpenPartnerModal}
                className="inline-flex items-center justify-center gap-2 bg-[#1286A0] hover:bg-[#0E6D82] text-white font-semibold text-sm sm:text-base px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Partner with us</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreExperts}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F3F9FC] text-[#153F60] font-semibold text-sm sm:text-base px-6 py-3 rounded-xl border border-[#C5E2EC] shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto"
              >
                <span>Explore experts</span>
              </button>
            </div>

            {/* Clean Trust Strip */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm font-medium text-[#153F60]/80 pt-3 border-t border-[#EAF4F8] w-full">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1286A0]" />
                <span>Verified Industry Leaders</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1286A0]" />
                <span>Custom Syllabus Alignment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1286A0]" />
                <span>Seamless Coordination</span>
              </div>
            </div>
          </div>

          {/* Right Column (Hero Graphic - Expanded Size Without Fixed Container) */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
            <img
              src="/images/hero-auditorium.png"
              alt="From Campus to Real-World Impact - Industry-led learning sessions"
              className="w-full max-w-lg lg:max-w-2xl xl:max-w-3xl h-auto object-contain select-none transition-transform duration-300 hover:scale-[1.02] drop-shadow-xl"
            />
          </div>

        </div>

        {/* Trusted by Leading Institutions Marquee (In Hero Section Only) */}
        <div className="mt-12 md:mt-16 pt-4 border-t border-[#EAF4F8]">
          <div className="text-center mb-4">
            <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
              Trusted by leading institutions across India
            </span>
          </div>

          <div className="relative w-full overflow-hidden py-1">
            {/* Left & Right Gradient Fade Masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />

            <div className="animate-marquee-infinite flex items-center gap-4 sm:gap-5 cursor-pointer select-none">
              {marqueeList.map((inst, idx) => (
                <div
                  key={`${inst.tag}-${idx}`}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F8FCFE] border border-[#D7EDF4] hover:border-[#1286A0] hover:bg-white hover:shadow-sm transition-all duration-150 group flex-shrink-0"
                >
                  <div className="w-6 h-6 rounded-md bg-[#EAF4F8] border border-[#C5E2EC] flex items-center justify-center text-[#153F60] font-bold text-[9.5px] group-hover:border-[#1286A0] group-hover:text-[#1286A0] group-hover:bg-[#1286A0]/10 transition-colors shrink-0">
                    {inst.tag}
                  </div>
                  <span className="text-[11.5px] sm:text-xs font-semibold text-[#153F60] group-hover:text-[#1286A0] transition-colors whitespace-nowrap tracking-tight">
                    {inst.name}
                  </span>
                  {inst.location && (
                    <span className="text-[9.5px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                      {inst.location}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
          </div>
        </div>

      </div>
    </section>
  );
};
