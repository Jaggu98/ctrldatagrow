import React from 'react';
import { ArrowRight, FileText, UserCheck, CalendarCheck, Award } from 'lucide-react';

export const ProcessSteps: React.FC = () => {
  const steps = [
    {
      num: '1',
      title: 'Share your requirements',
      desc: 'Submit your departmental goals, target batch size, preferred dates, and specific topics.',
      icon: FileText,
      // Card 1: Shortest, White
      bgColor: 'bg-white',
      textColor: 'text-[#103957]',
      numColor: 'text-[#1286A0]',
      descColor: 'text-[#244866]',
      borderColor: 'border-[#C5E2EC]',
      heightClass: 'h-64 md:h-72',
    },
    {
      num: '2',
      title: 'Get expert recommendations',
      desc: 'Review curated profiles of vetted practitioners matching your syllabus objectives.',
      icon: UserCheck,
      // Card 2: Medium-short, Pale cyan/blue
      bgColor: 'bg-[#C5E2EC]',
      textColor: 'text-[#103957]',
      numColor: 'text-[#153F60]',
      descColor: 'text-[#153F60]/90',
      borderColor: 'border-[#B0D5E4]',
      heightClass: 'h-64 md:h-80',
    },
    {
      num: '3',
      title: 'Coordinate a plan',
      desc: 'Our academic desk handles calendar alignment, tech checks, slides, and institutional paperwork.',
      icon: CalendarCheck,
      // Card 3: Medium-tall, Teal
      bgColor: 'bg-[#1286A0]',
      textColor: 'text-white',
      numColor: 'text-white',
      descColor: 'text-sky-100',
      borderColor: 'border-[#0E6D82]',
      heightClass: 'h-64 md:h-96',
    },
    {
      num: '4',
      title: 'Conduct the session',
      desc: 'Host the live on-campus or virtual session, followed by Q&A, student feedback, and materials.',
      icon: Award,
      // Card 4: Tallest, Deep navy
      bgColor: 'bg-[#103957]',
      textColor: 'text-white',
      numColor: 'text-white',
      descColor: 'text-sky-200',
      borderColor: 'border-[#0D2B45]',
      heightClass: 'h-64 md:h-[430px]',
    },
  ];

  return (
    <section id="how-it-works" className="bg-[#EAF4F8] py-16 md:py-24 border-b border-[#D7EDF4]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-12">
          <span className="text-xs font-bold tracking-widest text-[#1286A0] uppercase">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#103957] tracking-tight mt-1">
            Simple, Seamless, Impactful.
          </h2>
          <p className="text-sm sm:text-base text-[#244866] mt-2 max-w-xl">
            From initial enquiry to post-session takeaways, we remove bureaucratic friction so your campus can focus entirely on high-impact student learning.
          </p>
        </div>

        {/* 4 Connected Progressive Stair-Step Cards (Aligned to bottom on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 items-end">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`${step.bgColor} ${step.borderColor} ${step.heightClass} border rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-4xl md:text-5xl font-black ${step.numColor} tracking-tight leading-none`}>
                      {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center">
                      <Icon className={`w-4 h-4 ${step.textColor}`} />
                    </div>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-bold ${step.textColor} leading-snug mb-2`}>
                    {step.title}
                  </h3>
                </div>

                <div>
                  <p className={`text-xs sm:text-sm ${step.descColor} leading-relaxed`}>
                    {step.desc}
                  </p>
                  <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between">
                    <span className={`text-[11px] font-semibold uppercase tracking-wider ${step.descColor}`}>
                      Step 0{step.num}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${step.descColor} group-hover:translate-x-1 transition-transform`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
