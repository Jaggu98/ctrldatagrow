import React from 'react';
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  Headphones,
  Award,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const TrustSafety: React.FC = () => {
  const trustPillars = [
    {
      icon: ShieldCheck,
      color: 'text-[#1769AA]',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      title: 'Campus Verification & Speaker Vetting',
      description:
        'Every resource person and campus ambassador is manually verified via LinkedIn, institutional credentials, and corporate identity proof before directory listing.'
    },
    {
      icon: Lock,
      color: 'text-[#2BAE66]',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      title: 'Data Privacy & Student Security',
      description:
        'Strict student data protection. Zero data sharing with third-party advertisers. All attendee databases are encrypted and deleted post-session upon request.'
    },
    {
      icon: FileCheck2,
      color: 'text-[#D6A84F]',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      title: 'Strict Academic Integrity Code',
      description:
        'Speakers adhere to our anti-promotional curriculum charter. Sessions are strictly 100% technical knowledge, hands-on architectures, and unbiased career guidance.'
    },
    {
      icon: Headphones,
      color: 'text-[#138A9E]',
      bg: 'bg-teal-50',
      border: 'border-teal-100',
      title: '24/7 Academic Support & Backup SLA',
      description:
        'Guaranteed speaker arrival SLA. In rare corporate emergencies, our rapid-response contingency network deploys an equivalent industry expert within 24 hours.'
    }
  ];

  return (
    <section id="trust-safety" className="py-20 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#1769AA]/10 text-[#1769AA] border border-[#1769AA]/20 uppercase tracking-widest mb-3">
            Brand Integrity Charter
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F33] tracking-tight">
            Institutional Trust & Safety at Every Step
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed">
            We hold ourselves to the highest standards of safety, compliance, and pedagogical excellence across every campus partnership.
          </p>
        </div>

        {/* 4 Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${pillar.bg} ${pillar.color} flex items-center justify-center mb-5`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B1F33] mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Institutional Standard Verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* LinkedIn & Accreditation Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0077b5]/10 text-[#0077b5] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0B1F33]">
                Official Corporate Entity & LinkedIn Verification
              </h4>
              <p className="text-xs text-gray-500">
                Follow our official company updates, verified faculty reviews, and campus highlights.
              </p>
            </div>
          </div>

          <a
            href="https://www.linkedin.com/company/ctrl-data-grow/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0077b5] hover:bg-[#006396] text-white text-xs font-bold transition-colors shrink-0 shadow-sm"
          >
            <span>Visit Official LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
