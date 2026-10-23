import React, { useState, useEffect, useRef } from 'react';

interface RollingNumberProps {
  end: number;
  duration?: number;
  suffix?: string;
  startTrigger: boolean;
}

const RollingNumber: React.FC<RollingNumberProps> = ({
  end,
  duration = 1800,
  suffix = '+',
  startTrigger,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startTrigger) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic: starts fast and smoothly decelerates into place
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * end);

      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration, startTrigger]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const StatsStrip: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { target: 30, suffix: '+', label: 'Industry Experts' },
    { target: 15, suffix: '+', label: 'Institutions Worked With' },
    { target: 7000, suffix: '+', label: 'Students Reached' },
    { target: 20, suffix: '+', label: 'Guest Lectures Delivered' },
    { target: 10, suffix: '+', label: 'Workshops Conducted' },
  ];

  return (
    <div
      id="stats"
      ref={containerRef}
      className="relative z-30 -translate-y-1/2 -mb-8 sm:-mb-10 md:-mb-12 pointer-events-none"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
        {/* Floating Rounded Card Overlapping 50% on light-blue section and 50% on white section */}
        <div className="bg-[#103957] rounded-2xl sm:rounded-3xl border border-white/25 shadow-2xl shadow-sky-950/25 px-5 sm:px-8 lg:px-10 py-5 sm:py-6 text-white">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-6 lg:gap-6 items-center justify-between">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center text-center ${
                  idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                <span className="text-2xl sm:text-3xl md:text-[32px] font-extrabold tracking-tight text-white leading-tight tabular-nums">
                  <RollingNumber
                    end={stat.target}
                    suffix={stat.suffix}
                    startTrigger={isVisible}
                  />
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-slate-200 mt-1 text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
