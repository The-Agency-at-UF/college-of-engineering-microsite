"use client";

import { useRef } from "react";
import MilestoneGridComponent from "../components/MilestoneGridComponent";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function MilestonePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

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
          {departments.map((dept, idx) => (
            <div
              key={idx}
              className="
                flex-shrink-0 w-80 h-50
                bg-[#002657B2] bg-opacity-70
                text-white text-6xl italic
                flex items-center justify-center
                rounded-xl cursor-pointer
                hover:bg-[#002657] transition
              "
            >
              {dept}
            </div>
          ))}
        </div>
      </section>

      {/* Divider*/}
      <div className="h-[4px] bg-[#FA4616] mx-8 mt-4 rounded-full" />

      {/* Milestone cards*/}
      <section className="items-center justify-center gap-8 py-12">
       <MilestoneGridComponent />
      </section>

      <Footer />
    </main>
  );
}
