import React, { useState } from 'react';
import { ENGAGEMENTS_DATA, Engagement } from '../data/mockData';
import { ArrowRight, Clock, Users } from 'lucide-react';

interface EngagementsProps {
  onSelectEngagement: (engagement: Engagement) => void;
}

export const Engagements: React.FC<EngagementsProps> = ({ onSelectEngagement }) => {
  const [activeId, setActiveId] = useState<string>('guest-lectures');

  return (
    <section id="engagements" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#1286A0] uppercase">
              Formats & Engagements
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#103957] tracking-tight mt-1">
              A wide range of campus engagements
            </h2>
            <p className="text-sm sm:text-base text-[#244866] mt-2 max-w-xl">
              Choose from diverse, flexible delivery models designed around your college's academic calendar, symposiums, and student requirements.
            </p>
          </div>

          <a
            href="#plan"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1286A0] hover:text-[#0E6D82] transition-colors self-start md:self-auto"
          >
            <span>View all formats</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Desktop Expandable Cards Layout (Matching Reference Slice 3) */}
        <div className="hidden lg:flex gap-4 h-[440px] w-full">
          {ENGAGEMENTS_DATA.map((item) => {
            const isActive = activeId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveId(item.id)}
                onMouseEnter={() => setActiveId(item.id)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${
                  isActive ? 'flex-[3.5] shadow-xl' : 'flex-1 hover:flex-[1.2]'
                }`}
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-105"
                />

                {/* Gradient Overlays */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isActive
                      ? 'bg-gradient-to-t from-[#0D2B45] via-[#103957]/80 to-black/30'
                      : 'bg-gradient-to-b from-[#153F60]/90 to-[#103957]/95 hover:from-[#1286A0]/80'
                  }`}
                />

                {/* Inactive Vertical State (Narrow Pillar) */}
                {!isActive && (
                  <div className="absolute inset-0 p-6 flex flex-col justify-between items-center z-10">
                    <span className="text-xs font-semibold text-sky-200/90 tracking-widest uppercase">
                      0{ENGAGEMENTS_DATA.indexOf(item) + 1}
                    </span>
                    <h3
                      className="text-white text-lg font-bold tracking-wide whitespace-nowrap"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                      {item.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                )}

                {/* Active Expanded State */}
                {isActive && (
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10 animate-in fade-in duration-300">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1286A0]/90 text-white text-xs font-bold tracking-wider uppercase mb-3 w-fit">
                      <span>{item.subtitle}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-sky-100 max-w-lg mb-5 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-sky-200 mb-6">
                      <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>{item.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Users className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>{item.audience}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEngagement(item);
                        }}
                        className="inline-flex items-center gap-2 bg-[#1286A0] hover:bg-[#0E6D82] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl shadow transition-colors"
                      >
                        <span>Schedule this format</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile / Tablet Grid Fallback */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-5">
          {ENGAGEMENTS_DATA.map((item) => (
            <div
              key={item.id}
              className="relative rounded-2xl overflow-hidden shadow-md h-80 flex flex-col justify-end p-6 text-white group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#103957] via-[#103957]/70 to-transparent" />
              
              <div className="relative z-10">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#38BDF8] bg-black/40 px-2.5 py-0.5 rounded-full inline-block mb-2">
                  {item.subtitle}
                </span>
                <h3 className="text-xl font-bold mb-1.5">{item.title}</h3>
                <p className="text-xs text-sky-100 line-clamp-2 mb-3">
                  {item.description}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-white/20">
                  <span className="text-xs text-sky-200">{item.duration}</span>
                  <button
                    onClick={() => onSelectEngagement(item)}
                    className="text-xs font-bold text-[#38BDF8] flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
