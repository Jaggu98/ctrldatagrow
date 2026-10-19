import React, { useState } from 'react';
import { FAQ_DATA } from '../data/mockData';
import { Plus, Minus, ArrowRight, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  onContactClick: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onContactClick }) => {
  const [openId, setOpenId] = useState<string>('faq-1');

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white border-b border-[#EAF4F8]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold tracking-widest text-[#1286A0] uppercase block mb-1">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#103957] tracking-tight leading-tight mb-4">
              Got questions? We've got answers.
            </h2>
            <p className="text-sm sm:text-base text-[#244866] leading-relaxed mb-6">
              Everything you need to know about booking industry guest lectures, hands-on workshops, speaker vetting, and campus coordination.
            </p>

            <div className="p-5 rounded-2xl bg-[#F3F9FC] border border-[#C5E2EC] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#153F60]">
                <HelpCircle className="w-4 h-4 text-[#1286A0]" />
                <span>Have a custom event or symposium query?</span>
              </div>
              <p className="text-xs text-[#244866]">
                Our academic partnerships desk works directly with university committees, HoDs, and IEEE chapters.
              </p>
              <button
                onClick={onContactClick}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1286A0] hover:text-[#0E6D82] transition-colors"
              >
                <span>Talk to our campus team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 divide-y divide-[#EAF4F8] border-t border-b border-[#EAF4F8]">
            {FAQ_DATA.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="py-4 sm:py-5 transition-colors">
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#103957] group-hover:text-[#1286A0] transition-colors">
                      {item.question}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#F3F9FC] border border-[#C5E2EC] flex items-center justify-center flex-shrink-0 text-[#1286A0] group-hover:border-[#1286A0] transition-colors">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-3 pr-8 text-xs sm:text-sm text-[#244866] leading-relaxed animate-in fade-in duration-200">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
