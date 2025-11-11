
'use client';
import React from 'react';

export default function Timeline() {
  // Placeholder labels
  const labels = ['XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX'];

  return (
    <aside className="fixed left-15 top-1/2 -translate-y-1/2 flex flex-col items-center z-50">
      {/* Main vertical line */}
      <div
        className="relative w-[6px] h-[500px] flex flex-col justify-between"
        style={{ backgroundColor: '#002657' }}
        >
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
        ></div>

        {/* Bottom rectangle cap */}
        <div
          className="absolute left-[-28px] bottom-[-54px] w-[60px] h-[7px]"
          style={{ backgroundColor: '#002657' }}
        ></div>

        <div
          className="absolute left-0 -bottom-[54px] w-[6px] h-[54px]"
            style={{ backgroundColor: '#002657' }}
        >  
        </div>
        {/* Scroll Highlight Bar */}
        <div 
        className="absolute left-[-26px] top-[-20px] w-[28px] h-[190px] rounded-sm -z-10" style={{ backgroundColor: '#0021A580' }} 
        > 
        </div>

        {/* Scroll bar  */}
        <div
          className="absolute right-[-14px] top-[-13px] w-[7px] h-[180px] rounded-sm"
          style={{ backgroundColor: '#0021A5' }}
        ></div>

        {/* Tick marks */}
        <div className="absolute left-[-16px] top-0 h-full flex flex-col justify-between">
          {labels.map((_, i) => (
            <div key={i} className="flex items-center">
              <div
                className="w-[16px] h-[6px]"
                style={{ backgroundColor: '#002657' }} 
              ></div>
            </div>
          ))}
        </div>

        {/* Year labels */}
        <div
        className="absolute left-[-70px] top-0 h-full flex flex-col justify-between text-center"
        style={{
            color: '#002657',
            fontFamily: 'var(--font-ibm-plex-sans)',
            fontWeight: 400,
            fontStyle: 'italic',
        }}
        >
        {labels.map((label, i) => (
            <span key={i}>{label}</span>
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
