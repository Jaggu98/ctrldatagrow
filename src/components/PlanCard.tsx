import React, { useState } from 'react';
import {
  Calendar,
  BookOpen,
  Layers,
  Users,
  ArrowRight,
  ChevronDown,
  GraduationCap,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { EXPERTS_DATA, Expert } from '../data/mockData';

interface PlanCardProps {
  onSelectExpert: (expert: Expert) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ onSelectExpert }) => {
  const [sessionType, setSessionType] = useState('Guest Lecture (90–120 min)');
  const [domain, setDomain] = useState('AI, LLMs & Generative Tech');
  const [date, setDate] = useState('15-11-2026');
  const [collegeDept, setCollegeDept] = useState('B.Tech (CS, IT & AI)');

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    const expert = EXPERTS_DATA.find((exp) => exp.category === domain) || EXPERTS_DATA[0];
    onSelectExpert(expert);
  };

  return (
    <section id="plan" className="relative z-20 pt-16 pb-24 sm:pb-28 md:pb-32 bg-[#EDF6FA] overflow-hidden border-t border-[#D7EAF3]">
      {/* Decorative Background Elements */}
      {/* Left organic wave overlay */}
      <div className="pointer-events-none absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#D7EDF4]/60 via-[#E4F2F8]/40 to-transparent blur-3xl" />
      
      {/* Left 4x4 subtle dot matrix */}
      <div className="pointer-events-none absolute top-12 left-6 sm:left-14 opacity-40">
        <div className="grid grid-cols-4 gap-2.5">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#93C5FD]" />
          ))}
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Floating Paper Plane & Trail (Top-Right) */}
        <div className="hidden md:block absolute -top-5 right-4 lg:right-10 pointer-events-none z-10">
          <svg className="w-56 h-28 overflow-visible" viewBox="0 0 220 100" fill="none">
            {/* Dashed trajectory arc entering exactly into the arrow's middle notch */}
            <path
              d="M 12 90 C 70 94, 136 76, 184 26"
              stroke="#86C5DE"
              strokeWidth="1.75"
              strokeDasharray="4 4"
            />
            {/* Origami Paper Plane / Arrow with notch at (0,0) */}
            <g transform="translate(184, 26) rotate(48)">
              {/* Left wing (darker teal) */}
              <path
                d="M 0 -25 L -11 5 L 0 0 Z"
                fill="#0E6D82"
              />
              {/* Right wing (primary teal) */}
              <path
                d="M 0 -25 L 11 5 L 0 0 Z"
                fill="#1286A0"
              />
            </g>
          </svg>
        </div>

        {/* Floating Pill Badge: From classroom to real-world impact */}
        <div className="hidden lg:flex items-center gap-2.5 absolute top-1 right-24 bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-2xl shadow-sm border border-[#D7EAF3] z-10">
          <div className="w-7 h-7 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#1286A0] flex-shrink-0">
            <GraduationCap className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-semibold text-[#103957] leading-tight">From classroom</div>
            <div className="text-[10px] text-[#527793] leading-tight">to real-world impact</div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center mb-9">
          {/* Eyebrow with flanking lines */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-[#93C5FD]"></span>
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#1286A0] uppercase">
              Campus Sessions
            </span>
            <span className="w-8 h-[1px] bg-[#93C5FD]"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#103957] tracking-tight">
            Plan your campus session
          </h2>
          <p className="text-sm sm:text-base text-[#4A6D88] mt-2 max-w-xl mx-auto font-normal">
            Choose your format and domain to instantly match with certified practitioners.
          </p>
        </div>

        {/* The Big White Card Container */}
        <div className="bg-white rounded-3xl shadow-xl shadow-sky-900/5 border border-[#D7EAF3] p-5 sm:p-7 md:p-8">
          
          {/* Row 1: The Input Controls Bar + "Book this session ->" button */}
          <form onSubmit={handleBookSession}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-end">
              
              {/* Field 1: Session Format */}
              <div className="lg:col-span-3 flex flex-col">
                <label className="text-[12px] font-bold text-[#103957] mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#1286A0]" />
                  <span>Session Format</span>
                </label>
                <div className="relative">
                  <select
                    value={sessionType}
                    onChange={(e) => setSessionType(e.target.value)}
                    className="w-full bg-[#F4F9FC] border border-[#D7EAF3] hover:border-[#1286A0]/40 rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] text-[#103957] font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#1286A0]/20 focus:border-[#1286A0] transition-all cursor-pointer pr-8"
                  >
                    <option value="Guest Lecture (90–120 min)">Guest Lecture (90–120 min)</option>
                    <option value="Hands-on Workshop (Full Day)">Hands-on Workshop (Full Day)</option>
                    <option value="Industry Keynote / Symposium">Industry Keynote / Symposium</option>
                    <option value="Career & Mentorship Session">Career & Mentorship Session</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Field 2: Subject / Domain */}
              <div className="lg:col-span-3 flex flex-col">
                <label className="text-[12px] font-bold text-[#103957] mb-1.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#1286A0]" />
                  <span>Subject / Domain</span>
                </label>
                <div className="relative">
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full bg-[#F4F9FC] border border-[#D7EAF3] hover:border-[#1286A0]/40 rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] text-[#103957] font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#1286A0]/20 focus:border-[#1286A0] transition-all cursor-pointer pr-8"
                  >
                    <option value="AI, LLMs & Generative Tech">AI, LLMs & Generative Tech</option>
                    <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
                    <option value="Distributed Systems Design">Distributed Systems Design</option>
                    <option value="Engineering Leadership">Engineering Leadership</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Field 3: Preferred Date */}
              <div className="lg:col-span-2 flex flex-col">
                <label className="text-[12px] font-bold text-[#103957] mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#1286A0]" />
                  <span>Preferred Date</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#F4F9FC] border border-[#D7EAF3] hover:border-[#1286A0]/40 rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] text-[#103957] font-medium focus:outline-none focus:ring-2 focus:ring-[#1286A0]/20 focus:border-[#1286A0] transition-all pr-9"
                    placeholder="DD-MM-YYYY"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Field 4: Target Department */}
              <div className="lg:col-span-2 flex flex-col">
                <label className="text-[12px] font-bold text-[#103957] mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#1286A0]" />
                  <span>Target Department</span>
                </label>
                <div className="relative">
                  <select
                    value={collegeDept}
                    onChange={(e) => setCollegeDept(e.target.value)}
                    className="w-full bg-[#F4F9FC] border border-[#D7EAF3] hover:border-[#1286A0]/40 rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] text-[#103957] font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#1286A0]/20 focus:border-[#1286A0] transition-all cursor-pointer pr-8"
                  >
                    <option value="B.Tech (CS, IT & AI)">B.Tech (CS, IT & AI)</option>
                    <option value="ECE & Electrical Engg">ECE & Electrical Engg</option>
                    <option value="Mechanical & Civil Engg">Mechanical & Civil Engg</option>
                    <option value="All Departments / College-wide">All Departments / College-wide</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Field 5: Action Button (Replaced with "Book this session ->") */}
              <div className="lg:col-span-2 flex flex-col justify-end">
                <button
                  type="submit"
                  className="w-full h-[42px] px-5 bg-[#103957] hover:bg-[#153F60] text-white font-semibold text-xs sm:text-[13px] rounded-xl flex items-center justify-center gap-2 whitespace-nowrap shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98]"
                >
                  <span>Book this session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </form>

          {/* Bottom Trust Badges (3 items in a clean row) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6 mt-6 border-t border-[#EAF4F8]">
            {/* Feature 1 */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-[13px] font-bold text-[#103957]">
                  Verified experts
                </h4>
                <p className="text-[11px] text-[#527793] mt-0.5">
                  Selected through a rigorous screening
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-sky-50 border border-sky-200/60 flex items-center justify-center text-[#1286A0] flex-shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-[13px] font-bold text-[#103957]">
                  Aligned with university syllabus
                </h4>
                <p className="text-[11px] text-[#527793] mt-0.5">
                  Relevant, structured and practical
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-50 border border-purple-200/60 flex items-center justify-center text-purple-600 flex-shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-[13px] font-bold text-[#103957]">
                  Flexible formats
                </h4>
                <p className="text-[11px] text-[#527793] mt-0.5">
                  Online or on-campus sessions
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
