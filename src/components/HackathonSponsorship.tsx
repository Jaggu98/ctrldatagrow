import React, { useState } from 'react';
import {
  Trophy,
  Rocket,
  Code2,
  DollarSign,
  Cpu,
  Users,
  Building2,
  CheckCircle2,
  Send,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

interface HackathonSponsorshipProps {
  onRequestSponsorship?: () => void;
}

export const HackathonSponsorship: React.FC<HackathonSponsorshipProps> = ({
  onRequestSponsorship
}) => {
  const [activeTab, setActiveTab] = useState<'colleges' | 'corporates'>('colleges');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<'college' | 'sponsor'>('college');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    hackathonName: '',
    expectedStudents: '300-500',
    budgetRange: '₹50,000 - ₹1,00,000',
    notes: ''
  });

  const handleOpenInquiry = (type: 'college' | 'sponsor') => {
    setInquiryType(type);
    setFormSubmitted(false);
    setInquiryModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="hackathons" className="py-20 bg-gradient-to-b from-[#0B1F33] via-[#0d233a] to-[#0B1F33] text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1769AA]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2BAE66]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#1769AA_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#2BAE66]/20 text-[#6ee7b7] border border-[#2BAE66]/40 uppercase tracking-widest mb-4">
            <Trophy className="w-3.5 h-3.5 text-[#2BAE66]" />
            CDG Hackathon Ecosystem & Sponsorship
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Powering Next-Gen Hackathons <br className="hidden sm:block" />
            <span className="text-[#138A9E]">
              With Grants, Problem Statements &amp; Sponsors
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">
            We bridge college hackathons with corporate tech sponsors. Whether you are a college club seeking co-sponsorship or a brand looking to recruit the top 1% builders, CDG is your growth partner.
          </p>

          {/* Dual Toggle Pill */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg">
            <button
              onClick={() => setActiveTab('colleges')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === 'colleges'
                  ? 'bg-[#1769AA] text-white shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Rocket className="w-4 h-4" />
              For Colleges &amp; Hackathon Organizers
            </button>
            <button
              onClick={() => setActiveTab('corporates')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === 'corporates'
                  ? 'bg-[#138A9E] text-white shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              For Corporate Sponsors & Hiring Brands
            </button>
          </div>
        </div>

        {/* Tab 1: For Colleges */}
        {activeTab === 'colleges' && (
          <div className="animate-in fade-in duration-300 space-y-12">
            {/* 4 Core Pillars for Colleges */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#1769AA]/60 hover:bg-white/[0.08] transition-all group">
                <div className="w-12 h-12 rounded-xl bg-[#1769AA]/20 text-[#60A5FA] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  ₹25K – ₹2L Co-Sponsorship
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Direct cash prize pool support and co-sponsorship funds for verified college hackathons across South India.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#2BAE66]/60 hover:bg-white/[0.08] transition-all group">
                <div className="w-12 h-12 rounded-xl bg-[#2BAE66]/20 text-[#4ADE80] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Industry Problem Statements
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Real enterprise AI, Fintech, Agentic systems, and Data pipelines problems designed by practitioners from Microsoft, Amazon, and unicorns.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D6A84F]/60 hover:bg-white/[0.08] transition-all group">
                <div className="w-12 h-12 rounded-xl bg-[#D6A84F]/20 text-[#F5C26B] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Cloud & GenAI API Grants
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Sponsored API credits (Gemini, Groq, Supabase, Modal) and developer sandboxes for every participating student team.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#138A9E]/60 hover:bg-white/[0.08] transition-all group">
                <div className="w-12 h-12 rounded-xl bg-[#138A9E]/20 text-[#2DD4BF] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Senior Mentors & Jury
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Industry VPs, Engineering Directors, and Principal Architects fly down or join live to mentor and judge the grand finale.
                </p>
              </div>
            </div>

            {/* Banner: How CDG Helps College Clubs */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1769AA]/30 via-[#0B1F33] to-[#138A9E]/20 border border-[#1769AA]/40 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2 text-center lg:text-left">
                <span className="text-xs font-bold text-[#F5C26B] uppercase tracking-wider flex items-center justify-center lg:justify-start">
                  College Hackathon Grants 2026-27
                </span>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Organizing a Hackathon on Your Campus?
                </h4>
                <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
                  Apply with your college proposal. We evaluate the scale, student footfall, and tracks to provide co-sponsorship grants within 5 working days.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  onClick={() => handleOpenInquiry('college')}
                  className="px-6 py-3.5 rounded-xl bg-[#138A9E] hover:bg-[#0E6D82] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Apply for Hackathon Co-Sponsorship</span>
                </button>
                {onRequestSponsorship && (
                  <button
                    onClick={onRequestSponsorship}
                    className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all cursor-pointer"
                  >
                    Campus Session Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: For Corporate Sponsors */}
        {activeTab === 'corporates' && (
          <div className="animate-in fade-in duration-300 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tier 1 */}
              <div className="p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-gray-300/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Track Sponsor
                  </div>
                  <h3 className="text-2xl font-black text-white">₹50,000</h3>
                  <p className="text-xs text-gray-300 mt-2">
                    Sponsor a dedicated problem track (e.g., Best AI Agent, Best Open Source Hack).
                  </p>
                  <div className="mt-5 space-y-2.5 text-xs text-gray-300 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2BAE66] shrink-0" />
                      <span>Custom problem statement & branding</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2BAE66] shrink-0" />
                      <span>Access to top 10 finalist resumes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2BAE66] shrink-0" />
                      <span>Logo on all banners, certificates & website</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleOpenInquiry('sponsor')}
                  className="mt-6 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Sponsor a Track
                </button>
              </div>

              {/* Tier 2 (Highlighted) */}
              <div className="p-7 rounded-2xl bg-[#0B1F33] border-2 border-[#1769AA] relative flex flex-col justify-between shadow-2xl">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#D6A84F] text-[#0B1F33] text-[11px] font-extrabold uppercase tracking-wide shadow-md">
                  Most Popular For Hiring
                </div>
                <div>
                  <div className="text-xs font-bold text-[#60A5FA] uppercase tracking-widest mb-1">
                    Premier Co-Sponsor
                  </div>
                  <h3 className="text-2xl font-black text-white">₹1,50,000</h3>
                  <p className="text-xs text-gray-200 mt-2">
                    Full recruitment access, jury seat, keynote slot, and top-tier brand placement.
                  </p>
                  <div className="mt-5 space-y-2.5 text-xs text-gray-200 border-t border-white/20 pt-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4ADE80] shrink-0" />
                      <span>Direct hiring rights for top 50 engineering participants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4ADE80] shrink-0" />
                      <span>Keynote / Tech talk slot before hackathon kickoff</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4ADE80] shrink-0" />
                      <span>Seat on the Grand Finale evaluation jury panel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4ADE80] shrink-0" />
                      <span>Official brand booth / recruitment lounge at venue</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleOpenInquiry('sponsor')}
                  className="mt-6 w-full py-3 rounded-xl bg-[#1286A0] hover:bg-[#0E6D82] text-white text-xs font-extrabold shadow-md transition-all cursor-pointer"
                >
                  Become Premier Co-Sponsor
                </button>
              </div>

              {/* Tier 3 */}
              <div className="p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-gray-300/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                    API & Developer Tool Sponsor
                  </div>
                  <h3 className="text-2xl font-black text-white">In-Kind / Credits</h3>
                  <p className="text-xs text-gray-300 mt-2">
                    Provide cloud credits, API keys, or developer tooling for students to build on your platform.
                  </p>
                  <div className="mt-5 space-y-2.5 text-xs text-gray-300 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2BAE66] shrink-0" />
                      <span>Mass adoption: 500+ students integrate your API</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2BAE66] shrink-0" />
                      <span>'Best Project built on [Your Tool]' award category</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2BAE66] shrink-0" />
                      <span>Live product demo workshop before hacking begins</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleOpenInquiry('sponsor')}
                  className="mt-6 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Offer Developer Credits
                </button>
              </div>
            </div>

            {/* Corporate Value Prop */}
            <div className="p-6 rounded-2xl bg-[#0d2a45] border border-[#1769AA]/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-300">
              <div className="flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-[#D6A84F] shrink-0" />
                <span>
                  <strong>Why Brands Sponsor with CDG:</strong> Save 70% in campus recruitment costs by identifying vetted, code-tested engineers through high-stakes hackathons across 50+ universities.
                </span>
              </div>
              <button
                onClick={() => handleOpenInquiry('sponsor')}
                className="shrink-0 px-4 py-2 rounded-lg bg-[#D6A84F] hover:bg-[#b88c3a] text-[#0B1F33] font-bold transition-colors cursor-pointer"
              >
                Download Sponsor Deck
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-white text-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setInquiryModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full"
            >
              ✕
            </button>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1F33]">
                  Inquiry Submitted Successfully!
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our Hackathon & Partnerships desk will review your {inquiryType === 'college' ? 'college hackathon proposal' : 'sponsorship request'} and contact you within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setInquiryModalOpen(false)}
                    className="px-6 py-2.5 rounded-xl bg-[#0B1F33] text-white text-xs font-bold hover:bg-[#1769AA] transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-[#1769AA] uppercase tracking-wider">
                    {inquiryType === 'college' ? 'College Organizer Form' : 'Corporate Brand Sponsorship'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B1F33] mt-1">
                    {inquiryType === 'college'
                      ? 'Apply for Hackathon Co-Sponsorship & Grants'
                      : 'Partner as a Hackathon Corporate Sponsor'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Fill in key details below and our team will get in touch immediately.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Ramesh / Sai Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#1769AA] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Work / College Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.edu / com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#1769AA] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#1769AA] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {inquiryType === 'college' ? 'College / University' : 'Company / Brand Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={inquiryType === 'college' ? 'e.g. VIIT / SRM / GITAM' : 'e.g. Acme AI Corp'}
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#1769AA] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {inquiryType === 'college' ? 'Hackathon Title / Edition' : 'Target Sponsorship Tier'}
                    </label>
                    <input
                      type="text"
                      placeholder={inquiryType === 'college' ? 'e.g. HackSprint 2026' : 'Premier / Track / API'}
                      value={formData.hackathonName}
                      onChange={(e) => setFormData({ ...formData, hackathonName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#1769AA] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {inquiryType === 'college' ? 'Expected Student Participation' : 'Target Hiring Volume'}
                    </label>
                    <select
                      value={formData.expectedStudents}
                      onChange={(e) => setFormData({ ...formData, expectedStudents: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#1769AA] bg-white"
                    >
                      <option value="100-300">100 - 300 Students</option>
                      <option value="300-500">300 - 500 Students</option>
                      <option value="500-1000">500 - 1,000 Students</option>
                      <option value="1000+">1,000+ Students (State / National Level)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Additional Details / Specific Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tentative dates, preferred tracks, jury requirements, or sponsorship package inquiries..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#1769AA] focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#1286A0] hover:bg-[#0E6D82] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Hackathon Proposal</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
