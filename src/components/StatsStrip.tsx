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
    { target: 100, suffix: '+', label: 'Industry Experts' },
    { target: 50, suffix: '+', label: 'Partner Institutions' },
    { target: 200, suffix: '+', label: 'Sessions Conducted' },
    { target: 10000, suffix: '+', label: 'Students Reached' },
  ];

  return (
    <div
      id="stats"
      ref={containerRef}
      className="relative z-30 -translate-y-1/2 -mb-8 sm:-mb-10 md:-mb-12 pointer-events-none"
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
        {/* Floating Rounded Card Overlapping 50% on light-blue section and 50% on white section */}
        <div className="bg-[#103957] rounded-2xl sm:rounded-3xl border border-white/25 shadow-2xl shadow-sky-950/25 px-6 sm:px-12 py-5 sm:py-6 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center justify-between">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center text-center">
                <span className="text-2xl sm:text-3xl md:text-[34px] font-extrabold tracking-tight text-white leading-tight tabular-nums">
                  <RollingNumber
                    end={stat.target}
                    suffix={stat.suffix}
                    startTrigger={isVisible}
                  />
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-slate-200 mt-1 whitespace-nowrap">
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
