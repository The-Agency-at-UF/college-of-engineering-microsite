"use client";

import Image from "next/image";

interface MilestoneCardProps {
  imageSrc: string;
  title: string;
  tags: string[];
}

export default function MilestoneCard({ imageSrc, title, tags }: MilestoneCardProps) {
  return (
    <div
      className="
        group relative w-96 h-72 rounded-2xl bg-white
        outline-[3px] outline-transparent hover:outline-[#FA4616]
        transition-all duration-300
        shadow-sm hover:shadow-lg
        transform
        overflow-hidden
      "
    > {/* Card Container with outline border and shadow */}
      <div className="w-full h-full flex flex-col"> {/* Image */}
        <div className="relative flex-[3] bg-neutral-100">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        <div className="h-[3px] bg-[#0021A5] group-hover:bg-[#FA4616] transition-colors" /> {/* Divider */}

        <div className="flex-[1] flex flex-col justify-center gap-2 px-4 py-3"> {/* Milestone info */}
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