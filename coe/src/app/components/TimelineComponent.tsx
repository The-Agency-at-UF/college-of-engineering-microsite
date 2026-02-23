'use client';
import React, { useMemo } from 'react';

interface TimelineProps {
  visibleEventDates: string[];
}

export default function Timeline({ visibleEventDates }: TimelineProps) {

  const decades = useMemo(() => {
    const labels: string[] = [];
    for (let year = 2020; year >= 1910; year -= 10) {
      labels.push(`${year}s`);
    }
    return labels;
  }, []);

  const totalDecades = decades.length; // 12 decades
  const timelineHeight = 722; // Matches Figma: 722px

  const extractYear = (date: string): number | null => {
    const yearMatch = date.match(/^(\d{4})/);
    return yearMatch ? parseInt(yearMatch[1], 10) : null;
  };

  const visibleYearRange = useMemo(() => {
    if (visibleEventDates.length === 0) return null;
    const years = visibleEventDates
      .map(date => extractYear(date))
      .filter((year): year is number => year !== null);
    if (years.length === 0) return null;
    return { min: Math.min(...years), max: Math.max(...years) };
  }, [visibleEventDates]);

  const highlightData = useMemo(() => {
    if (!visibleYearRange) return null;

    const getDecadeIndex = (year: number): number => {
      const decadeStart = Math.floor(year / 10) * 10;
      return (2020 - decadeStart) / 10;
    };

    const earliestDecade = Math.floor(visibleYearRange.min / 10) * 10;
    const latestDecade = Math.floor(visibleYearRange.max / 10) * 10;
    const minDecadeIndex = Math.max(0, Math.min(getDecadeIndex(earliestDecade), totalDecades - 1));
    const maxDecadeIndex = Math.max(0, Math.min(getDecadeIndex(latestDecade), totalDecades - 1));
    const startDecade = Math.min(minDecadeIndex, maxDecadeIndex);
    const endDecade = Math.max(minDecadeIndex, maxDecadeIndex);

    return {
      top: (startDecade / totalDecades) * timelineHeight,
      height: ((endDecade - startDecade + 1) / totalDecades) * timelineHeight,
      activeDecadeIndex: startDecade,
    };
  }, [visibleYearRange, totalDecades, timelineHeight]);

  return (
    <aside className="p-30 flex flex-col items-center z-50">
      <div
        className="relative w-[8px]"
        style={{ backgroundColor: '#002657', height: `${timelineHeight}px` }}
      >
        {/* Top extension */}
        <div
          className="absolute left-0 w-[8px]"
          style={{ backgroundColor: '#002657', top: '-50px', height: '50px' }}
        />

        {/* Bottom extension */}
        <div
          className="absolute left-0 w-[8px]"
          style={{ backgroundColor: '#002657', bottom: '-54px', height: '54px' }}
        />

        {/*
          TOP ARROW CAP
          Two lines forming an upward-pointing chevron (open arrow, not filled).
          40px wide × 16px tall, centered on the 6px stem.
          Uses two strokes meeting at a point at the top-center.
        */}
        <div
          className="absolute"
          style={{ left: '-16px', top: '-66px', width: '40px', height: '16px' }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Left line: from bottom-left to top-center */}
            <line x1="0" y1="20" x2="20" y2="0" stroke="#002657" strokeWidth="8" strokeLinecap="square" />
            {/* Right line: from top-center to bottom-right */}
            <line x1="20" y1="0" x2="40" y2="20" stroke="#002657" strokeWidth="8" strokeLinecap="square" />
          </svg>
        </div>

        {/* Bottom rectangle cap */}
        <div
          className="absolute left-[-22px] w-[50px] h-[9px]"
          style={{ backgroundColor: '#002657', bottom: '-54px' }}
        />

        {/* Scroll Highlight Bar - dynamically positioned based on visible year range */}
        {highlightData && (
          <div
            className="absolute left-[-16px] rounded-sm -z-10 overflow-hidden"
            style={{
              top: `${highlightData.top}px`,
              width: '38px',
              height: `${highlightData.height}px`,
              zIndex: 1,
            }}
          >
            <div
              className="absolute left-0 top-0 w-full"
              style={{
                // Keep a full-length bar and reveal only the selected span via clipping.
                backgroundColor: '#FA461680',
                height: `${timelineHeight}px`,
                transform: `translateY(-${highlightData.top}px)`,
              }}
            />
          </div>
        )}

        {/* Tick marks */}
        <div className="absolute left-[-16px] top-0 h-full flex flex-col justify-between">
          {decades.map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="w-[16px] h-[8px]" style={{ backgroundColor: '#002657' }} />
            </div>
          ))}
        </div>

        {/* Decade labels */}
        <div
          className="absolute left-[-90px] top-0 h-full flex flex-col justify-between text-center"
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
              style={{ color: highlightData?.activeDecadeIndex === i ? '#0021A5' : '#002657' }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

     
    </aside>
  );
}