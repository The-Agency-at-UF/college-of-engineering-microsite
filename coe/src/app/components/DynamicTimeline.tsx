'use client';
import React, { useMemo } from 'react';

interface TimelineProps {
  minYear?: number;
  maxYear?: number;
  currentYear?: number;
}

export default function DynamicTimeline({ 
  minYear = 1909, 
  maxYear = 2024, 
  currentYear = new Date().getFullYear() 
}: TimelineProps) {
  // Calculate timeline segments and labels
  const timelineData = useMemo(() => {
    const yearSpan = maxYear - minYear;
    const segments = Math.min(8, Math.max(4, Math.ceil(yearSpan / 15))); // 4-8 segments
    
    const labels = [];
    for (let i = 0; i < segments; i++) {
      const year = minYear + Math.round((yearSpan * i) / (segments - 1));
      labels.push(year);
    }
    
    // Ensure we always show the max year
    if (labels[labels.length - 1] !== maxYear) {
      labels[labels.length - 1] = maxYear;
    }
    
    return {
      labels,
      yearSpan,
      segments
    };
  }, [minYear, maxYear]);

  // Calculate the highlight bar position and size based on visible content
  const highlightBarStyle = useMemo(() => {
    const totalHeight = 500; // Main timeline height
    const visibleSpan = maxYear - minYear;
    const totalSpan = currentYear - 1909; // Assuming college founded in 1909
    
    // Calculate relative position within the full timeline
    const startRatio = (minYear - 1909) / totalSpan;
    const heightRatio = visibleSpan / totalSpan;
    
    const top = startRatio * totalHeight;
    const height = Math.max(heightRatio * totalHeight, 50); // Minimum height of 50px
    
    return {
      top: `${top}px`,
      height: `${height}px`
    };
  }, [minYear, maxYear, currentYear]);

  return (
    <aside className="fixed left-15 top-1/2 -translate-y-1/2 flex flex-col items-center z-50">
      {/* Main vertical line */}
      <div
        className="relative w-[6px] h-[500px] flex flex-col justify-between"
        style={{ backgroundColor: '#002657' }}
      >
        {/* Top extension */}
        <div
          className="absolute left-0 -top-[50px] w-[6px] h-[50px]"
          style={{ backgroundColor: '#002657' }} 
        >
          <div
            className="absolute left-0 -bottom-[6px] w-[6px] h-[6px]"
            style={{ backgroundColor: '#002657' }}
          />
        </div>

        {/* Top rectangle cap */}
        <div
          className="absolute left-[-28px] top-[-54px] w-[60px] h-[7px]"
          style={{ backgroundColor: '#002657' }}
        />

        {/* Bottom rectangle cap */}
        <div
          className="absolute left-[-28px] bottom-[-54px] w-[60px] h-[7px]"
          style={{ backgroundColor: '#002657' }}
        />

        {/* Bottom extension */}
        <div
          className="absolute left-0 -bottom-[54px] w-[6px] h-[54px]"
          style={{ backgroundColor: '#002657' }}
        />
        
        {/* Dynamic Scroll Highlight Bar - represents visible content year range */}
        <div 
          className="absolute left-[-26px] w-[28px] rounded-sm -z-10 transition-all duration-300" 
          style={{ 
            backgroundColor: '#0021A580',
            ...highlightBarStyle
          }} 
        />

        {/* Dynamic Scroll bar - shows current visible range */}
        <div
          className="absolute right-[-14px] w-[7px] rounded-sm transition-all duration-300"
          style={{ 
            backgroundColor: '#0021A5',
            ...highlightBarStyle
          }}
        />

        {/* Dynamic tick marks */}
        <div className="absolute left-[-16px] top-0 h-full flex flex-col justify-between">
          {timelineData.labels.map((_, i) => (
            <div key={i} className="flex items-center">
              <div
                className="w-[16px] h-[6px]"
                style={{ backgroundColor: '#002657' }} 
              />
            </div>
          ))}
        </div>

        {/* Dynamic year labels */}
        <div
          className="absolute left-[-70px] top-0 h-full flex flex-col justify-between text-center"
          style={{
            color: '#002657',
            fontFamily: 'var(--font-ibm-plex-sans)',
            fontWeight: 400,
            fontStyle: 'italic',
          }}
        >
          {timelineData.labels.map((year, i) => (
            <span key={i} className="text-sm">
              {year}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mt-16 w-12 h-12 rounded-full flex items-center justify-center shadow transition"
        style={{
          backgroundColor: '#FA4616',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d93d13')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FA4616')}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      {/* Timeline info tooltip */}
      <div className="mt-4 text-xs text-center text-[#002657] font-semibold">
        <div>{minYear} - {maxYear}</div>
        <div className="text-[10px] opacity-70">Visible Range</div>
      </div>
    </aside>
  );
}