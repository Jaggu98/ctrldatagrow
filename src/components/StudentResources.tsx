import React, { useState } from 'react';
import {
  Search,
  Layers,
  ExternalLink,
  Lock,
  CheckCircle2,
  FileText,
  Code,
  Cloud,
  Briefcase,
  Zap,
  ArrowRight,
  X
} from 'lucide-react';

interface ResourceItem {
  id: string;
  title: string;
  category: 'analytics' | 'sql' | 'bi' | 'python' | 'career';
  badge: string;
  badgeType: 'official' | 'doc' | 'free' | 'premium';
  description: string;
  price: number; // 0 for free, 19 for premium
  linkText: string;
  tag: string;
  contentPreview: string;
}

interface StudentResourcesProps {
  onOpenAmbassadorModal?: () => void;
}

export const StudentResources: React.FC<StudentResourcesProps> = ({ onOpenAmbassadorModal }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const resources: ResourceItem[] = [
    {
      id: 'sql-mysql-handbook',
      title: 'SQL & MySQL Master Handbook',
      category: 'sql',
      badge: 'FREE GUIDE',
      badgeType: 'free',
      description: 'Core joins, window functions, indexing, and query optimization patterns for technical rounds.',
      price: 0,
      linkText: 'Read Handbook',
      tag: 'SQL & MySQL',
      contentPreview: 'Covers CTEs, recursive queries, indexing strategies, GROUP BY aggregations, and MySQL schema design best practices.'
    },
    {
      id: 'business-analytics-starter',
      title: 'Business Analytics Toolkit',
      category: 'analytics',
      badge: 'FREE GUIDE',
      badgeType: 'free',
      description: 'Foundations of business metrics, KPIs, cohort analyses, and diagnostic data frameworks.',
      price: 0,
      linkText: 'Explore Toolkit',
      tag: 'Business Analytics',
      contentPreview: 'Learn churn rates, CAC/LTV funnels, unit economics, and data-driven storytelling techniques for college presentations.'
    },
    {
      id: 'python-data-analytics',
      title: 'Python for Data Analytics Kit',
      category: 'python',
      badge: 'FREE GUIDE',
      badgeType: 'free',
      description: 'Pandas, NumPy, and data wrangling blueprints with Jupyter starter notebooks.',
      price: 0,
      linkText: 'Open Python Kit',
      tag: 'Python',
      contentPreview: 'Clean real-world messy datasets, automate exploratory data analysis, and build automated visualization pipelines in Python.'
    },
    {
      id: 'powerbi-tableau-blueprints',
      title: 'Power BI & Tableau Blueprint Pack',
      category: 'bi',
      badge: 'PREMIUM',
      badgeType: 'premium',
      description: 'Complete interactive dashboard templates, DAX formulas, and visual storytelling kits.',
      price: 19,
      linkText: 'Unlock Blueprints',
      tag: 'Power BI & Tableau',
      contentPreview: '10 production-grade dashboard templates in Power BI and Tableau with DAX calculated measures, data models, and executive palettes.'
    },
    {
      id: 'excel-analytics-mastery',
      title: 'Microsoft Excel for Analytics',
      category: 'analytics',
      badge: 'PREMIUM',
      badgeType: 'premium',
      description: 'XLOOKUP, Power Query, pivot modeling, and automated executive metric sheets.',
      price: 19,
      linkText: 'Unlock Excel Pack',
      tag: 'Microsoft Excel',
      contentPreview: 'Advanced workbook models with dynamic array formulas, nested XLOOKUPs, scenario managers, and one-click Power Query transformations.'
    },
    {
      id: 'azure-databricks-guide',
      title: 'Azure Databricks & PySpark Guide',
      category: 'python',
      badge: 'FREE GUIDE',
      badgeType: 'free',
      description: 'Big data ingestion, lakehouse architectures, and cloud data transformations.',
      price: 0,
      linkText: 'Read Guide',
      tag: 'Azure Databricks',
      contentPreview: 'Learn Apache Spark on Azure Databricks, Delta Lake foundations, and connecting scalable pipelines to analytical warehouses.'
    },
    {
      id: 'data-career-roadmap',
      title: 'Data & Analytics Career Roadmap',
      category: 'career',
      badge: 'PREMIUM',
      badgeType: 'premium',
      description: 'Structured 6-month curriculum to crack Business Analyst, BI, and Data roles.',
      price: 19,
      linkText: 'Unlock Roadmap',
      tag: 'Career Growth',
      contentPreview: 'Month-by-month skill roadmap: Month 1-2 Advanced SQL & Excel, Month 3-4 Power BI & Tableau, Month 5 Python Analytics, Month 6 Placement Interview Mock Prep.'
    },
    {
      id: 'data-driven-decision-making',
      title: 'Data-driven Decision Making Playbook',
      category: 'analytics',
      badge: 'FREE GUIDE',
      badgeType: 'free',
      description: 'Executive decision frameworks, root cause analysis, and A/B test methodologies.',
      price: 0,
      linkText: 'Read Playbook',
      tag: 'Decision Making',
      contentPreview: 'Case studies on how top firms leverage telemetry, statistical confidence, and hypothesis validation to drive multi-million dollar growth.'
    },
    {
      id: 'ats-data-resume-pack',
      title: 'ATS Data Analyst Resume Templates',
      category: 'career',
      badge: 'PREMIUM',
      badgeType: 'premium',
      description: 'Templates specifically tailored for Data Analysts, BI Engineers, and Analytics Consultants.',
      price: 19,
      linkText: 'Download Pack',
      tag: 'Career Growth',
      contentPreview: '3 clean single-column templates verified for ATS screening in top consulting and analytics firms, with project bullet formula sheets.'
    },
  ];

  const filteredResources = resources.filter((item) => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleOpenResource = (res: ResourceItem) => {
    setSelectedResource(res);
    setShowCheckout(false);
  };

  const handleUnlock = (resId: string) => {
    if (!unlockedItems.includes(resId)) {
      setUnlockedItems([...unlockedItems, resId]);
    }
    setShowCheckout(false);
  };

  return (
    <section id="resources" className="py-16 md:py-24 bg-[#F4F9FC] border-b border-[#D7EAF3] relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#138A9E]/10 border border-[#138A9E]/20 text-[#138A9E] text-xs font-bold tracking-widest uppercase mb-3">
            <span>Student Knowledge Hub</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F33] tracking-tight">
            Resources for Every <span className="text-[#138A9E]">Student</span>
          </h2>
          <p className="text-sm text-[#4A6D88] mt-2 font-normal leading-relaxed">
            Curated roadmaps, interview guides, and starter repositories to accelerate your tech career.
          </p>
        </div>

        {/* Controls: Category Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2">
            {[
              { id: 'all', label: 'All', icon: Layers },
              { id: 'analytics', label: 'Business Analytics', icon: Zap },
              { id: 'sql', label: 'SQL & MySQL', icon: Code },
              { id: 'bi', label: 'Power BI & Tableau', icon: FileText },
              { id: 'python', label: 'Python & Databricks', icon: Cloud },
              { id: 'career', label: 'Career Growth', icon: Briefcase },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all border ${
                    isActive
                      ? 'bg-[#0B1F33] text-white border-[#0B1F33] shadow-sm'
                      : 'bg-white text-[#244866] border-[#D7EAF3] hover:border-[#138A9E] hover:text-[#138A9E]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full bg-white border border-[#D7EAF3] hover:border-[#138A9E]/40 focus:border-[#138A9E] rounded-xl pl-10 pr-8 py-2 text-xs text-[#0B1F33] font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-[#138A9E] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map((res) => {
            const isUnlocked = res.price === 0 || unlockedItems.includes(res.id);
            return (
              <div
                key={res.id}
                className="bg-white rounded-2xl p-5 border border-[#D7EAF3] hover:border-[#138A9E] hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-bold text-[#138A9E]">
                      {res.tag}
                    </span>
                    <span
                      className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase ${
                        res.price > 0
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {res.price === 0 ? 'FREE' : 'PREMIUM'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0B1F33] group-hover:text-[#138A9E] transition-colors leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-xs text-[#527793] leading-relaxed mt-2 font-normal line-clamp-2">
                    {res.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#EAF4F8] flex items-center justify-between">
                  <div className="text-xs">
                    {res.price === 0 ? (
                      <span className="text-emerald-700 font-bold">Free Access</span>
                    ) : isUnlocked ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Unlocked</span>
                      </span>
                    ) : (
                      <span className="text-[#0B1F33] font-bold">
                        ₹19 <span className="text-slate-400 font-normal text-[11px]">pass</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleOpenResource(res)}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                      res.price === 0 || isUnlocked
                        ? 'bg-[#EAF6FA] text-[#138A9E] hover:bg-[#138A9E] hover:text-white'
                        : 'bg-amber-100/70 text-amber-900 hover:bg-[#D6A84F] hover:text-white'
                    }`}
                  >
                    <span>{res.price === 0 || isUnlocked ? res.linkText : 'Unlock ₹19'}</span>
                    {res.price === 0 || isUnlocked ? (
                      <ExternalLink className="w-3.5 h-3.5" />
                    ) : (
                      <Lock className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Campus Ambassador Promotion Banner */}
        {onOpenAmbassadorModal && (
          <div className="mt-12 p-6 sm:p-7 rounded-2xl bg-white border border-[#D7EAF3] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#138A9E]/10 text-[#138A9E] uppercase tracking-wider">
                Leadership Opportunity
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[#0B1F33]">
                Become a Ctrl + Data + Grow Campus Ambassador
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                Organize tech bootcamps at your campus, connect student clubs with industry speakers, and gain free access to all resources.
              </p>
            </div>
            <button
              onClick={onOpenAmbassadorModal}
              className="shrink-0 px-5 py-3 rounded-xl bg-[#1286A0] hover:bg-[#0E6D82] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Apply as Ambassador</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

      {/* Interactive Resource Reader / Checkout Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#D7EAF3] relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedResource(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#138A9E]/10 text-[#138A9E] uppercase">
                {selectedResource.tag}
              </span>
              <span className="text-xs text-slate-400 font-semibold">• Ctrl + Data + Grow Hub</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1F33]">
              {selectedResource.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#4A6D88] mt-2 leading-relaxed">
              {selectedResource.description}
            </p>

            {/* Content Preview Box */}
            <div className="my-5 p-4 rounded-xl bg-[#F4F9FC] border border-[#D7EAF3]">
              <span className="text-[11px] font-bold text-[#138A9E] uppercase tracking-wide block mb-1.5">
                Resource Preview &amp; Takeaways
              </span>
              <p className="text-xs text-[#0B1F33] leading-relaxed">
                {selectedResource.contentPreview}
              </p>
            </div>

            {/* Decision: Free or ₹19 Unlock */}
            {selectedResource.price === 0 || unlockedItems.includes(selectedResource.id) ? (
              <div>
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Full access granted. Download guides or open live tools directly.</span>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedResource(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    Close
                  </button>
                  <a
                    href="https://www.linkedin.com/company/ctrl-data-grow/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#138A9E] hover:bg-[#0E6D82] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all"
                  >
                    <span>Read on CDG Knowledge Desk</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : !showCheckout ? (
              <div>
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs mb-4">
                  <p className="font-bold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-700" />
                    <span>Premium Student Guide (One-Time ₹19 Only)</span>
                  </p>
                  <p className="mt-1 text-slate-600">
                    Subsidized student micro-pricing to maintain high-quality verified company interview sheets and architecture blueprints.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-semibold text-slate-500">Student Price: <strong className="text-base text-[#0B1F33]">₹19</strong></span>
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="inline-flex items-center gap-2 bg-[#D6A84F] hover:bg-[#B58933] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl shadow-md transition-all"
                  >
                    <span>Unlock for ₹19</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* Simulated Instant UPI / Student Checkout */
              <div className="border-t border-[#D7EAF3] pt-4">
                <span className="text-xs font-bold text-[#0B1F33] block mb-2">
                  Instant UPI Student Payment (₹19)
                </span>
                <div className="p-3 bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl text-xs space-y-1 mb-4">
                  <p className="text-slate-600">Item: <strong className="text-[#0B1F33]">{selectedResource.title}</strong></p>
                  <p className="text-slate-600">Amount: <strong className="text-[#2BAE66]">₹19.00</strong> (GST incl.)</p>
                  <p className="text-[11px] text-slate-400">Payment methods: Google Pay / PhonePe / Paytm / UPI ID</p>
                </div>

                <button
                  onClick={() => handleUnlock(selectedResource.id)}
                  className="w-full bg-[#2BAE66] hover:bg-[#239255] text-white font-semibold text-xs sm:text-sm py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simulate Successful ₹19 Payment</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
