import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/mockData';
import { Quote, Star, CheckCircle, ChevronRight, GraduationCap } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = TESTIMONIALS_DATA[activeIndex];

  return (
    <section id="testimonials" className="bg-[#103957] text-white py-16 md:py-24 border-b border-[#0D2B45]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#38BDF8] uppercase">
              Testimonials
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1">
              What colleges say about us
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-sky-200">
            <GraduationCap className="w-4 h-4 text-[#38BDF8]" />
            <span>Over 50+ Partner Institutions Across India</span>
          </div>
        </div>

        {/* 2-Column Composition (Matching Reference Slice 7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {TESTIMONIALS_DATA.map((t, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <div
                  key={t.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-200 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-[#1286A0] border-[#38BDF8] shadow-lg text-white'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-sky-100'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={t.avatar}
                      alt={t.author}
                      className="w-11 h-11 rounded-full object-cover border-2 border-white/40 flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">
                        {t.author}
                      </h4>
                      <p className="text-xs text-sky-100/90 mt-0.5 font-medium">
                        {t.role} • <span className="font-semibold">{t.institution}</span>
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      isSelected ? 'text-white translate-x-1' : 'text-white/40'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Quote Card */}
          <div className="lg:col-span-7 bg-white/5 rounded-3xl p-6 sm:p-8 md:p-10 border border-white/15 relative">
            <Quote className="w-12 h-12 text-[#38BDF8]/40 mb-4" />

            <div className="flex items-center gap-1 mb-4 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-bold text-sky-200 ml-2">Verified Campus Review</span>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl text-white font-medium leading-relaxed mb-6 italic">
              "{activeTestimonial.quote}"
            </p>

            <div className="pt-5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h5 className="text-base font-bold text-white">
                  {activeTestimonial.author}
                </h5>
                <p className="text-xs text-sky-200">
                  {activeTestimonial.role}, {activeTestimonial.institution}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 bg-[#1286A0]/40 border border-[#38BDF8]/40 px-3 py-1.5 rounded-full text-xs font-semibold text-sky-100">
                <CheckCircle className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>{activeTestimonial.sessionType}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
