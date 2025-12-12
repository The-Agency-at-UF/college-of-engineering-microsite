"use client";

import Image from "next/image";
import Link from "next/link";

interface MilestoneCardProps {
  id: string;
  imageSrc: string;
  title: string;
  tags: string[];
  description?: string;
  media_type?: string;
}

//truncate function to shorten description text
function truncate(text: string | undefined, maxLength = 150) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

export default function MilestoneCard({ id, imageSrc, title, tags, description, media_type = "image" }: MilestoneCardProps) {
  const isVideo = media_type === "video";
  
  return (
    <Link href={`/milestone/${id}`} className="group block">
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
        <div className="w-full h-full flex flex-col"> {/* Media (Image or Video) */}
          <div className="relative flex-[3] bg-neutral-100 overflow-hidden">
            {isVideo ? (
              <video
                src={imageSrc}
                className="w-full h-full object-cover"
                muted
                playsInline
                preload="metadata"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            ) : (
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="h-[3px] bg-[#0021A5] group-hover:bg-[#FA4616] transition-colors" /> {/* Divider */}

          <div className="flex-[1] flex flex-col justify-center gap-2 px-4 py-3"> {/* Milestone info */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm font-bold text-white rounded-full bg-[#0021A5] uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="font-bold text-[#002657] text-lg uppercase">{title}</h3>
          {/* truncated description */}
          {description && (
              <p className="text-[11px] text-[#333333] leading-[1.1] tracking-tight mb-[6px]">
                {truncate(description)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}