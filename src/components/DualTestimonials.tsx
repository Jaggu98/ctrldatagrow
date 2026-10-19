import React, { useState } from 'react';
import {
  Quote,
  Star,
  CheckCircle2,
  GraduationCap,
  Building2,
  Users,
  Award,
  ChevronRight
} from 'lucide-react';

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  institution: string;
  avatar: string;
  rating: number;
  badge: string;
  badgeColor: string;
  quote: string;
  highlightMetric: string;
}

const COLLEGE_MANAGEMENT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'mgmt-1',
    name: 'Dr. K. Venkata Rao',
    role: 'Principal & Director of Academics',
    institution: 'Vignan Institute of Information Technology (VIIT)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    badge: 'Institutional Partner',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    quote: 'Ctrl + Data + Grow bridged the exact gap our curriculum lacked. Their 2-day GenAI & Deep Learning masterclass was delivered by staff architects from Amazon. Over 450 of our students built functioning LLM agent applications within 48 hours.',
    highlightMetric: '450+ Students Trained · 98% Positive Rating'
  },
  {
    id: 'mgmt-2',
    name: 'Prof. S. R. Chaitanya',
    role: 'Head of Department (CSE)',
    institution: 'Gayatri Vidya Parishad College of Engineering (Autonomous)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    badge: 'Autonomous College Partner',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    quote: 'Unlike typical theoretical training vendors, CDG resource persons bring production-tested systems directly to campus. Our 2026 batch placement conversion in product companies doubled after their weekend system design and microservices bootcamps.',
    highlightMetric: '2.4x Product Placements · 4 Weekend Bootcamps'
  },
  {
    id: 'mgmt-3',
    name: 'Dr. Anita Nambiar',
    role: 'Director of Career Guidance & Corporate Relations',
    institution: 'GITAM Deemed University',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    badge: 'Deemed University Partner',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    quote: 'Booking high-caliber speakers used to take weeks of corporate outreach. With CDG, we requested a fintech analytics specialist on Monday, and by Saturday our auditorium was packed with 300 students learning directly from an industry VP.',
    highlightMetric: '5-Day Turnaround · 300+ Attendees'
  }
];

const STUDENT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'stud-1',
    name: 'Rahul Varma',
    role: 'Placed at Oracle as Associate Cloud Engineer (18 LPA)',
    institution: 'VIIT, Final Year CSE',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    badge: 'Placed at Oracle · 18 LPA',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    quote: 'The CDG ₹19 FAANG DSA Sheet and the Weekend System Design workshop by Microsoft engineers was the single most pivotal reason I cleared my Oracle technical rounds. The real production case studies set my answers apart from everyone else.',
    highlightMetric: '₹18 LPA Placement · 1-on-1 Mock Interview'
  },
  {
    id: 'stud-2',
    name: 'Sneha Reddy',
    role: 'CDG Campus Ambassador & Hackathon Winner',
    institution: 'SRM University, 3rd Year AI & DS',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    badge: 'Campus Ambassador Lead',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    quote: 'As a CDG Ambassador, I coordinated our college 24-hour hackathon with CDG co-sponsorship. CDG provided ₹75,000 in cash prizes, cloud API credits, and 4 senior engineering judges. It became our university biggest tech event of the year!',
    highlightMetric: '₹75,000 Co-Sponsorship · 600+ Hackers'
  },
  {
    id: 'stud-3',
    name: 'Sai Karthik',
    role: 'Placed at Darwinbox as Frontend Engineer (12 LPA)',
    institution: 'Gayatri Vidya Parishad, 4th Year ECE',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    badge: 'Placed at Darwinbox · 12 LPA',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    quote: 'The ATS resume templates and AI engineer roadmap on CDG helped me rebuild my portfolio from scratch. When the recruiter asked about real-world microservices, I explained the exact architecture from the CDG weekend masterclass.',
    highlightMetric: 'ATS Resume Kit · Product Placement'
  }
];

export const DualTestimonials: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'management' | 'students'>('management');
  const [selectedMgmtIndex, setSelectedMgmtIndex] = useState(0);
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(0);

  const currentList = activeTab === 'management' ? COLLEGE_MANAGEMENT_TESTIMONIALS : STUDENT_TESTIMONIALS;
  const currentIndex = activeTab === 'management' ? selectedMgmtIndex : selectedStudentIndex;
  const currentItem = currentList[currentIndex];

  return (
    <section id="testimonials" className="bg-[#0B1F33] text-white py-20 relative overflow-hidden border-b border-[#1769AA]/20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#1769AA]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#138A9E]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#1769AA]/20 text-[#60A5FA] border border-[#1769AA]/40 uppercase tracking-widest mb-3">
              Verified Impact & Stories
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Trusted by College Leadership. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#2DD4BF] to-[#4ADE80]">
                Celebrated by 10,000+ Students.
              </span>
            </h2>
          </div>

          {/* Dual Category Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg self-start md:self-auto">
            <button
              onClick={() => setActiveTab('management')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === 'management'
                  ? 'bg-gradient-to-r from-[#1769AA] to-[#138A9E] text-white shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>College Management ({COLLEGE_MANAGEMENT_TESTIMONIALS.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === 'students'
                  ? 'bg-gradient-to-r from-[#2BAE66] to-[#138A9E] text-white shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Students & Ambassadors ({STUDENT_TESTIMONIALS.length})</span>
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Selectable List */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Select {activeTab === 'management' ? 'Institutional Partner' : 'Student Story'}:
            </div>
            {currentList.map((item, idx) => {
              const isSelected = currentIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={() =>
                    activeTab === 'management'
                      ? setSelectedMgmtIndex(idx)
                      : setSelectedStudentIndex(idx)
                  }
                  className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-200 flex items-center justify-between border ${
                    isSelected
                      ? activeTab === 'management'
                        ? 'bg-[#1769AA]/40 border-[#60A5FA] shadow-xl text-white translate-x-1'
                        : 'bg-[#2BAE66]/20 border-[#4ADE80] shadow-xl text-white translate-x-1'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/30 shrink-0 shadow-md"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-white truncate">
                          {item.name}
                        </h4>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4ADE80] shrink-0" />
                      </div>
                      <p className="text-xs text-gray-300 truncate mt-0.5">
                        {item.role}
                      </p>
                      <p className="text-[11px] text-gray-400 truncate mt-0.5 font-medium">
                        {item.institution}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 shrink-0 transition-transform ${
                      isSelected ? 'text-white translate-x-1' : 'text-gray-500'
                    }`}
                  />
                </div>
              );
            })}

            {/* Quick Stat Footer Pill */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-gray-300">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#60A5FA]" />
                {activeTab === 'management'
                  ? '50+ Verified Colleges Partnered'
                  : '10,000+ Students Impacted in 2025-26'}
              </span>
              <span className="text-[#4ADE80] font-semibold">100% Verified</span>
            </div>
          </div>

          {/* Right Column: Featured Spotlight Card */}
          <div className="lg:col-span-7">
            <div className="h-full p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-white/20 shadow-2xl flex flex-col justify-between relative backdrop-blur-md">
              <div className="absolute top-6 right-6 opacity-20">
                <Quote className="w-16 h-16 text-white" />
              </div>

              <div>
                {/* Rating & Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(currentItem.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#F5C26B] text-[#F5C26B]" />
                    ))}
                    <span className="text-xs font-bold text-white ml-2">5.0 / 5.0</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${currentItem.badgeColor}`}>
                    {currentItem.badge}
                  </span>
                </div>

                {/* Big Quote */}
                <p className="text-base sm:text-xl text-gray-100 font-medium leading-relaxed italic">
                  "{currentItem.quote}"
                </p>

                {/* Highlight Metric Pill */}
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm font-semibold text-[#60A5FA]">
                  <Award className="w-4 h-4 text-[#F5C26B]" />
                  <span>Key Result: {currentItem.highlightMetric}</span>
                </div>
              </div>

              {/* Author Details with Verified Photo */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                <img
                  src={currentItem.avatar}
                  alt={currentItem.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white/40 shadow-lg"
                />
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>{currentItem.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300">
                    {currentItem.role}
                  </p>
                  <p className="text-xs text-[#2DD4BF] font-semibold mt-0.5">
                    {currentItem.institution}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
