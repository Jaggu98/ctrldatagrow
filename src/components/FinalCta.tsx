import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FinalCtaProps {
  onOpenPartnerModal: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenPartnerModal }) => {
  return (
    <section className="relative bg-[#1286A0] text-white py-16 md:py-24 overflow-hidden">
      {/* Subtle concentric ripple curves background (static SVG) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 400" fill="none" preserveAspectRatio="none">
          <circle cx="950" cy="200" r="150" stroke="white" strokeWidth="1.5" />
          <circle cx="950" cy="200" r="280" stroke="white" strokeWidth="1.2" />
          <circle cx="950" cy="200" r="420" stroke="white" strokeWidth="1" />
          <circle cx="950" cy="200" r="580" stroke="white" strokeWidth="0.8" />
          <circle cx="950" cy="200" r="750" stroke="white" strokeWidth="0.6" />
        </svg>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-sm">
              <span>Get Started Today</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Bring the right experts to your campus
            </h2>

            <p className="text-base sm:text-lg text-sky-100 font-normal leading-relaxed">
              Connect your students with inspiring leaders, practical insights, and career-defining mentorship. No administrative delays, just impactful learning.
            </p>
          </div>

          {/* Right Action Button Card (Matching Reference Slice 10) */}
          <div className="flex-shrink-0">
            <div className="bg-white/10 p-2 rounded-2xl backdrop-blur-sm border border-white/20">
              <button
                onClick={onOpenPartnerModal}
                className="inline-flex items-center justify-center gap-3 bg-white text-[#1286A0] hover:bg-[#F3F9FC] font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-xl transition-all duration-200 active:scale-95 group"
              >
                <span>Partner with us</span>
                <ArrowRight className="w-4 h-4 text-[#1286A0] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
