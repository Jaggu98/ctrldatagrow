import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'white';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'full' }) => {
  if (variant === 'white') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <div className="relative w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center p-1 border border-white/20">
          <img src="/assets/cdg-emblem.png" alt="CDG" className="w-full h-auto object-contain brightness-200" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1 font-bold text-lg tracking-tight text-white leading-none">
            <span>Ctrl</span>
            <span className="text-[#38BDF8]">+</span>
            <span>Data</span>
            <span className="text-[#4ADE80]">+</span>
            <span>Grow</span>
          </div>
          <span className="text-[9px] tracking-wider font-semibold text-sky-200 uppercase mt-0.5">
            Connect Industry Experts to Campus
          </span>
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
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      <img 
        src="/assets/logo-brand.png" 
        alt="Ctrl + Data + Grow" 
        className="h-7 sm:h-9 md:h-11 max-w-[170px] sm:max-w-[220px] md:max-w-none w-auto object-contain"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
};
