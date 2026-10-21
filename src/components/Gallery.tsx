import React from 'react';
import { ArrowRight } from 'lucide-react';

interface GalleryProps {
  onOpenPartnerModal: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onOpenPartnerModal }) => {
  return (
    <section id="gallery" className="py-16 md:py-24 bg-white border-b border-[#EAF4F8]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#1286A0] uppercase">
              Event Gallery
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#103957] tracking-tight mt-1">
              Moments from our campus events
            </h2>
            <p className="text-sm sm:text-base text-[#244866] mt-1 max-w-xl">
              Capturing authentic energy, curiosity, and hands-on discovery from campuses across India.
            </p>
          </div>

          <a
            href="#gallery"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1286A0] hover:text-[#0E6D82] transition-colors"
          >
            <span>View all photos</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Asymmetric Photo Grid (Matching Reference Slice 8) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Left Column: Large Tall Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-md group min-h-[380px] lg:min-h-[460px]">
            <img
              src="/images/gallery-stage.jpg"
              alt="Industry expert presenting on stage"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#103957]/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="bg-[#1286A0] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Guest Lecture
                </span>
                <h4 className="text-white text-base font-bold mt-2">
                  System Architecture Keynote • Delhi Technical Campus
                </h4>
              </div>
            </div>
          </div>

          {/* Right Column: Split Grid */}
          <div className="lg:col-span-7 flex flex-col gap-5 justify-between">
            
            {/* Top Right: Wide Landscape Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-md group h-[220px]">
              <img
                src="/images/gallery-seminar.jpg"
                alt="Students in seminar hall"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#103957]/80 via-transparent to-transparent flex items-end p-5">
                <div>
                  <span className="bg-[#153F60] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    AI & Cloud Masterclass
                  </span>
                  <h4 className="text-white text-sm font-bold mt-1">
                    Distributed ML Systems Workshop • Pune
                  </h4>
                </div>
              </div>
            </div>

            {/* Bottom Row: 2 Cards (Medium Image + Teal Info Card) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 h-auto sm:h-[220px]">
              
              {/* Bottom Left: Medium Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-md group h-[200px] sm:h-full">
                <img
                  src="/images/gallery-interactive.jpg"
                  alt="Interactive student Q&A"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#103957]/80 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <span className="bg-[#1286A0] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Interactive Q&A
                    </span>
                    <h5 className="text-white text-xs font-bold mt-1">
                      Placement Roadmap Discussion
                    </h5>
                  </div>
                </div>
              </div>

              {/* Bottom Right: Teal Pattern Card */}
              <div className="rounded-2xl bg-[#1286A0] text-white p-6 shadow-md flex flex-col justify-between relative overflow-hidden h-[200px] sm:h-full">
                {/* Subtle ripple background decoration */}
                <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full border-4 border-white/10 pointer-events-none"></div>

                <div>
                  <div className="flex items-center text-sky-200 text-xs font-semibold uppercase tracking-wider mb-1">
                    <span>Bring This Energy</span>
                  </div>
                  <h4 className="text-lg font-extrabold leading-snug">
                    Host an inspiring event on your campus
                  </h4>
                  <p className="text-xs text-sky-100 mt-1">
                    Custom themes, top-tier speakers, and complete event logistics.
                  </p>
                </div>

                <button
                  onClick={onOpenPartnerModal}
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#1286A0] hover:bg-sky-50 text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-colors w-fit mt-3"
                >
                  <span>Host an event</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
