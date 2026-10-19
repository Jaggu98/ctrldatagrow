import React from 'react';
import {
  Mic,
  Wrench,
  Award,
  BarChart3,
  Cpu,
  BookOpen,
  Compass,
  FileText,
  Users,
  Flag,
  MessageSquare,
  Zap,
  ArrowRight
} from 'lucide-react';

interface TwelveWaysProps {
  onSelectFormat?: (formatName: string) => void;
}

export const TwelveWays: React.FC<TwelveWaysProps> = ({ onSelectFormat }) => {
  const formats = [
    {
      id: 'guest-lectures',
      name: 'Guest Lectures',
      icon: Mic,
      color: '#1769AA', // Corporate blue
      meta: 'Audience · format · duration',
      audience: '100–300+ Students',
      format: 'Interactive Keynote',
      duration: '90–120 min',
      description: 'Senior tech leads delivering high-impact lectures mapped to current academic syllabi.'
    },
    {
      id: 'technical-workshops',
      name: 'Technical Workshops',
      icon: Wrench,
      color: '#138A9E', // Teal
      meta: 'Audience · format · duration',
      audience: '40–80 Students',
      format: 'Hands-on Coding Lab',
      duration: 'Full Day (6 hrs)',
      description: 'Intensive code-along labs covering Docker, Kubernetes, Next.js, and Cloud Infrastructure.'
    },
    {
      id: 'corporate-masterclasses',
      name: 'Corporate Masterclasses',
      icon: Award,
      color: '#2BAE66', // Growth green
      meta: 'Audience · format · duration',
      audience: 'Final Year & Postgrad',
      format: 'Executive Masterclass',
      duration: 'Half Day (4 hrs)',
      description: 'Exclusive deep-dives into modern corporate methodologies, enterprise Agile, and system scalability.'
    },
    {
      id: 'business-analytics-workshops',
      name: 'Business Analytics Workshops',
      icon: BarChart3,
      color: '#1769AA',
      meta: 'Audience · format · duration',
      audience: 'Management & B.Tech',
      format: 'Case Study Lab',
      duration: '3–4 Hours',
      description: 'Practical data-driven decision making, SQL at scale, PowerBI, and predictive metric modeling.'
    },
    {
      id: 'data-science-ai-sessions',
      name: 'Data Science & AI Sessions',
      icon: Cpu,
      color: '#138A9E',
      meta: 'Audience · format · duration',
      audience: 'CS, IT & AI Departments',
      format: 'Architecture Deep-Dive',
      duration: '2–3 Hours',
      description: 'Production LLMs, retrieval augmented generation (RAG), vector databases, and MLOps pipelines.'
    },
    {
      id: 'industry-case-studies',
      name: 'Industry Case Studies',
      icon: BookOpen,
      color: '#2BAE66',
      meta: 'Audience · format · duration',
      audience: 'Engineering & MBA',
      format: 'Real Incident Analysis',
      duration: '2 Hours',
      description: 'Walkthroughs of actual production outages, traffic surges, and multi-region architectural trade-offs.'
    },
    {
      id: 'career-guidance-sessions',
      name: 'Career Guidance Sessions',
      icon: Compass,
      color: '#1769AA',
      meta: 'Audience · format · duration',
      audience: '2nd & 3rd Year Students',
      format: 'Strategic Roadmap',
      duration: '90 min',
      description: 'Unfiltered clarity on hiring expectations, portfolio building, and choosing the right engineering track.'
    },
    {
      id: 'resume-interview-workshops',
      name: 'Resume & Interview Workshops',
      icon: FileText,
      color: '#138A9E',
      meta: 'Audience · format · duration',
      audience: 'Placement Batch',
      format: 'Live Critiques & Mocks',
      duration: 'Half Day (4 hrs)',
      description: 'ATS resume formatting, behavioral rounds, system design interviews, and live mock evaluations.'
    },
    {
      id: 'industry-mentorship',
      name: 'Industry Mentorship',
      icon: Users,
      color: '#2BAE66',
      meta: 'Audience · format · duration',
      audience: 'Select Student Cohorts',
      format: '1-on-1 & Small Group',
      duration: 'Multi-week Series',
      description: 'Sustained guidance from senior engineers coaching students through capstones and open-source projects.'
    },
    {
      id: 'leadership-talks',
      name: 'Leadership Talks',
      icon: Flag,
      color: '#1769AA',
      meta: 'Audience · format · duration',
      audience: 'Campus-wide / All Years',
      format: 'Inspirational Keynote',
      duration: '60–90 min',
      description: 'CTOs, VPs, and founders sharing foundational mindsets, ethical tech, and career longevity.'
    },
    {
      id: 'panel-discussions',
      name: 'Panel Discussions',
      icon: MessageSquare,
      color: '#138A9E',
      meta: 'Audience · format · duration',
      audience: 'Faculty & Students',
      format: 'Multi-expert Debate',
      duration: '2 Hours',
      description: 'Cross-functional debates on AI ethics, fintech trends, and how academic curriculum should adapt.'
    },
    {
      id: 'hackathons-innovation-events',
      name: 'Hackathons & Innovation Events',
      icon: Zap,
      color: '#2BAE66',
      meta: 'Audience · format · duration',
      audience: 'Competitive Teams',
      format: '24–48hr Hackathon',
      duration: '1–2 Days',
      description: 'Industry-judged problem statements, mentor office hours, live feedback, and hiring opportunities.'
    },
  ];

  return (
    <section id="programs" className="py-20 md:py-28 bg-white border-b border-[#D7EAF3]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-left mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF6FA] border border-[#D7EAF3] text-[#138A9E] text-xs font-bold tracking-widest uppercase mb-3">
            <span>Engagement Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F33] tracking-tight">
            Twelve ways to bring <span className="text-[#138A9E]">industry to campus</span>
          </h2>
          <p className="text-sm sm:text-base text-[#4A6D88] mt-3 max-w-2xl font-normal">
            Tailored, structured engagement formats designed for every semester, academic level, and department goal.
          </p>
        </div>

        {/* 12-Card Grid (4 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {formats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onSelectFormat && onSelectFormat(item.name)}
                className="group relative bg-[#F0F7FA] hover:bg-white rounded-2xl p-5 border border-[#D7EAF3] hover:border-[#138A9E] hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Icon & Title Header */}
                  <div className="flex items-center gap-3.5 mb-3.5">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm sm:text-[15px] font-bold text-[#0B1F33] group-hover:text-[#138A9E] transition-colors leading-snug">
                      {item.name}
                    </h3>
                  </div>

                  {/* Metadata line: Audience · format · duration */}
                  <div className="mb-2">
                    <span className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase block">
                      {item.meta}
                    </span>
                    <span className="text-xs text-[#244866] font-medium block mt-0.5">
                      {item.audience} • {item.duration}
                    </span>
                  </div>

                  <p className="text-xs text-[#527793] leading-relaxed mt-2 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Subtle Action Link */}
                <div className="mt-4 pt-3 border-t border-[#D7EAF3]/70 flex items-center justify-between text-xs font-semibold text-[#138A9E] group-hover:text-[#0E6D82]">
                  <span>Book this format</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
