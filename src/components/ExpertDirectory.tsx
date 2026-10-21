import React, { useState } from 'react';
import { EXPERTS_DATA, Expert } from '../data/mockData';
import { ArrowRight, CheckCircle2, Calendar } from 'lucide-react';

interface ExpertDirectoryProps {
  onSelectExpert: (expert: Expert) => void;
  onOpenSpeakerModal?: () => void;
}

export const ExpertDirectory: React.FC<ExpertDirectoryProps> = ({
  onSelectExpert,
  onOpenSpeakerModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Resource Persons' },
    { id: 'analytics', label: 'Data & Business Analytics' },
    { id: 'sql', label: 'SQL & MySQL' },
    { id: 'python', label: 'Python & Azure Databricks' },
    { id: 'bi', label: 'Power BI & Tableau' },
    { id: 'career', label: 'Excel & Career Growth' },
  ];

  const filteredExperts = EXPERTS_DATA.filter((expert) => {
    return selectedCategory === 'all' || expert.category === selectedCategory;
  });

  return (
    <section id="experts" className="py-16 md:py-24 bg-white border-b border-[#EAF4F8]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Controls Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#1286A0] uppercase">
              Resource Persons &amp; Speakers
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#103957] tracking-tight mt-1">
              Learn from verified industry leaders
            </h2>
            <p className="text-sm sm:text-base text-[#244866] mt-2 max-w-xl">
              Vetted practitioners and analytics leaders eager to mentor students in SQL, MySQL, Python, Excel, Azure Databricks, Power BI, Tableau, and Data-driven Decision Making.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#153F60] text-white shadow-sm'
                      : 'bg-[#F3F9FC] text-[#244866] hover:bg-[#EAF4F8] hover:text-[#103957] border border-[#C5E2EC]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Directory Rows (Horizontal Table/List matching slice 5) */}
        <div className="border border-[#C5E2EC] rounded-2xl overflow-hidden bg-white shadow-sm">
          
          {/* Table Header (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3.5 bg-[#F3F9FC] border-b border-[#C5E2EC] text-[11.5px] font-bold text-[#153F60] uppercase tracking-wider">
            <div className="col-span-4">Resource Person &amp; Designation</div>
            <div className="col-span-4">Subject Expertise &amp; Topics</div>
            <div className="col-span-2">Availability &amp; Mode</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#EAF4F8]">
            {filteredExperts.length > 0 ? (
              filteredExperts.map((expert) => (
                <div
                  key={expert.id}
                  className="p-5 sm:px-6 sm:py-5 hover:bg-[#F8FCFE] transition-colors flex flex-col md:grid md:grid-cols-12 gap-4 items-start md:items-center"
                >
                  {/* Column 1: Profile Photo & Name */}
                  <div className="col-span-4 flex items-center gap-3.5 w-full md:w-auto">
                    <div className="relative flex-shrink-0">
                      <img
                        src={expert.image}
                        alt={expert.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#1286A0] shadow-sm"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 bg-[#1286A0] text-white p-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#103957] flex items-center gap-2">
                        {expert.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {expert.role} • <span className="text-[#153F60] font-semibold">{expert.company}</span>
                      </p>
                      <span className="inline-block md:hidden mt-1 text-[10px] font-bold uppercase tracking-wider text-[#1286A0] bg-[#EAF4F8] px-2 py-0.5 rounded">
                        {expert.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Column 2: Subject Expertise */}
                  <div className="col-span-4 w-full md:w-auto">
                    <span className="text-xs font-bold text-[#103957] block">
                      {expert.expertise}
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {expert.topics.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-[#EAF4F8] text-[#153F60] px-2 py-0.5 rounded font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Availability & Mode */}
                  <div className="col-span-2 text-xs text-[#244866]">
                    <div className="flex items-center gap-1.5 font-semibold text-[#103957]">
                      <Calendar className="w-3.5 h-3.5 text-[#1286A0]" />
                      <span>{expert.availability}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      {expert.format}
                    </span>
                  </div>

                  {/* Column 4: Action */}
                  <div className="col-span-2 w-full md:w-auto flex md:justify-end">
                    <button
                      onClick={() => onSelectExpert(expert)}
                      className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 bg-[#F3F9FC] hover:bg-[#1286A0] hover:text-white text-[#1286A0] font-semibold text-xs px-4 py-2 rounded-xl border border-[#C5E2EC] hover:border-[#1286A0] transition-all shadow-sm"
                    >
                      <span>Request Session</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500 text-sm">
                No experts found matching this filter. Try selecting "All Experts".
              </div>
            )}
          </div>
        </div>

        {/* Bottom Directory Link & Speaker Application Banner */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#244866] gap-3">
          <span>Displaying verified speakers with active campus availability for upcoming semesters.</span>
          <button
            onClick={() => setSelectedCategory('all')}
            className="font-bold text-[#1286A0] hover:text-[#0E6D82] flex items-center gap-1 cursor-pointer"
          >
            <span>View all 100+ industry profiles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Join as Resource Person Callout */}
        {onOpenSpeakerModal && (
          <div className="mt-8 p-6 rounded-2xl bg-[#0B1F33] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-[#1769AA]/30">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#138A9E]/20 text-[#38BDF8] border border-[#138A9E]/40 uppercase tracking-wider">
                For Industry Professionals
              </div>
              <h4 className="text-base sm:text-lg font-bold">
                Passionate About Mentoring in Data, Analytics &amp; Career Growth?
              </h4>
              <p className="text-xs text-sky-100/80 max-w-xl">
                Register as a CDG Resource Person. Share your expertise in SQL, Business Analytics, Python, Power BI, Tableau, Azure Databricks, and Decision Making with student communities across 50+ colleges.
              </p>
            </div>
            <button
              onClick={onOpenSpeakerModal}
              className="shrink-0 px-5 py-2.5 rounded-xl bg-[#1286A0] hover:bg-[#0E6D82] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Enroll as Resource Person</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
