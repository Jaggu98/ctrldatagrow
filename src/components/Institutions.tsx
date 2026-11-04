import React from 'react';
import { INSTITUTIONS } from '../data/mockData';

export const Institutions: React.FC = () => {
  // Duplicate the list so the marquee loops seamlessly without any jump
  const marqueeList = [...INSTITUTIONS, ...INSTITUTIONS];

  return (
    <section id="institutions" className="bg-[#FAFDFE] py-14 md:py-16 border-b border-[#EAF4F8] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <span className="text-[11px] font-bold tracking-widest text-[#1286A0] uppercase block mb-1">
          Campus Network
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#103957] tracking-tight">
          Trusted by leading institutions
        </h3>
      </div>

      {/* Marquee Container with Left & Right Gradient Masks */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Left Gradient Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-[#FAFDFE] via-[#FAFDFE]/80 to-transparent z-10" />

        {/* Moving Marquee Track */}
        <div className="animate-marquee-infinite flex items-center gap-4 sm:gap-5 cursor-pointer select-none">
          {marqueeList.map((inst, idx) => (
            <div
              key={`${inst.tag}-${idx}`}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white border border-[#C5E2EC] hover:border-[#1286A0] hover:shadow-xs transition-all duration-150 group flex-shrink-0"
            >
              {inst.logo ? (
                <div className="h-7 w-auto min-w-[28px] max-w-[120px] sm:h-8 sm:max-w-[140px] flex items-center justify-center shrink-0">
                  <img
                    src={inst.logo}
                    alt={`${inst.name} logo`}
                    className="h-full w-auto max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-md bg-[#EAF4F8] border border-[#C5E2EC] flex items-center justify-center text-[#153F60] font-bold text-[9.5px] group-hover:border-[#1286A0] group-hover:text-[#1286A0] group-hover:bg-[#1286A0]/10 transition-colors shrink-0">
                  {inst.tag}
                </div>
              )}
              <span className="text-[11.5px] sm:text-xs font-semibold text-[#153F60] group-hover:text-[#1286A0] transition-colors whitespace-nowrap tracking-tight">
                {inst.name}
              </span>
              {inst.location && (
                <span className="text-[9.5px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                  {inst.location}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Right Gradient Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-[#FAFDFE] via-[#FAFDFE]/80 to-transparent z-10" />
      </div>
    </section>
  );
};
