"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Anybody } from "next/font/google";

//custom "anybody" fonts
const anybodySubtitle = Anybody({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
});

const anybodyHeadline = Anybody({
  subsets: ["latin"],
  weight: ["900"],
  style: ["italic"],
});

//Milestone type definition
interface Milestone {
  milestone_id: string;
  title: string;
  description: string;
  department?: string;
  milestone_date?: string;
  image_url?: string;
  media_url?: string;
  video_url?: string;
  tags?: string[];
  media_type?: string;
}

export default function MilestoneDetailPage() {
  const { milestoneID } = useParams() as { milestoneID: string };
  const router = useRouter();

  //Stores the selected current milestone
  const [current, setCurrent] = useState<Milestone | null>(null);

  //Loading state for when the page is loading (could change to a loading symbol later)
  const [loading, setLoading] = useState(true);

  //Fetch milestones on mount or when ID changes
  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const res = await fetch("/api/milestones");
        const response = await res.json();
        // API returns { milestones: [...], total, offset, limit, hasMore }
        const milestones: Milestone[] = response.milestones || response || [];
        const found = milestones.find((m) => m.milestone_id === milestoneID) || null;
        setCurrent(found);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchMilestones();
  }, [milestoneID]);

  //Page when loading interface
  if (loading) {
    return (
      <main className="min-h-screen flex flex-col bg-[#002657] text-white">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[clamp(14px,2vw,18px)]">
            Loading milestone…
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  //If no milestone is found, default page
  if (!current) {
    return (
      <main className="min-h-screen flex flex-col bg-[#002657] text-white">
        <NavBar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-[clamp(14px,2vw,20px)] font-semibold">Milestone not found.</p>
          <button onClick={() => router.push("/milestone")} 
            className="px-4 py-2 rounded-full bg-white 
              text-[#002657] font-semibold cursor-pointer">
            Back to milestones
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  //Converts description text into separate paragraph blocks
  const paragraphs =
    current.description?.split(/\n{2,}/).filter((p) => p.trim().length > 0) ||
    [current.description];

  //Splits headline into 2 lines
  const titleWords = current.title.trim().split(/\s+/);
  let firstLine = current.title;
  let secondLine = "";

  if (titleWords.length > 2) {
    firstLine = titleWords.slice(0, titleWords.length - 2).join(" ");
    secondLine = titleWords.slice(titleWords.length - 2).join(" ");
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#002657] text-white">
      <NavBar />

      {/* Blue milestone detail area */}
      <section className="flex-1 w-full bg-[#002657]">
        {/* Global layout */}
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-16">
          {/* Subtitle */}
          <p className={`${anybodySubtitle.className} text-white mb-[clamp(8px,2vw,24px)] 
            text-[clamp(10px,1.5vw,16px)] italic font-medium leading-none`}>
            Library / Milestones Details
          </p>

          {/* Back arrow */}
          <button onClick={() => router.back()} className="inline-flex items-center 
            justify-center mb-6 cursor-pointer -ml-2 sm:-ml-3" 
            aria-label="Go back">
            <svg
              width="45"
              height="45"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[clamp(15px,2vw,45px)] h-auto text-white"
            >
              <path
                d="M27.5 12.5L17.5 22.5L27.5 32.5"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Page Title Area */}
          <div className="mb-[clamp(12px,2vw,28px)]">
            {/* Row: First line of title + horizontal gradient bar */}
            <div className="flex items-center">
              <h1 className={`${anybodyHeadline.className} text-white italic font-[900] leading-[1] 
                text-[clamp(32px,5vw,78px)] mr-[clamp(8px,1.5vw,24px)]`}>
                {firstLine}
              </h1>

              <div className="flex-1 h-[3px] bg-gradient-to-r from-[#F2A900] to-[#774219] -mr-[11vw]" />
            </div>

            {/* Second line of the title */}
            {secondLine && (
              <h1 className={`${anybodyHeadline.className} text-white italic font-[900] leading-[1] 
                text-[clamp(32px,5vw,78px)] mt-[clamp(4px,0.8vw,10px)]`}>
                {secondLine}
              </h1>
            )}
          </div>

          {/* Grid content below */}
          <div className="grid gap-6 sm:gap-8 md:gap-12 lg:gap-24 xl:gap-48 
            md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-stretch">

            {/* LEFT column */}
            <div className="md:flex md:flex-col md:justify-between md:h-full">
              {/* Top content */}
              <div className="space-y-6">
                {/* Orange Dept. Oval */}
                {current.department && (
                  <span className="inline-flex items-center justify-center 
                    bg-[#FA4616] text-white uppercase font-bold 
                    h-[clamp(20px,2.8vw,44px)] px-[clamp(10px,4vw,70px)] 
                    rounded-full text-[clamp(10px,1.2vw,14px)]">
                    {current.department}
                  </span>
                )}

                {/* Paragraphs */}
                <div className="space-y-3 max-w-xl">
                  {paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-[#E5E7EB] leading-relaxed 
                        text-[clamp(12px,1.5vw,18px)]"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* Small screens: line under text */}
                <div className="mt-[clamp(16px,3vw,32px)] h-[3px] 
                  bg-gradient-to-r from-[#F2A900] to-[#774219] md:hidden" />
              </div>

              {/* Desktop: gradient at bottom aligned with image bottom */}
              <div className="hidden md:block h-[3px] 
                bg-gradient-to-r from-[#F2A900] to-[#774219] -ml-[11vw]" />
            </div>

            {/* RIGHT column: media (image or video) */}
            <div className="relative w-full max-w-[clamp(220px,70vw,420px)] 
              aspect-[4/3] mx-auto md:mx-0 overflow-hidden bg-[#D1D5DB]">
              {(() => {
                // Check multiple possible field names for media URL (image_url, media_url, video_url)
                const mediaUrl = current.image_url || 
                                 current.media_url || 
                                 current.video_url || 
                                 (current.media_type === "video" ? "" : "/images/pic1.jpg");
                
                return current.media_type === "video" ? (
                  <video
                    src={mediaUrl}
                    controls
                    className="w-full h-full object-cover"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={mediaUrl}
                    alt={current.title}
                    fill
                    className="object-cover"
                  />
                );
              })()}
            </div>
          </div>
        </div> 

        
      </section>

      <Footer />
    </main>
  );
}




