import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Linkedin,
  Globe,
  Award,
  DollarSign,
  ShieldCheck,
  User,
  Mail,
  Phone,
  Briefcase
} from 'lucide-react';

interface SpeakerApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpeakerApplicationModal: React.FC<SpeakerApplicationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    designation: '',
    company: '',
    preferredMode: 'Both Online & Offline (Weekends)',
    linkedinUrl: '',
    portfolioUrl: '',
    topics: '',
    speakingExperience: '',
    feeRange: '₹5,000 - ₹15,000 per 90-min session',
    agreeVerify: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl border border-[#D7EAF3] max-h-[92vh] overflow-y-auto relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            {/* Header matching Image 3 */}
            <div className="mb-4">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#1769AA]/15 border border-[#1769AA]/30 text-[#1769AA] text-[10px] font-bold tracking-widest uppercase mb-1.5">
                <span>Speaker Application • Verified Network</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1F33] tracking-tight">
                Apply to Become a <span className="text-[#138A9E]">Resource Person</span> for CDG
              </h3>
              <p className="text-xs text-[#4A6D88] mt-1 font-normal">
                Tell us about your background, session availability and session topics. All profiles undergo human LinkedIn verification before listing.
              </p>
            </div>

            {/* LinkedIn Verification Protocol Notice */}
            <div className="p-3 rounded-xl bg-[#EAF6FA] border border-[#D7EAF3] flex items-start gap-2.5 mb-4">
              <ShieldCheck className="w-4 h-4 text-[#138A9E] flex-shrink-0 mt-0.5" />
              <div className="text-[11px] text-[#0B1F33] leading-relaxed">
                <strong className="text-[#138A9E] font-bold">Rigorous Profile Verification Protocol: </strong>
                To protect partner colleges and students, our editorial committee verifies work history and designations via LinkedIn before any speaker is featured in our directory.
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                    <User className="w-3 h-3 text-[#138A9E]" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Malhotra"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-[#138A9E]" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Current Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#138A9E]" />
                    <span>Phone / WhatsApp Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-[#138A9E]" />
                    <span>Current Designation / Role *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Staff Engineer / AI Researcher"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                  />
                </div>
              </div>

              {/* Row 3: Company & Preferred Session Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold text-[#0B1F33] mb-1 block">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Microsoft / Amazon / Leading Tech Org"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#0B1F33] mb-1 block">
                    Preferred Session Mode &amp; Availability *
                  </label>
                  <select
                    value={formData.preferredMode}
                    onChange={(e) => setFormData({ ...formData, preferredMode: e.target.value })}
                    className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                  >
                    <option value="Both Online & Offline (Weekends)">Both Online &amp; Offline (Weekends)</option>
                    <option value="Hackathon Jury & Mentorship Only">Hackathon Jury &amp; Mentorship</option>
                    <option value="On-Campus Offline Guest Keynotes Only">On-Campus Offline Guest Keynotes</option>
                    <option value="Online Virtual Workshops (Saturdays/Sundays)">Online Virtual Workshops (Weekends)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: LinkedIn Profile URL (Crucial) & Portfolio Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                    <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                    <span>LinkedIn Profile URL * (Mandatory for Verification)</span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#0077B5]/20 focus:border-[#0077B5]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-[#138A9E]" />
                    <span>Portfolio / GitHub / YouTube Link</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://yourportfolio.com or github"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                  />
                </div>
              </div>

              {/* Row 5: Topics / Domains of Expertise */}
              <div>
                <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#138A9E]" />
                    <span>Topics / Domains of Expertise *</span>
                  </span>
                  <span className="text-[10px] text-[#138A9E] font-medium">SQL • Analytics • Python • Power BI</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. SQL & MySQL, Business Analytics, Python, Microsoft Excel, Azure Databricks, Power BI, Tableau, Business Intelligence, Data-driven Decision Making, Career Growth..."
                  value={formData.topics}
                  onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                  className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3.5 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Popular topics: SQL, MySQL, Business Analytics, Python (Programming Language), Microsoft Excel, Azure Databricks, Power BI, Tableau, Business Intelligence, Data-driven Decision Making, Career Growth.
                </p>
              </div>

              {/* Row 6: Past Speaking & Training Experience */}
              <div>
                <label className="text-[11px] font-bold text-[#0B1F33] mb-1 block">
                  Past Speaking &amp; Training Experience
                </label>
                <textarea
                  rows={2}
                  placeholder="Briefly mention key colleges, conferences, internal tech symposiums, or companies where you delivered sessions..."
                  value={formData.speakingExperience}
                  onChange={(e) => setFormData({ ...formData, speakingExperience: e.target.value })}
                  className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3.5 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                />
              </div>

              {/* Row 7: Expected Fee Range per Session */}
              <div>
                <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-[#2BAE66]" />
                  <span>Expected Honorarium / Fee Range per Session (₹)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹5,000 - ₹10,000 per 90-min session (or Pro-bono / Volunteer for students)"
                  value={formData.feeRange}
                  onChange={(e) => setFormData({ ...formData, feeRange: e.target.value })}
                  className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3.5 py-2.5 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                />
              </div>

              {/* Submit CTA matching Image 3 */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0B1F33] hover:bg-[#1769AA] text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                >
                  <span>{loading ? 'Submitting Application...' : 'Submit Expert Application'}</span>
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Submission Confirmation */
          <div className="text-center py-8 sm:py-10">
            <div className="w-16 h-16 bg-[#1769AA]/15 text-[#1769AA] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-extrabold text-[#0B1F33]">
              Application Received for Review
            </h4>
            <p className="text-sm text-[#4A6D88] mt-2 max-w-md mx-auto">
              Thank you, <span className="font-semibold text-[#0B1F33]">{formData.fullName}</span>. Your resource person application has been submitted to the Ctrl + Data + Grow speaker accreditation desk.
            </p>
            <div className="mt-5 p-4 rounded-xl bg-[#F4F9FC] border border-[#D7EAF3] max-w-sm mx-auto text-xs text-left space-y-1.5 text-slate-600">
              <p>Role: <strong className="text-[#0B1F33]">{formData.designation} at {formData.company}</strong></p>
              <p>LinkedIn: <strong className="text-[#0077B5] truncate block">{formData.linkedinUrl}</strong></p>
              <p>Review Timeline: <strong className="text-[#2BAE66]">2–3 business days</strong></p>
            </div>
            <p className="text-xs text-slate-400 mt-4 max-w-xs mx-auto">
              Upon profile authentication, your public expert card will be displayed in the live catalog for college invitations.
            </p>
            <button
              onClick={handleReset}
              className="mt-6 bg-[#0B1F33] hover:bg-[#1769AA] text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow-sm transition-all"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
