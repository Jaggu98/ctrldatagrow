import React from 'react';
import { ShieldCheck, Sliders, CalendarCheck, MessageSquare, MonitorPlay, HeartHandshake } from 'lucide-react';

export const ValueFeatures: React.FC = () => {
  const features = [
    {
      title: 'Access to verified experts',
      desc: 'Carefully vetted professionals with direct engineering, architecture, and leadership pedigree from Tier-1 product companies.',
      icon: ShieldCheck,
    },
    {
      title: 'Custom events & formats',
      desc: 'From 90-minute specialized masterclasses to full-day hackathon mentorship and multi-week hands-on tech labs.',
      icon: Sliders,
    },
    {
      title: 'End-to-end coordination',
      desc: 'We manage speaker briefing, syllabus alignment, deck reviews, travel/virtual infrastructure, and student feedback collection.',
      icon: CalendarCheck,
    },
    {
      title: 'Meaningful student engagement',
      desc: 'Interactive live Q&A, codebase walk-throughs, and real career advice designed specifically for pre-final and final-year cohorts.',
      icon: MessageSquare,
    },
    {
      title: 'Flexible models, online or offline',
      desc: 'Seamless hybrid delivery: in-person visits to your campus auditorium or high-definition live interactive virtual webinars.',
      icon: MonitorPlay,
    },
    {
      title: 'Support for institutions & faculty',
      desc: 'Assistance with NAAC/NBA documentation, participation certificates, and ongoing faculty development programs (FDP).',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="features" className="bg-[#F3F9FC] py-16 md:py-24 border-b border-[#D7EDF4]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#1286A0] uppercase">
            Campus Advantages
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#103957] tracking-tight mt-1">
            Creating meaningful campus experiences
          </h2>
          <p className="text-sm sm:text-base text-[#244866] mt-2">
            Built from the ground up to empower universities, department heads, and training & placement officers with frictionless industry connectivity.
          </p>
        </div>

        {/* 6 Feature Cards (3x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#C5E2EC] shadow-sm hover:shadow-md hover:border-[#1286A0] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EAF4F8] text-[#1286A0] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#103957] mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#244866] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#EAF4F8] text-[11px] font-semibold text-[#1286A0] uppercase tracking-wider">
                  Guaranteed Quality
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
