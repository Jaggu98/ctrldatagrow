import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'white';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'full' }) => {
  if (variant === 'white') {
    return (
      <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center p-1 border border-white/20 shrink-0">
          <img src="/assets/cdg-emblem.png" alt="CDG" className="w-full h-auto object-contain brightness-200" />
        </div>
        <div className="inline-flex flex-col justify-center">
          <div className="flex items-center gap-1 font-black text-base sm:text-lg md:text-xl tracking-tight text-white leading-none whitespace-nowrap">
            <span>Ctrl</span>
            <span className="text-[#38BDF8]">+</span>
            <span>Data</span>
            <span className="text-[#4ADE80]">+</span>
            <span>Grow</span>
          </div>
          <div className="w-full flex items-center justify-between mt-1 overflow-hidden">
            <span className="h-[1px] flex-1 bg-sky-400/40 min-w-[6px]"></span>
            <span className="text-[5px] sm:text-[5.8px] md:text-[6.5px] tracking-[0.03em] font-medium text-sky-200 uppercase leading-none whitespace-nowrap px-1.5">
              Connect Industry Experts to Campus
            </span>
            <span className="h-[1px] flex-1 bg-sky-400/40 min-w-[6px]"></span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <img src="/assets/cdg-emblem.png" alt="CDG Logo" className="h-8 w-auto object-contain" />
        <span className="font-bold text-base tracking-tight text-[#153F60]">
          Ctrl <span className="text-[#1286A0]">+</span> Data <span className="text-[#16A34A]">+</span> Grow
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <img 
        src="/assets/cdg-emblem.png" 
        alt="Ctrl + Data + Grow" 
        className="h-8 sm:h-9 md:h-10 w-auto object-contain shrink-0 drop-shadow-sm"
      />
      <div className="inline-flex flex-col justify-center">
        <div className="flex items-center gap-1 font-black text-base sm:text-lg md:text-xl tracking-tight text-[#072B4A] leading-none whitespace-nowrap">
          <span>Ctrl</span>
          <span className="text-[#1286A0]">+</span>
          <span>Data</span>
          <span className="text-[#16A34A]">+</span>
          <span>Grow</span>
        </div>
        <div className="w-full flex items-center justify-between mt-1 sm:mt-1.5 overflow-hidden">
          <span className="h-[1px] flex-1 bg-[#1286A0]/40 min-w-[6px]"></span>
          <span className="text-[5px] sm:text-[5.8px] md:text-[6.5px] tracking-[0.03em] font-semibold text-[#153F60] uppercase leading-none whitespace-nowrap px-1.5">
            Connect Industry Experts to Campus
          </span>
          <span className="h-[1px] flex-1 bg-[#1286A0]/40 min-w-[6px]"></span>
        </div>
      </div>
    </div>
  );
};
