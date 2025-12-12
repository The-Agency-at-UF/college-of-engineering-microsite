import React from "react";
import Image from "next/image";

export interface EventCardProps {
  title?: string;
  dateRange?: string;
  description?: string;
  sourceLabel?: string;
  imageUrl?: string;
}

const EventCardComponent: React.FC<EventCardProps> = ({
  title = "EVENT TITLE",
  dateRange = "XXXX–XXXX",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
  sourceLabel = "MORE FROM XXXX",
  imageUrl,
}) => {
  // Generate a deterministic random image based on title when no imageUrl is provided
  // This ensures the same event always gets the same random image
  const getRandomPlaceholderImage = (seed: string): string => {
    // Simple hash function to convert string to number
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    // Map hash to 1-7 range for pic1.jpg through pic7.jpg
    const picNumber = (Math.abs(hash) % 7) + 1;
    return `/images/pic${picNumber}.jpg`;
  };

  // Use placeholder image if no imageUrl is provided
  const imageSrc = imageUrl || getRandomPlaceholderImage(title);

  return (
    <div className="relative w-[320px] flex flex-col items-center font-['IBM Plex Sans']">
      {/* Image box */}
      <div className="w-[280px] h-[190px] border-2 border-[#0021A5] bg-gray-300 z-20 relative overflow-hidden">
        <Image
          src={imageSrc}
          alt={title || "Event image"}
          fill
          className="object-cover"
        />
      </div>

      {/* Rounded rectangle content box*/}
      <div className="w-full bg-white border-2 border-[#0021A5] rounded-[20px] -mt-30 pt-[130px] pb-[16px] px-4 shadow-lg hover:shadow-2xl transition-all duration-200">
        {/* Event Title */}
        <h3 className="text-[#002657] text-[16px] font-bold leading-tight uppercase">
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
      </div>
    </div>
  );
};

export default EventCardComponent;
