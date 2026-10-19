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
        <div className="animate-marquee-infinite flex items-center gap-6 sm:gap-8 cursor-pointer select-none">
          {marqueeList.map((inst, idx) => (
            <div
              key={`${inst.tag}-${idx}`}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-[#C5E2EC] hover:border-[#1286A0] hover:shadow-sm transition-all duration-200 group flex-shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-[#EAF4F8] border border-[#C5E2EC] flex items-center justify-center text-[#153F60] font-extrabold text-xs group-hover:border-[#1286A0] group-hover:text-[#1286A0] group-hover:bg-[#1286A0]/10 transition-colors">
                {inst.tag}
              </div>
              <span className="text-sm font-bold text-[#153F60] group-hover:text-[#1286A0] transition-colors whitespace-nowrap tracking-tight">
                {inst.name}
              </span>
            </div>
          ))}
        </div>

        {/* Right Gradient Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-[#FAFDFE] via-[#FAFDFE]/80 to-transparent z-10" />
      </div>
    </section>
  );
};
