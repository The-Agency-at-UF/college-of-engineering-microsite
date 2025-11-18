import React from "react";

export interface EventCardProps {
  title?: string;
  dateRange?: string;
  description?: string;
  sourceLabel?: string;
}

const EventCardComponent: React.FC<EventCardProps> = ({
  title = "EVENT TITLE",
  dateRange = "XXXX–XXXX",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
  sourceLabel = "MORE FROM XXXX",
}) => {
  return (
    <div className="relative w-[320px] flex flex-col items-center font-['IBM Plex Sans']">
      {/* Top label with text arrows */}
      <p className="text-[#002657] text-[14px] font-[400] italic leading-[100%] mb-[8px] text-center">
        ← {sourceLabel} →
      </p>

      {/* Image box */}
      <div className="w-[280px] h-[190px] border-2 border-[#0021A5] bg-gray-300 z-20 relative"></div>

      {/* Rounded rectangle content box*/}
      <div className="w-full bg-white border-2 border-[#0021A5] rounded-[20px] -mt-30 pt-[130px] pb-[16px] px-4 shadow-lg hover:shadow-2xl transition-all duration-200">
        {/* Event Title */}
        <h3 className="text-[#002657] text-[16px] font-bold leading-tight">
          {title}
        </h3>

        {/* Date Range */}
        <p className="text-[#0021A5] text-[11px] font-semibold italic mt-[1px]">
          {dateRange}
        </p>

        {/* Gold to brown gradient line */}
        <div
          className="w-full h-[1px] mt-[6px] mb-[10px] rounded-full"
          style={{
            background: "linear-gradient(90deg, #F2A900 0%, #774219 100%)",
          }}
        ></div>

        {/* Description */}
        <p className="text-[11px] text-[#333333] leading-[1.1] tracking-tight mb-[6px]">
          {description}
        </p>

        {/* Learn More with arrow */}
        <div className="flex justify-end items-center mt-[4px]">
          <a
            href="#"
            className="text-[#002657] text-[11px] font-semibold flex items-center gap-[3px] hover:underline transition-all"
          >
            LEARN MORE
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 8 8"
              fill="none"
              stroke="#002657"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[8px] h-[8px]"
            >
              <path d="M1 1l3 3-3 3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventCardComponent;
