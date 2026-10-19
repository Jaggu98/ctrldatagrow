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
  category: 'ai' | 'programming' | 'cloud' | 'career' | 'tools' | 'templates';
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

  const quickTags = ['AI', 'Python', 'Resume', 'Hackathon', 'Git', 'Cloud', 'DSA', 'Figma', 'Internship'];

  const resources: ResourceItem[] = [
    {
      id: 'google-ai-studio',
      title: 'Google AI Studio',
      category: 'ai',
      badge: 'OFFICIAL',
      badgeType: 'official',
      description: 'Build and test Gemini-powered AI apps directly in your browser — zero server setup required.',
      price: 0,
      linkText: 'Open Studio',
      tag: 'AI',
      contentPreview: 'Access Gemini 1.5 Pro & Flash models with developer API keys, rapid prototyping prompts, and instant Python/Node SDK code export.'
    },
    {
      id: 'gemini-api-docs',
      title: 'Gemini API Master Docs',
      category: 'ai',
      badge: 'DOCUMENTATION',
      badgeType: 'doc',
      description: 'Production integration blueprints for embedding Gemini into Python, Next.js, and Android apps.',
      price: 0,
      linkText: 'Read Docs',
      tag: 'AI',
      contentPreview: 'Structured output schemas, function calling, multimodal vision embeddings, and rate-limit handling patterns for campus projects.'
    },
    {
      id: 'prompt-engineering-guide',
      title: 'Prompt Engineering Guide',
      category: 'ai',
      badge: 'FREE GUIDE',
      badgeType: 'free',
      description: 'Learn how to craft effective system prompts, few-shot conditioning, and chain-of-thought logic.',
      price: 0,
      linkText: 'Learn Prompting',
      tag: 'AI',
      contentPreview: 'From naive questions to enterprise metaprompts. Includes 50+ tested prompt templates for code generation and resume tailoring.'
    },
    {
      id: 'ai-project-ideas',
      title: '100+ Production AI Project Ideas',
      category: 'ai',
      badge: 'PREMIUM • ₹19',
      badgeType: 'premium',
      description: 'Curated blueprint list of resume-worthy AI projects — full architecture diagrams, API stacks & rubrics.',
      price: 19,
      linkText: 'Unlock Blueprint',
      tag: 'AI',
      contentPreview: 'Includes complete architecture flowcharts, GitHub boilerplates, and interview talking points for RAG chatbots, multi-agent research tools, and medical image classifiers.'
    },
    {
      id: 'dsa-sheet-crack',
      title: 'Top 75 FAANG DSA Patterns Sheet',
      category: 'programming',
      badge: 'PREMIUM • ₹19',
      badgeType: 'premium',
      description: 'The exact two-pointer, sliding window, and graph BFS/DFS templates asked in Tier-1 technical rounds.',
      price: 19,
      linkText: 'Unlock Sheet',
      tag: 'DSA',
      contentPreview: '75 high-frequency problems grouped by algorithmic pattern with Python, C++, and Java solutions + time/space complexity proof cheat-sheets.'
    },
    {
      id: 'vertex-ai-basics',
      title: 'Vertex AI Cloud Fundamentals',
      category: 'cloud',
      badge: 'FREE GUIDE',
      badgeType: 'free',
      description: 'Deploy, monitor, and scale custom ML pipelines with enterprise tools and automated endpoints.',
      price: 0,
      linkText: 'Explore Cloud',
      tag: 'Cloud',
      contentPreview: 'Model garden overview, vector search endpoints, batch inference, and cost optimization techniques for student projects.'
    },
    {
      id: 'ai-engineer-roadmap',
      title: '6-Month AI Engineer Career Roadmap',
      category: 'career',
      badge: 'PREMIUM • ₹19',
      badgeType: 'premium',
      description: 'Ctrl + Data + Grow exclusive structured curriculum to transition from student coder to AI engineer.',
      price: 19,
      linkText: 'Unlock Roadmap',
      tag: 'Career',
      contentPreview: 'Month-by-month skill breakdown: Month 1-2 Deep Python & Linear Algebra, Month 3 PyTorch, Month 4 Transformers & Attention, Month 5 RAG & MLOps, Month 6 Portfolio Polish.'
    },
    {
      id: 'ats-resume-templates',
      title: 'ATS-Proof Tech Resume Templates',
      category: 'templates',
      badge: 'PREMIUM • ₹19',
      badgeType: 'premium',
      description: 'LaTeX and Word formats verified by senior recruiters from Amazon, Google, and Microsoft.',
      price: 19,
      linkText: 'Download Pack',
      tag: 'Resume',
      contentPreview: '3 clean single-column templates engineered to score 95+ on Taleo and Greenhouse ATS parsers. Includes action verb index.'
    },
    {
      id: 'git-hackathon-handbook',
      title: 'Hackathon Winning Playbook',
      category: 'career',
      badge: 'FREE GUIDE',
      badgeType: 'free',
      description: 'Pitch deck structures, demo video scripts, and fast prototyping kits to win college hackathons.',
      price: 0,
      linkText: 'Read Playbook',
      tag: 'Hackathon',
      contentPreview: 'How to pick winning problem statements, building functional MVPs in 24 hours, and delivering the 3-minute jury presentation.'
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
    <section id="resources" className="py-20 md:py-28 bg-[#F4F9FC] border-b border-[#D7EAF3] relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#138A9E]/10 via-[#1769AA]/5 to-transparent blur-3xl" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading matching Image 1 */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#138A9E]/15 border border-[#138A9E]/30 text-[#138A9E] text-xs font-bold tracking-widest uppercase mb-4">
            <span>Free Student Knowledge Hub &amp; Micro-Guides</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F33] tracking-tight">
            Resources for Every <span className="text-[#138A9E]">Student</span>
          </h2>
          <p className="text-sm sm:text-base text-[#4A6D88] mt-3 font-normal leading-relaxed">
            AI, Programming, Cloud, Career, Opportunities, Tools, Templates &amp; Ctrl + Data + Grow-exclusive content — all in one place. Built for students, priced at ₹0 or a micro ₹19 student pass.
          </p>
        </div>

        {/* Search Bar matching Image 1 */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources — AI, Python, Resume, Hackathon, DSA..."
              className="w-full bg-white border border-[#D7EAF3] hover:border-[#138A9E]/40 focus:border-[#138A9E] rounded-2xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-[#0B1F33] font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Tag Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3.5">
            {quickTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className={`text-[11px] font-semibold px-3 py-1 rounded-full transition-all border ${
                  searchQuery.toLowerCase() === tag.toLowerCase()
                    ? 'bg-[#138A9E] text-white border-[#138A9E]'
                    : 'bg-white text-slate-600 border-[#D7EAF3] hover:border-[#138A9E] hover:text-[#138A9E]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Tabs matching Image 1 */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-2">
          {[
            { id: 'all', label: 'All', icon: Layers },
            { id: 'ai', label: 'AI & GenAI', icon: Zap },
            { id: 'programming', label: 'Programming', icon: Code },
            { id: 'cloud', label: 'Cloud', icon: Cloud },
            { id: 'career', label: 'Career', icon: Briefcase },
            { id: 'templates', label: 'Templates', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-all border ${
                  isActive
                    ? 'bg-[#0B1F33] text-white border-[#0B1F33] shadow-md'
                    : 'bg-white text-[#244866] border-[#D7EAF3] hover:border-[#138A9E] hover:text-[#138A9E]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Resource Cards Grid matching Image 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map((res) => {
            const isUnlocked = res.price === 0 || unlockedItems.includes(res.id);
            return (
              <div
                key={res.id}
                className="bg-white rounded-2xl p-5 border border-[#D7EAF3] hover:border-[#138A9E] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badge & Bookmark Row */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-md uppercase ${
                        res.price > 0
                          ? 'bg-[#D6A84F]/15 text-[#9E731F] border border-[#D6A84F]/30'
                          : 'bg-[#138A9E]/10 text-[#138A9E] border border-[#138A9E]/20'
                      }`}
                    >
                      {res.badge}
                    </span>

                    <span className="text-[11px] font-semibold text-slate-400 group-hover:text-[#138A9E] transition-colors">
                      {res.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0B1F33] group-hover:text-[#138A9E] transition-colors leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-xs text-[#527793] leading-relaxed mt-2 font-normal line-clamp-2">
                    {res.description}
                  </p>
                </div>

                {/* Card Action Footer */}
                <div className="mt-5 pt-3.5 border-t border-[#EAF4F8] flex items-center justify-between">
                  <div className="text-xs">
                    {res.price === 0 ? (
                      <span className="text-[#2BAE66] font-extrabold">FREE</span>
                    ) : isUnlocked ? (
                      <span className="text-[#2BAE66] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Unlocked</span>
                      </span>
                    ) : (
                      <span className="text-[#0B1F33] font-bold">
                        ₹19 <span className="text-slate-400 font-normal text-[11px]">one-time</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleOpenResource(res)}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all ${
                      res.price === 0 || isUnlocked
                        ? 'bg-[#EAF6FA] text-[#138A9E] hover:bg-[#138A9E] hover:text-white'
                        : 'bg-[#D6A84F]/15 text-[#9E731F] hover:bg-[#D6A84F] hover:text-white'
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
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1769AA]/15 via-[#138A9E]/15 to-[#2BAE66]/15 border-2 border-[#138A9E]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#138A9E]/20 text-[#0c5966] uppercase tracking-wider">
                Student Leadership Privilege
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-[#0B1F33]">
                Want 100% Free VIP Access to All Premium Resources?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                Become the official <strong>Ctrl + Data + Grow Campus Ambassador</strong> for your college. Represent CDG, organize tech bootcamps, connect your college clubs with industry speakers, and earn cash rewards + certificate of leadership.
              </p>
            </div>
            <button
              onClick={onOpenAmbassadorModal}
              className="shrink-0 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#138A9E] to-[#2BAE66] hover:brightness-105 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Apply as Campus Ambassador</span>
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
