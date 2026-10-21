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
  MessageSquare,
  Navigation,
  Briefcase
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
    institutionName: '',      // 1. Institution name
    contactPerson: '',        // 2. Contact person
    designation: 'CLASS TEACHER', // 3. Designation (Alphabetical default)
    officialEmail: '',        // 4. Official email
    phoneNumber: '',          // 5. Phone number
    collegeLocation: '',      // 6. College location
    department: 'Aerospace & Aeronautical Engineering', // 7. Department (Alphabetical default)
    programType: initialFormat || 'Business Analytics Workshops', // 8. Program type
    preferredTopic: preselectedExpert ? preselectedExpert.expertise : 'Business Analytics & Data-driven Decision Making with SQL & Power BI', // 9. Preferred topic
    participants: '40-60',    // 10. Expected Audience Size
    preferredDate: '',        // 11. Preferred date
    alternativeDate: '',      // 12. Alternative date
    deliveryMode: 'Hybrid (Keynote + Remote Labs)', // 13. Delivery Mode (Alphabetical default)
    sessionDuration: '90–120 min', // 14. Session duration
    venue: 'Auditorium',      // 15. Venue (Alphabetical default)
    budgetRange: 'Institutional Budget Approved', // 16. Budget range
    requirements: '',         // 17. Requirements
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);

  const handleGetLiveLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    setLocationStatus('Detecting live location...');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            const city = addr.city || addr.town || addr.village || addr.county || addr.state_district || '';
            const state = addr.state || '';
            const country = addr.country || '';
            const parts = [city, state, country].filter(Boolean);
            const locStr = parts.length > 0 ? parts.join(', ') : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            setFormData(prev => ({ ...prev, collegeLocation: locStr }));
            setLocationStatus('Live location detected successfully.');
          } else {
            setFormData(prev => ({ ...prev, collegeLocation: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` }));
            setLocationStatus('Live coordinates detected.');
          }
        } catch {
          setFormData(prev => ({ ...prev, collegeLocation: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` }));
          setLocationStatus('Live coordinates detected.');
        } finally {
          setIsLocating(false);
          setTimeout(() => setLocationStatus(null), 4000);
        }
      },
      (err) => {
        setIsLocating(false);
        if (err.code === 1) {
          setLocationStatus('Location permission denied. Please type your location manually.');
        } else {
          setLocationStatus('Unable to fetch live location. Please type manually.');
        }
        setTimeout(() => setLocationStatus(null), 5000);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

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
                <span>Campus Booking Form</span>
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
              
              {/* Group 1: Institutional & Contact Details */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#138A9E] mb-3 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5" />
                  <span>1. Institutional &amp; Contact Details</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {/* 1. Institution Name */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 block">
                      Institution Name *
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
                      <span>Contact Person *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. K. Sharma"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    />
                  </div>

                  {/* 3. Designation Dropdown */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-[#138A9E]" />
                      <span>Designation *</span>
                    </label>
                    <select
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    >
                      <option value="CLASS TEACHER">CLASS TEACHER</option>
                      <option value="DEAN">DEAN</option>
                      <option value="FACULTY CO-ORDINATOR">FACULTY CO-ORDINATOR</option>
                      <option value="HOD">HOD</option>
                      <option value="PRINCIPAL">PRINCIPAL</option>
                      <option value="OTHER">OTHER</option>
                    </select>
                  </div>

                  {/* 4. Official Email */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-[#138A9E]" />
                      <span>Official Email *</span>
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

                  {/* 5. Phone Number */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#138A9E]" />
                      <span>Phone Number *</span>
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

                  {/* 6. College Location with Live Location or Manual Typing */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-bold text-[#0B1F33] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#138A9E]" />
                        <span>Location *</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleGetLiveLocation}
                        disabled={isLocating}
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-[#138A9E] hover:text-[#0E6D82] bg-[#EAF6FA] hover:bg-[#D7EAF3] px-2 py-0.5 rounded-full transition-colors cursor-pointer disabled:opacity-50"
                        title="Detect live GPS location"
                      >
                        <Navigation className={`w-2.5 h-2.5 ${isLocating ? 'animate-spin' : ''}`} />
                        <span>{isLocating ? 'Detecting...' : 'Live Location'}</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Type location or use live GPS"
                      value={formData.collegeLocation}
                      onChange={(e) => setFormData({ ...formData, collegeLocation: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    />
                    {locationStatus && (
                      <p className="text-[10px] text-[#138A9E] font-medium mt-1 truncate">{locationStatus}</p>
                    )}
                  </div>

                  {/* 7. Department - All Engineering Sections */}
                  <div className="sm:col-span-2 md:col-span-3">
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-[#138A9E]" />
                      <span>Department (Engineering &amp; Technology Branches) *</span>
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    >
                      <option value="Aerospace & Aeronautical Engineering">Aerospace &amp; Aeronautical Engineering</option>
                      <option value="All Engineering Departments (College-wide)">All Engineering Departments (College-wide)</option>
                      <option value="Artificial Intelligence & Machine Learning (AI & ML)">Artificial Intelligence &amp; Machine Learning (AI &amp; ML)</option>
                      <option value="Automobile Engineering">Automobile Engineering</option>
                      <option value="Biotechnology & Biomedical Engineering">Biotechnology &amp; Biomedical Engineering</option>
                      <option value="Chemical Engineering">Chemical Engineering</option>
                      <option value="Civil Engineering (CE)">Civil Engineering (CE)</option>
                      <option value="Computer Science & Engineering (CSE)">Computer Science &amp; Engineering (CSE)</option>
                      <option value="Data Science & Engineering">Data Science &amp; Engineering</option>
                      <option value="Electrical & Electronics Engineering (EEE)">Electrical &amp; Electronics Engineering (EEE)</option>
                      <option value="Electronics & Communication Engineering (ECE)">Electronics &amp; Communication Engineering (ECE)</option>
                      <option value="Information Technology (IT)">Information Technology (IT)</option>
                      <option value="Mechanical Engineering (ME)">Mechanical Engineering (ME)</option>
                      <option value="Mechatronics Engineering">Mechatronics Engineering</option>
                      <option value="Metallurgical & Materials Engineering">Metallurgical &amp; Materials Engineering</option>
                      <option value="Robotics & Automation">Robotics &amp; Automation</option>
                      <option value="Other">Other Engineering / Specialization</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Group 2: Program & Topic Scope */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#138A9E] mb-3 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>2. Program &amp; Topic Scope</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Program Type */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 block">
                      Program Type *
                    </label>
                    <select
                      value={formData.programType}
                      onChange={(e) => setFormData({ ...formData, programType: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    >
                      <option value="Business Analytics Workshops">Business Analytics &amp; Decision Making</option>
                      <option value="Career Growth in Data & BI">Career Growth &amp; Placement Mastery</option>
                      <option value="Corporate Masterclasses">Corporate Masterclasses</option>
                      <option value="Guest Lectures">Guest Lectures (90-120 min)</option>
                      <option value="Industry Case Studies">Industry Case Studies</option>
                      <option value="Industry Mentorship">Industry Mentorship</option>
                      <option value="Microsoft Excel for Analytics">Microsoft Excel for Analytics</option>
                      <option value="Power BI & Tableau Dashboarding">Power BI &amp; Tableau Dashboards</option>
                      <option value="Python & Azure Databricks Bootcamp">Python &amp; Azure Databricks</option>
                      <option value="SQL & MySQL Hands-on Workshop">SQL &amp; MySQL Hands-on Workshop</option>
                      <option value="Technical Workshops">Technical Workshops (Full Day)</option>
                    </select>
                  </div>

                  {/* Preferred Topic */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 block">
                      Preferred Topic *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SQL, Business Analytics, Power BI, Azure Databricks, Career Growth"
                      value={formData.preferredTopic}
                      onChange={(e) => setFormData({ ...formData, preferredTopic: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    />
                  </div>

                  {/* Expected Audience Size */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 block">
                      Expected Audience Size *
                    </label>
                    <select
                      value={formData.participants}
                      onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    >
                      <option value="40-60">40-60</option>
                      <option value="60-100">60-100</option>
                      <option value="100-200">100-200</option>
                      <option value="200-400">200-400</option>
                      <option value="More than 400">More than 400</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Group 3: Schedule, Logistics, Venue & Budget */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#138A9E] mb-3 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>3. Schedule, Logistics, Venue &amp; Budget</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                  {/* Preferred Date */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 block">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    />
                  </div>

                  {/* Alternative Date */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 block">
                      Alternative Date
                    </label>
                    <input
                      type="date"
                      value={formData.alternativeDate}
                      onChange={(e) => setFormData({ ...formData, alternativeDate: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    />
                  </div>

                  {/* Delivery Mode */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 block">
                      Delivery Mode *
                    </label>
                    <select
                      value={formData.deliveryMode}
                      onChange={(e) => setFormData({ ...formData, deliveryMode: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    >
                      <option value="Hybrid (Keynote + Remote Labs)">Hybrid (Keynote + Remote Labs)</option>
                      <option value="Live Virtual (Online)">Live Virtual (Online)</option>
                      <option value="On-Campus (Offline)">On-Campus (Offline)</option>
                    </select>
                  </div>

                  {/* Session Duration */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#138A9E]" />
                      <span>Duration *</span>
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

                  {/* Venue in Alphabetical Order */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                      <Building className="w-3 h-3 text-[#138A9E]" />
                      <span>Venue *</span>
                    </label>
                    <select
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    >
                      <option value="Auditorium">Auditorium</option>
                      <option value="Class Room">Class Room</option>
                      <option value="Lab">Lab</option>
                      <option value="Seminar Hall">Seminar Hall</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-[#138A9E]" />
                      <span>Budget Allocation *</span>
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full bg-[#F4F9FC] border border-[#D7EAF3] rounded-xl px-3 py-2 text-xs text-[#0B1F33] font-medium focus:outline-none focus:ring-2 focus:ring-[#138A9E]/20 focus:border-[#138A9E]"
                    >
                      <option value="Institutional Budget Approved">Institutional Budget Approved</option>
                      <option value="Departmental Fund">Departmental Activity Fund</option>
                      <option value="Student Society / CSI / IEEE">Student Club / IEEE / CSI</option>
                      <option value="Corporate / CSR Co-sponsored">Corporate / Alumni Co-sponsored</option>
                    </select>
                  </div>
                </div>

                {/* Specific Requirements */}
                <div>
                  <label className="text-[11px] font-bold text-[#0B1F33] mb-1 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-[#138A9E]" />
                    <span>Specific Syllabus Mapping or Speaker Requirements</span>
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
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-[#1769AA] hover:bg-[#0B1F33] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  {loading ? (
                    <span>Verifying parameters...</span>
                  ) : (
                    <>
                      <span>Submit Campus Booking Request</span>
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
              Thank you, <span className="font-semibold text-[#0B1F33]">{formData.contactPerson || 'Partner'}</span> ({formData.designation}). Your institutional request for <span className="font-semibold text-[#0B1F33]">{formData.institutionName || 'your institution'}</span> has been routed to our academic liaison desk.
            </p>
            <div className="mt-4 p-4 rounded-xl bg-[#F4F9FC] border border-[#D7EAF3] max-w-sm mx-auto text-xs text-slate-600 text-left space-y-1">
              <p>Department: <span className="font-bold text-[#0B1F33]">{formData.department}</span></p>
              <p>Program: <span className="font-bold text-[#0B1F33]">{formData.programType}</span></p>
              <p>Audience Size: <span className="font-bold text-[#0B1F33]">{formData.participants} Students</span></p>
              <p>Venue: <span className="font-bold text-[#0B1F33]">{formData.venue}</span></p>
              <p>Location: <span className="font-bold text-[#0B1F33]">{formData.collegeLocation || 'On Campus'}</span></p>
              <p>Mode: <span className="font-bold text-[#0B1F33]">{formData.deliveryMode}</span></p>
              <p>Assigned SLA: <span className="font-bold text-[#138A9E]">Within 24 Hours</span></p>
            </div>
            <button
              onClick={handleReset}
              className="mt-6 bg-[#0B1F33] hover:bg-[#1769AA] text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
