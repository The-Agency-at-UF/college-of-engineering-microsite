"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import MilestoneGridComponent from "../components/MilestoneGridComponent";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function MilestonePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [departmentImages, setDepartmentImages] = useState<string[]>([]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 250, behavior: "smooth" });
  };
  

  const departments = [
    "AG BIO",
    "BME",
    "CHEM",
    "CISE",
    "EEE",
    "MSE",
    "PHY",
    "ABE",
  ];

  // Fetch department images
  useEffect(() => {
    fetch("/api/departments")
      .then((res) => res.json())
      .then((data: string[]) => setDepartmentImages(data))
      .catch(() => setDepartmentImages([]));
  }, []);

  // Match department names to images
  const getDeptImage = (dept: string) => {
  return departmentImages.find((img) =>
    img.toLowerCase().replace(/\s/g, "") // remove spaces
       .includes(dept.toLowerCase().replace(/\s/g, ""))
  ) || null;
};



  return (
    <main className="min-h-screen flex flex-col bg-white">
      <NavBar />

      {/* Browse over a century banner */}
      <section className="relative flex justify-start mt-10">
        <div
          className="
            bg-[#0021A5] text-white text-4xl font-bold 
            py-6 px-12 pr-8 rounded-r-[50px]
            shadow-md
          "
        >
          Browse Over a Century of Innovation
        </div>
      </section>

      {/* Department Carousel */}
      <section className="relative mt-10">
        {/* Arrows */}
          <div className="absolute right-8 -top-6 flex gap-6 z-20">
            <button
              onClick={scrollLeft}
              className="p-1 hover:scale-110 transition group"
            >
              <svg className="scale-150" width="38" height="28" viewBox="0 0 40 24" fill="none">
                <path d="M38 12H4" stroke="#0021A5" strokeWidth="2.2" strokeLinecap="round"
                  className="group-hover:stroke-[#001a82]" />
                <path d="M10 6L4 12L10 18" stroke="#0021A5" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="group-hover:stroke-[#001a82]" />
              </svg>
            </button>

            <button
              onClick={scrollRight}
              className="p-1 hover:scale-110 transition group"
            >
              <svg className="scale-150" width="38" height="28" viewBox="0 0 40 24" fill="none">
                <path d="M2 12H36" stroke="#0021A5" strokeWidth="2.2" strokeLinecap="round"
                  className="group-hover:stroke-[#001a82]" />
                <path d="M30 6L36 12L30 18" stroke="#0021A5" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="group-hover:stroke-[#001a82]" />
              </svg>
            </button>
          </div>

        {/* Scroll Row */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 py-4 no-scrollbar scroll-smooth px-8" 
          onWheel={(e) => { // scrolling on Chrome is jittery but on firefox its smooth, might be scroll-smooth issue
            e.preventDefault(); // Prevent vertical page scroll while over carousel
            if (scrollRef.current) {
              scrollRef.current.scrollLeft += e.deltaY * 3; // Adjust scroll speed
            }
          }}
        >
        {departments.map((dept, idx) => {
            const imagePath = getDeptImage(dept);

            return (
              <div
                key={idx}
                className="relative flex-shrink-0 w-80 h-50 rounded-xl cursor-pointer overflow-hidden"
              >
                
                {/* Image */}
                {imagePath && (
                  <Image
                    src={imagePath}
                    alt={dept}
                    fill
                    className="object-cover z-0"
                    sizes="(max-width: 768px) 100vw, 20vw"
                    onError={(e) => (e.target as HTMLImageElement).style.display = "none"}
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-[rgba(0,38,87,0.7)] z-10" />
// ...existing code...

                {/* Text */}
                <span className="absolute inset-0 z-20 flex items-center justify-center text-white text-6xl italic">
                  {dept}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Divider */}
      <div className="h-[4px] bg-[#FA4616] mx-8 mt-4 rounded-full" />

      {/* Milestone cards */}
      <section className="items-center justify-center gap-8 py-12">
        <MilestoneGridComponent />
      </section>

      <Footer />
    </main>
  );
}
