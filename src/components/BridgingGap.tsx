import React from 'react';
import { ArrowUpRight, Cpu, Compass, Code2 } from 'lucide-react';

export const BridgingGap: React.FC = () => {
  const benefits = [
    {
      tag: 'PRACTICAL',
      title: 'Real-world case studies & production architectures',
      description: 'Moving beyond hypothetical textbook examples to real systems handling millions of queries, real outages, and architectural trade-offs.',
      icon: Cpu,
    },
    {
      tag: 'CAREER',
      title: 'Direct hiring insights & engineering career roadmaps',
      description: 'Candid guidance on what technical interviewers evaluate, resume critiques, and modern engineering expectations.',
      icon: Compass,
    },
    {
      tag: 'INDUSTRY',
      title: 'Modern frameworks, toolchains & best practices',
      description: 'Exposing students to Docker, Kubernetes, CI/CD, LLM fine-tuning, and cloud-native paradigms before they graduate.',
      icon: Code2,
    },
  ];

  return (
    <section id="about" className="bg-white pt-10 pb-16 sm:pt-12 sm:pb-20 md:pt-16 md:pb-24 border-b border-[#EAF4F8]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold tracking-widest text-[#1286A0] uppercase block mb-2">
              Why Ctrl + Data + Grow
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#103957] tracking-tight leading-tight mb-4">
              Bridging the gap between classrooms and the real world
            </h2>
            <p className="text-sm sm:text-base text-[#244866] leading-relaxed mb-6">
              Traditional university curricula often lag behind rapid industry transitions. We bring senior practitioners who operate at global scale straight into college auditoriums to empower students with job-ready perspectives and high-value technical clarity.
            </p>
            <div className="p-4 rounded-xl bg-[#F8FCFE] border border-[#D7EAF3] text-xs text-[#153F60]">
              <span className="font-semibold text-[#1286A0]">Mission:</span> Empowering over 100,000 engineering and business graduates with direct access to mentorship from active tech innovators.
            </div>
          </div>

          {/* Right Column: 3 Benefit Rows */}
          <div className="lg:col-span-7 space-y-4">
            {benefits.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F8FCFE] rounded-xl p-5 sm:p-6 shadow-sm border border-[#D7EAF3] hover:border-[#1286A0] hover:bg-white hover:shadow-md transition-all duration-200 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#EAF4F8] text-[#1286A0] flex-shrink-0 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold tracking-wider text-[#1286A0] bg-[#EAF4F8] px-2 py-0.5 rounded border border-[#C5E2EC]">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#103957] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#244866] mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="text-slate-300 group-hover:text-[#1286A0] hidden sm:block">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
