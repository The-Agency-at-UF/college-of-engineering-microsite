"use client";

import Image from "next/image";


interface MilestoneCardProps {
  imageSrc: string;
  title: string;
  tags: string[];
  variant?: "gold" | "blue"; // Have this for now need to ask if it becomes a gradient when hovered
}

export default function MilestoneCard({
  imageSrc,
  title,
  tags,
  variant = "gold",
}: MilestoneCardProps) {
  // Gold variant
  if (variant === "gold") {
    return (
      <div className="relative w-96 h-72 rounded-2xl p-[3px] bg-gradient-to-r from-[#F2A900] to-[#774219] shadow-md font-[IBM Plex Sans]">
        <div className="w-full h-full rounded-2xl bg-white flex flex-col overflow-hidden">
          {/* Image */}
          <div className="relative flex-[3] bg-neutral-100">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
            />
          </div>

          {/* Divider */}
          <div className="h-[3px] bg-gradient-to-r from-[#F2A900] to-[#774219]" />

          {/* Tags and Title */}
          <div className="flex-[1] flex flex-col justify-center gap-2 px-4 py-3">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm font-bold text-white rounded-full bg-[#0021A5]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="font-bold text-[#002657] text-lg">{title}</h3>
          </div>
        </div>
      </div>
    );
  }

  // Blue variant
  return (
    <div className="w-96 h-72 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col font-[IBM Plex Sans] border border-gray-200">
      {/* Image */}
      <div className="relative flex-[3] bg-neutral-100">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Divider */}
      <div className="h-[3px] bg-[#0021A5]" />

      {/* Tags and Title */}
      <div className="flex-[1] flex flex-col justify-center gap-2 px-4 py-3">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-sm font-bold text-white rounded-full bg-[#0021A5]"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-semibold text-[#002657] text-lg">{title}</h3>
      </div>
    </div>
  );
}
