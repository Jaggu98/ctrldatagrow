import React, { useState } from 'react';
import { ARTICLES_DATA, Article } from '../data/mockData';
import { ArrowRight, Clock, X } from 'lucide-react';

export const Insights: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="insights" className="bg-[#EAF4F8] py-16 md:py-24 border-b border-[#D7EDF4]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#1286A0] uppercase">
              Resources & Articles
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#103957] tracking-tight mt-1">
              Insights for colleges and students
            </h2>
            <p className="text-sm sm:text-base text-[#244866] mt-1 max-w-xl">
              Practical guides, playbooks, and tech trends curated for academic deans, placement officers, and student leaders.
            </p>
          </div>

          <a
            href="#insights"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1286A0] hover:text-[#0E6D82] transition-colors"
          >
            <span>Explore all articles</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 3 Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES_DATA.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white rounded-2xl overflow-hidden border border-[#C5E2EC] shadow-sm hover:shadow-md hover:border-[#1286A0] transition-all duration-200 flex flex-col justify-between cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#103957]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#103957] group-hover:text-[#1286A0] transition-colors line-clamp-2 leading-snug mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#244866] line-clamp-3 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EAF4F8] flex items-center justify-between text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#1286A0]" />
                    <span>{article.readTime}</span>
                  </div>
                  <span className="text-[#1286A0] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#D7EDF4] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAF4F8]">
              <span className="text-xs font-bold text-[#1286A0] uppercase tracking-wider">
                {selectedArticle.category} • {selectedArticle.date}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-56 object-cover rounded-xl mb-4"
              />
              <h2 className="text-2xl font-extrabold text-[#103957] mb-3">
                {selectedArticle.title}
              </h2>
              <p className="text-sm text-[#244866] leading-relaxed mb-4 font-medium">
                {selectedArticle.excerpt}
              </p>
              <div className="prose prose-sm text-[#244866] space-y-3 border-t border-[#EAF4F8] pt-4">
                <p>
                  As technical faculties prepare students for placement seasons, exposing students early to real-world code architectures and engineering design docs bridges the gap that standard curricula face.
                </p>
                <p>
                  Ctrl + Data + Grow collaborates directly with academic chapters, IEEE/ACM student bodies, and placement cells to organize curriculum-aligned sessions with certified industry practitioners.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EAF4F8] flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-[#1286A0] hover:bg-[#0E6D82] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-sm"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
