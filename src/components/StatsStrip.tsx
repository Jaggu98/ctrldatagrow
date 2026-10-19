import React from 'react';

export const StatsStrip: React.FC = () => {
  const stats = [
    { number: '100+', label: 'Industry Experts' },
    { number: '50+', label: 'Partner Institutions' },
    { number: '200+', label: 'Sessions Conducted' },
    { number: '10,000+', label: 'Students Reached' },
  ];

  return (
    <div id="stats" className="relative z-30 -translate-y-1/2 -mb-8 sm:-mb-10 md:-mb-12 pointer-events-none">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
        {/* Floating Rounded Card Overlapping 50% on light-blue section and 50% on white section */}
        <div className="bg-[#103957] rounded-2xl sm:rounded-3xl border border-white/25 shadow-2xl shadow-sky-950/25 px-6 sm:px-12 py-5 sm:py-6 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center justify-between">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center text-center">
                <span className="text-2xl sm:text-3xl md:text-[34px] font-extrabold tracking-tight text-white leading-tight">
                  {stat.number}
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-slate-200 mt-1 whitespace-nowrap">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
