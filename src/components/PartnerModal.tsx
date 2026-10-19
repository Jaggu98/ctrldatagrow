import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Send,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  Clock,
  DollarSign,
  MessageSquare
} from 'lucide-react';
import { Expert } from '../data/mockData';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedExpert?: Expert | null;
  initialFormat?: string;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({
  isOpen,
  onClose,
  preselectedExpert,
  initialFormat
}) => {
  const [formData, setFormData] = useState({
    // 15 Fields from Brand Book Slide 12
    institutionName: '',      // 1. Institution name
    contactPerson: '',        // 2. Contact person
    officialEmail: '',        // 3. Official email
    phoneNumber: '',          // 4. Phone number
    collegeLocation: '',      // 5. College location
    department: 'Computer Science & AI', // 6. Department
    programType: initialFormat || 'Guest Lectures', // 7. Program type
    preferredTopic: preselectedExpert ? preselectedExpert.expertise : 'Large Language Models & GenAI in Production', // 8. Preferred topic
    participants: '100–250 Students', // 9. Participants
    preferredDate: '',        // 10. Preferred date
    alternativeDate: '',      // 11. Alternative date
    deliveryMode: 'On-Campus (Offline)', // 12. Online / offline
    sessionDuration: '90–120 min', // 13. Session duration
    budgetRange: 'Institutional Budget Approved', // 14. Budget range
    requirements: '',         // 15. Requirements
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-8 shadow-2xl border border-[#D7EAF3] max-h-[92vh] overflow-y-auto relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header matching Slide 12 */}
            <div className="mb-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#EAF6FA] border border-[#D7EAF3] text-[#138A9E] text-[11px] font-bold tracking-widest uppercase mb-2">
                <span>Campus Booking Form • 15 Fields</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F33] tracking-tight">
                Let&apos;s plan something <span className="text-[#138A9E]">valuable for your campus</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#4A6D88] mt-1.5 font-normal">
                {preselectedExpert
                  ? `Configuring requested session with ${preselectedExpert.name}`
                  : 'Submit your institutional parameters below. Our academic liaison desk will verify schedule availability.'}
              </p>
            </div>

            {preselectedExpert && (
              <div className="mb-5 p-3.5 rounded-2xl bg-[#F0F7FA] border border-[#D7EAF3] flex items-center gap-3.5">
                <img
                  src={preselectedExpert.image}
                  alt={preselectedExpert.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#138A9E]"
                />
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-[#0B1F33]">{preselectedExpert.name}</h5>
                  <p className="text-xs text-slate-500">{preselectedExpert.role} • {preselectedExpert.company}</p>
                  <p className="text-[11px] text-[#138A9E] font-medium mt-0.5">Focus: {preselectedExpert.expertise}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Group 1: Institutional & Contact Details (Fields 1-6) */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#138A9E] mb-3 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5" />
                  <span>1. Institutional &amp; Contact Details</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {/* 1. Institution Name */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 block">
                      1. Institution Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SRM / GITAM / IIT"
                      value={formData.institutionName}
                      onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    />
                  </div>

                  {/* 2. Contact Person */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                      <User className="w-3 h-3 text-[#138A9E]" />
                      <span>2. Contact Person *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. K. Sharma (Dean/HOD)"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    />
                  </div>

                  {/* 3. Official Email */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-[#138A9E]" />
                      <span>3. Official Email *</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="dean.academics@college.edu.in"
                      value={formData.officialEmail}
                      onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    />
                  </div>

                  {/* 4. Phone Number */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#138A9E]" />
                      <span>4. Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    />
                  </div>

                  {/* 5. College Location */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#138A9E]" />
                      <span>5. College Location *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Visakhapatnam / Chennai"
                      value={formData.collegeLocation}
                      onChange={(e) => setFormData({ ...formData, collegeLocation: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    />
                  </div>

                  {/* 6. Department */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-[#138A9E]" />
                      <span>6. Department *</span>
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    >
                      <option value="Computer Science & AI">Computer Science & AI</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Electronics & Communication">ECE & Electrical</option>
                      <option value="Data Science & Business Analytics">Data Science & Analytics</option>
                      <option value="Management & MBA">Management & MBA</option>
                      <option value="All Engineering Depts">All Engineering Departments</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Group 2: Program & Topic Scope (Fields 7-9) */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#138A9E] mb-3 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>2. Program &amp; Topic Scope</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* 7. Program Type */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 block">
                      7. Program Type *
                    </label>
                    <select
                      value={formData.programType}
                      onChange={(e) => setFormData({ ...formData, programType: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    >
                      <option value="Guest Lectures">Guest Lectures</option>
                      <option value="Technical Workshops">Technical Workshops</option>
                      <option value="Corporate Masterclasses">Corporate Masterclasses</option>
                      <option value="Business Analytics Workshops">Business Analytics</option>
                      <option value="Data Science & AI Sessions">Data Science & AI</option>
                      <option value="Industry Case Studies">Industry Case Studies</option>
                      <option value="Career Guidance Sessions">Career Guidance</option>
                      <option value="Resume & Interview Workshops">Resume & Interview</option>
                      <option value="Industry Mentorship">Industry Mentorship</option>
                      <option value="Leadership Talks">Leadership Talks</option>
                      <option value="Panel Discussions">Panel Discussions</option>
                      <option value="Hackathons & Innovation Events">Hackathons</option>
                    </select>
                  </div>

                  {/* 8. Preferred Topic */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 block">
                      8. Preferred Topic *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Distributed Systems / RAG"
                      value={formData.preferredTopic}
                      onChange={(e) => setFormData({ ...formData, preferredTopic: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    />
                  </div>

                  {/* 9. Participants */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 block">
                      9. Expected Participants *
                    </label>
                    <select
                      value={formData.participants}
                      onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    >
                      <option value="30–60 Students (Workshop Lab)">30–60 Students (Lab)</option>
                      <option value="60–120 Students (Classroom)">60–120 Students</option>
                      <option value="150–300 Students (Auditorium)">150–300 Students (Auditorium)</option>
                      <option value="500+ Students (Campus-wide)">500+ Students (Campus-wide)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Group 3: Schedule, Logistics & Requirements (Fields 10-15) */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#138A9E] mb-3 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>3. Schedule, Logistics &amp; Budget</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                  {/* 10. Preferred Date */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 block">
                      10. Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    />
                  </div>

                  {/* 11. Alternative Date */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 block">
                      11. Alternative Date
                    </label>
                    <input
                      type="date"
                      value={formData.alternativeDate}
                      onChange={(e) => setFormData({ ...formData, alternativeDate: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    />
                  </div>

                  {/* 12. Online / Offline */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 block">
                      12. Delivery Mode *
                    </label>
                    <select
                      value={formData.deliveryMode}
                      onChange={(e) => setFormData({ ...formData, deliveryMode: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    >
                      <option value="On-Campus (Offline)">On-Campus (Offline)</option>
                      <option value="Live Virtual (Online)">Live Virtual (Online)</option>
                      <option value="Hybrid (Keynote + Remote Labs)">Hybrid</option>
                    </select>
                  </div>

                  {/* 13. Session Duration */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#138A9E]" />
                      <span>13. Duration *</span>
                    </label>
                    <select
                      value={formData.sessionDuration}
                      onChange={(e) => setFormData({ ...formData, sessionDuration: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    >
                      <option value="90–120 min">90–120 min</option>
                      <option value="Half Day (3–4 hrs)">Half Day (3–4 hrs)</option>
                      <option value="Full Day (6 hrs)">Full Day (6 hrs)</option>
                      <option value="2-Day Workshop">2-Day Workshop</option>
                    </select>
                  </div>

                  {/* 14. Budget Range */}
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-[#138A9E]" />
                      <span>14. Budget &amp; Funding Allocation *</span>
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    >
                      <option value="Institutional Budget Approved">Institutional Budget Approved</option>
                      <option value="Departmental Fund">Departmental Activity Fund</option>
                      <option value="Student Society / CSI / IEEE">Student Club / IEEE / CSI Supported</option>
                      <option value="Corporate / CSR Co-sponsored">Corporate / Alumni Co-sponsored</option>
                    </select>
                  </div>
                </div>

                {/* 15. Requirements */}
                <div>
                  <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-[#138A9E]" />
                    <span>15. Specific Syllabus Mapping or Speaker Requirements</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Mention specific course modules, semester year, projector/lab setup, or speaker background preferences..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3.5 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                  />
                </div>
              </div>

              {/* Bottom Notice matching Slide 12 */}
              <div className="p-3 rounded-xl bg-[#EAF6FA] border border-[#D7EAF3] text-center">
                <p className="text-[11px] text-[#244866] font-medium italic">
                  &ldquo;The calendar offers only dates with genuinely configured expert availability.&rdquo;
                </p>
              </div>

              {/* Submit CTA */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-[#1769AA] hover:bg-[#0B1F33] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  {loading ? (
                    <span>Verifying dates...</span>
                  ) : (
                    <>
                      <span>Submit 15-Field Booking Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Submission Confirmation */
          <div className="text-center py-8 sm:py-10">
            <div className="w-16 h-16 bg-[#2BAE66]/15 text-[#2BAE66] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-extrabold text-[#0B1F33]">
              Campus Request Submitted
            </h4>
            <p className="text-sm text-[#4A6D88] mt-2 max-w-md mx-auto">
              Thank you, <span className="font-semibold text-[#0B1F33]">{formData.contactPerson || 'Partner'}</span>. Your 15-field institutional request for <span className="font-semibold text-[#0B1F33]">{formData.institutionName || 'your institution'}</span> has been routed to our academic liaison desk.
            </p>
            <div className="mt-4 p-4 rounded-xl bg-[#F4F9FC] border border-[#D7EAF3] max-w-sm mx-auto text-xs text-slate-600">
              <p>Program: <span className="font-bold text-[#0B1F33]">{formData.programType}</span></p>
              <p className="mt-0.5">Mode: <span className="font-bold text-[#0B1F33]">{formData.deliveryMode}</span></p>
              <p className="mt-0.5">Assigned desk SLA: <span className="font-bold text-[#138A9E]">Within 24 Hours</span></p>
            </div>
            <button
              onClick={handleReset}
              className="mt-6 bg-[#0B1F33] hover:bg-[#1769AA] text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow-sm transition-all"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
