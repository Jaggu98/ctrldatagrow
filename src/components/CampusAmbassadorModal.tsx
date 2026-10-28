import React, { useState } from 'react';
import {
  X,
  Award,
  Users,
  CheckCircle,
  Building,
  Mail,
  Phone,
  Linkedin,
  Gift,
  Zap,
  ArrowRight,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { submitCampusAmbassador } from '../services/ambassadorService';

interface CampusAmbassadorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialAmbassadorState = {
  fullName: '',
  email: '',
  phone: '',
  collegeName: '',
  cityState: '',
  branch: '',
  yearOfStudy: '3rd Year',
  linkedinUrl: '',
  clubInvolvement: '',
  outreachPlan: '',
};

export const CampusAmbassadorModal: React.FC<CampusAmbassadorModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(initialAmbassadorState);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [applicationId, setApplicationId] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const result = await submitCampusAmbassador(formData);

      if (result.success) {
        setApplicationId(result.referenceId || '');
        setSubmitted(true);
      } else {
        setErrorMessage(result.error || 'Failed to submit application. Please check your inputs.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialAmbassadorState);
    setSubmitted(false);
    setErrorMessage(null);
    setApplicationId('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Compact Header */}
        <div className="bg-[#0B1F33] border-b border-[#1769AA]/30 text-white px-5 py-4 shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D6A84F]/20 text-[#F5C26B] border border-[#D6A84F]/40 uppercase tracking-wider">
              Ambassador Cohort 2026-27
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Open
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug">
            Become the Voice of CDG on Your Campus
          </h2>
          <p className="text-xs text-gray-200 mt-0.5 max-w-xl">
            Represent CDG in your college. Connect student clubs & leadership with industry experts.
          </p>
        </div>

        {/* Compact Mission & Perks Strip */}
        <div className="bg-[#EAF6FA] border-b border-[#B8E2F2] px-5 py-2.5 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#0B1F33]">
            <Award className="w-4 h-4 text-[#1769AA] shrink-0" />
            <span className="font-semibold text-[11px] sm:text-xs">
              Primary Role: Official campus liaison for guest lectures & workshops
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-gray-600 font-medium shrink-0">
            <span className="flex items-center gap-1 text-emerald-700">
              <Zap className="w-3 h-3 text-emerald-600" /> Free VIP Pass
            </span>
            <span className="flex items-center gap-1 text-blue-700">
              <Gift className="w-3 h-3 text-[#1769AA]" /> Honorarium
            </span>
            <span className="flex items-center gap-1 text-amber-700">
              <Users className="w-3 h-3 text-[#D6A84F]" /> Mentorship
            </span>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1">
          {submitted ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1F33]">
                Application Received, {formData.fullName || 'Future Leader'}!
              </h3>
              <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                Thank you for applying to represent Ctrl + Data + Grow at <strong className="text-[#0B1F33]">{formData.collegeName || 'your college'}</strong>.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 max-w-md mx-auto text-left text-xs space-y-1.5 text-gray-700">
                <div className="font-semibold text-gray-900 border-b pb-1 text-[11px] flex items-center justify-between">
                  <span>Application Reference:</span>
                  {applicationId && <strong className="text-[#1769AA] font-mono">{applicationId}</strong>}
                </div>
                <div>1. Our Community Lead reviews your application within <strong>48 hours</strong>.</div>
                <div>2. We will WhatsApp you at <strong>{formData.phone || 'your phone number'}</strong> for a short 10-minute briefing.</div>
                <div>3. You receive your official CDG Ambassador badge & full VIP resource vault access.</div>
                <div className="pt-1 text-[11px] text-gray-500">Status: <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wider">Pending Review</span></div>
              </div>
              <div className="pt-3 flex justify-center gap-2.5">
                <a
                  href="https://www.linkedin.com/company/ctrl-data-grow/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0077b5] text-white text-xs font-semibold hover:bg-[#006396] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  Follow CDG
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-[#0B1F33] text-white text-xs font-semibold hover:bg-[#1769AA] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form id="ambassador-form" onSubmit={handleSubmit} className="space-y-3">
              {/* Error Alert Banner */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-semibold text-red-800">Application Submission Error</p>
                    <p className="text-[11px] text-red-600 leading-relaxed">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Sai Teja Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="student@college.edu or gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA] focus:border-transparent"
                    />
                    <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>
              </div>

              {/* Row 2: WhatsApp & College */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA] focus:border-transparent"
                    />
                    <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    College / University Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="SRM / GITAM / VIIT / BITS"
                      value={formData.collegeName}
                      onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA] focus:border-transparent"
                    />
                    <Building className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>
              </div>

              {/* Row 3: City, Branch, Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    City & State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Visakhapatnam, AP"
                    value={formData.cityState}
                    onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Branch / Dept *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="CSE / AI / ECE"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Year of Study *
                  </label>
                  <select
                    value={formData.yearOfStudy}
                    onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA] bg-white"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="Final Year">Final Year</option>
                    <option value="Postgraduate">PG / Masters</option>
                  </select>
                </div>
              </div>

              {/* Row 4: LinkedIn Profile URL */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                    LinkedIn Profile URL *
                  </label>
                  <span className="text-[10px] text-gray-500">
                    Verified for institutional authenticity
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="url"
                    required
                    placeholder="https://linkedin.com/in/your-profile"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA] focus:border-transparent"
                  />
                  <Linkedin className="w-3.5 h-3.5 text-blue-600 absolute left-2.5 top-2.5" />
                </div>
              </div>

              {/* Row 5: Clubs & Outreach Plan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Clubs or Leadership Positions
                  </label>
                  <input
                    type="text"
                    placeholder="IEEE / GDSC / Coding Club / CR"
                    value={formData.clubInvolvement}
                    onChange={(e) => setFormData({ ...formData, clubInvolvement: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    How will you connect CDG with campus? *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Briefly: How you plan to introduce CDG workshops/hackathons to HODs or club heads..."
                    value={formData.outreachPlan}
                    onChange={(e) => setFormData({ ...formData, outreachPlan: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1769AA] focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Compact Footer Action Bar */}
        {!submitted && (
          <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-[11px] text-gray-500 text-center sm:text-left">
              No fee required • Direct induction into CDG Leader Network
            </span>
            <button
              type="submit"
              form="ambassador-form"
              disabled={isSubmitting}
              className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-[#1286A0] hover:bg-[#0E6D82] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Submitting to Supabase...</span>
                </>
              ) : (
                <>
                  <span>Submit Ambassador Application</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
