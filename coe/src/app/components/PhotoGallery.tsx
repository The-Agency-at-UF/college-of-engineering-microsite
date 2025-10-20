"use client";
import React from "react";

export default function PhotoGallery() {
  // 2 arrays representing the photo columns
  // TO DO: replace with the real images later
  const column1 = ["1","2","3","4"];
  const coloumn2 = ["5","6","7"];
  // Defines column component that takes array items, and the globals.css speedClass
  const Column = ({ items, speedClass }: { items: string[]; speedClass: string }) => (
    // Column divs, creating infinite scroll effect with duplicated items array
    <div className="flex-1 overflow-hidden">
      <div className={`flex flex-col gap-[1px] ${speedClass}`}>
        {[...items, ...items, ...items].map((label, i) => (
          <div
            key={i}
            className="aspect-[4/3] bg-gray-200 flex items-center justify-center text-black text-sm">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
  // Section is the photo gallery frame, inner div is the flex container for photo columns
  // Renders the columns with different speeds
  return (
    <section className="w-full h-full overflow-hidden">
      <div className="flex gap-[1px] w-full h-full">
        <Column items={column1} speedClass="animate-scroll-slow" />
        <Column items={coloumn2} speedClass="animate-scroll-fast" />
      </div>
    </section>
  );
}