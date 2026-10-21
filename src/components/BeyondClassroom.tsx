import React, { useState } from 'react';
import { Check, Filter, ArrowUpRight } from 'lucide-react';

interface BeyondClassroomProps {
  onSelectCategory?: (category: string) => void;
  onExploreExperts?: () => void;
}

export const BeyondClassroom: React.FC<BeyondClassroomProps> = ({
  onSelectCategory,
  onExploreExperts
}) => {
  const [activeFilter, setActiveFilter] = useState<'Domain' | 'Audience' | 'Format' | 'Duration'>('Domain');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const domains = [
    { name: 'Data & Business Analytics', color: '#138A9E', sub: 'Data-driven Decision Making' },
    { name: 'SQL & MySQL Databases', color: '#1769AA', sub: 'Queries, Modeling & Indexing' },
    { name: 'Python & Azure Databricks', color: '#0B1F33', sub: 'Python Programming & Pipelines' },
    { name: 'Power BI & Tableau', color: '#138A9E', sub: 'Business Intelligence & Dashboards' },
    { name: 'Microsoft Excel Analytics', color: '#2BAE66', sub: 'Advanced Modeling & Metrics' },
    { name: 'Career Growth in Data', color: '#1769AA', sub: 'Placement Mastery & Interview Prep' },
    { name: 'Business Intelligence (BI)', color: '#138A9E', sub: 'KPI Architecture & Reporting' },
    { name: 'Data-driven Decision Making', color: '#0B1F33', sub: 'Executive Frameworks & Case Studies' },
    { name: 'Cloud Data Pipelines', color: '#2BAE66', sub: 'Databricks, Warehousing & ETL' },
    { name: 'Industry Mentorship', color: '#1769AA', sub: '1-on-1 Guidance & Live Portfolio' },
  ];

  const handleDomainClick = (domainName: string) => {
    setSelectedDomain(domainName === selectedDomain ? null : domainName);
    if (onSelectCategory) {
      onSelectCategory(domainName);
    }
  };

  return (
    <section id="domains" className="py-20 md:py-28 bg-[#EAF6FA] border-b border-[#D7EAF3] relative overflow-hidden">
      {/* Decorative background curve */}
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-tl from-[#138A9E]/10 to-transparent blur-3xl" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-left mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D7EAF3] text-[#138A9E] text-xs font-bold tracking-widest uppercase mb-3 shadow-sm">
            <span>Curriculum & Disciplines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F33] tracking-tight">
            Experiences that go <span className="text-[#138A9E]">beyond the classroom</span>
          </h2>
          <p className="text-sm sm:text-base text-[#4A6D88] mt-3 max-w-2xl font-normal">
            Cross-functional industry tracks aligned with both contemporary student aspirations and university board-of-studies syllabi.
          </p>
        </div>

        {/* 10 Solid Colored Domain Blocks (5 Columns x 2 Rows on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-8">
          {domains.map((item) => {
            const isSelected = selectedDomain === item.name;
            return (
              <button
                key={item.name}
                onClick={() => handleDomainClick(item.name)}
                className="group relative rounded-2xl p-5 text-left text-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between min-h-[110px] cursor-pointer"
                style={{ backgroundColor: item.color }}
              >
                <div>
                  <h3 className="font-bold text-sm sm:text-[15px] leading-snug tracking-tight">
                    {item.name}
                  </h3>
                  <span className="text-[11px] text-white/75 mt-1 block font-normal">
                    {item.sub}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/20 text-[11px] font-semibold text-white/90">
                  <span>{isSelected ? 'Selected' : 'View Experts'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Dual Panels: Program Filters & Every Category Links To */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Panel: Program Filters */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-7 border border-[#D7EAF3] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#138A9E] uppercase mb-4">
                <Filter className="w-3.5 h-3.5" />
                <span>Program Filters</span>
              </div>

              {/* 4 Pill Buttons in 2x2 Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {(['Domain', 'Audience', 'Format', 'Duration'] as const).map((filterName) => (
                  <button
                    key={filterName}
                    onClick={() => setActiveFilter(filterName)}
                    className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all border text-center ${
                      activeFilter === filterName
                        ? 'bg-[#1769AA] text-white border-[#1769AA] shadow-sm'
                        : 'bg-[#F4F9FC] text-[#0B1F33] border-[#C5E2EC] hover:border-[#138A9E]'
                    }`}
                  >
                    {filterName}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-[#527793] font-medium pt-2 border-t border-[#EAF4F8]">
              Narrow the catalogue in a click. Selected filter: <span className="font-bold text-[#0B1F33]">{activeFilter}</span>
            </p>
          </div>

          {/* Right Panel: Every Category Links To */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-7 border border-[#D7EAF3] shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold tracking-widest text-[#138A9E] uppercase mb-4">
                <span>Every Category Links To</span>
              </div>

              <ul className="space-y-3.5">
                <li className="flex items-center gap-3 text-xs sm:text-sm text-[#0B1F33] font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#2BAE66]/15 flex items-center justify-center text-[#2BAE66] flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Relevant verified industry experts &amp; lead architects</span>
                </li>

                <li className="flex items-center gap-3 text-xs sm:text-sm text-[#0B1F33] font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#138A9E]/15 flex items-center justify-center text-[#138A9E] flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Matching syllabus-aligned session programs &amp; workshops</span>
                </li>

                <li className="flex items-center gap-3 text-xs sm:text-sm text-[#0B1F33] font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#1769AA]/15 flex items-center justify-center text-[#1769AA] flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Upcoming public campus keynotes, hackathons and insights</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#EAF4F8] flex justify-end">
              <button
                onClick={onExploreExperts}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#138A9E] hover:text-[#0E6D82] transition-colors"
              >
                <span>Browse full expert catalogue</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
