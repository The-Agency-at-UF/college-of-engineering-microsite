
'use client';
import React, { useMemo } from 'react';

interface TimelineProps {
  visibleEventDates: string[];
}

export default function Timeline({ visibleEventDates }: TimelineProps) {

  // Generate decade labels from 2020s to 1910s (12 decades)
  const decades = useMemo(() => {
    const labels: string[] = [];
    for (let year = 2020; year >= 1910; year -= 10) {
      labels.push(`${year}s`);
    }
    return labels;
  }, []);

  const totalDecades = decades.length; // 12 decades
  const timelineHeight = 500; // Height of the main timeline
  const decadeHeight = timelineHeight / totalDecades; // Height per decade

  // Extract year from date string
  const extractYear = (date: string): number | null => {
    const yearMatch = date.match(/^(\d{4})/);
    return yearMatch ? parseInt(yearMatch[1], 10) : null;
  };

  // Get decade index from year (2020s = 0, 2010s = 1, ..., 1910s = 11)
  const getDecadeIndex = (year: number): number => {
    const decadeStart = Math.floor(year / 10) * 10;
    return (2020 - decadeStart) / 10;
  };

  // Calculate year range from currently rendered events
  const visibleYearRange = useMemo(() => {
    if (visibleEventDates.length === 0) {
      return null;
    }

    const years = visibleEventDates
      .map(date => extractYear(date))
      .filter((year): year is number => year !== null);

    if (years.length === 0) {
      return null;
    }

    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    return { min: minYear, max: maxYear };
  }, [visibleEventDates]);


  // Calculate highlight bar position based on visible year range
  // Round down to nearest decade and highlight from earliest to latest decade
  const highlightData = useMemo(() => {
    if (!visibleYearRange) {
      return null;
    }

    // Round down to nearest decade (e.g., 2013 -> 2010s, 2023 -> 2020s)
    const earliestDecade = Math.floor(visibleYearRange.min / 10) * 10;
    const latestDecade = Math.floor(visibleYearRange.max / 10) * 10;

    // Get decade indices (2020s = 0, 2010s = 1, ..., 1910s = 11)
    const earliestDecadeIndex = getDecadeIndex(earliestDecade);
    const latestDecadeIndex = getDecadeIndex(latestDecade);

    // Ensure indices are within bounds
    const minDecadeIndex = Math.max(0, Math.min(earliestDecadeIndex, totalDecades - 1));
    const maxDecadeIndex = Math.max(0, Math.min(latestDecadeIndex, totalDecades - 1));

    // Get the range from earliest (top) to latest (bottom) on timeline
    // Since timeline goes 2020s (top) to 1910s (bottom), smaller index = higher on timeline
    const startDecade = Math.min(minDecadeIndex, maxDecadeIndex);
    const endDecade = Math.max(minDecadeIndex, maxDecadeIndex);

    // Calculate position: top is at the earliest decade, height covers to latest decade
    const top = (startDecade / totalDecades) * timelineHeight;
    const height = ((endDecade - (startDecade)+1) / totalDecades) * timelineHeight;

    return {
      top,
      height,
      activeDecadeIndex: startDecade,
    };
  }, [visibleYearRange, totalDecades, timelineHeight, getDecadeIndex]);

  return (
    <aside className="p-16 flex flex-col items-center z-50">
      {/* Main vertical line */}
      <div
        className="relative w-[6px] flex flex-col justify-between"
        style={{ 
          backgroundColor: '#002657',
          height: `${timelineHeight}px`
        }}
      >
        {/* Top extension */}
        <div
          className="absolute left-0 -top-[50px] w-[6px] h-[50px]"
          style={{ backgroundColor: '#002657' }}
        />

        {/* Bottom extension */}
        <div
          className="absolute left-0 -bottom-[54px] w-[6px] h-[54px]"
          style={{ backgroundColor: '#002657' }}
        />

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

        {/* Scroll Highlight Bar - dynamically positioned based on visible year range */}
        {highlightData && (
          <div
            className="absolute left-[-26px] rounded-sm -z-10"
            style={{
              backgroundColor: '#0021A580',
              top: `${highlightData.top}px`,
              width: '28px',
              height: `${highlightData.height}px`,
            }}
          />
        )}

        {/* Tick marks - one per decade */}
        <div className="absolute left-[-16px] top-0 h-full flex flex-col justify-between">
          {decades.map((_, i) => (
            <div key={i} className="flex items-center">
              <div
                className="w-[16px] h-[6px]"
                style={{ backgroundColor: '#002657' }}
              />
            </div>
          ))}
        </div>

        {/* Decade labels */}
        <div
          className="absolute left-[-70px] top-0 h-full flex flex-col justify-between text-center"
          style={{
            color: '#002657',
            fontFamily: 'var(--font-ibm-plex-sans)',
            fontWeight: 400,
            fontStyle: 'italic',
          }}
        >
          {decades.map((label, i) => (
            <span
              key={i}
              style={{
                color: highlightData?.activeDecadeIndex === i ? '#0021A5' : '#002657',
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* UF Orange circular scroll to top button */}
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
    </aside>
  );
}
