"use client";
import React from "react";
import Image from "next/image";

export default function PhotoGallery() {
  // 2 arrays representing the photo columns
  // TO DO: replace with the ACTUAL images later (these are the ones from the landing page)
  const column1 = ["/images/pic1.jpg", "/images/pic2.jpg", "/images/pic3.jpg", "/images/pic4.jpg"];
  const column2 = ["/images/pic5.jpg", "/images/pic6.jpg", "/images/pic7.jpg"];
  // Defines column component that takes array items, and the globals.css speedClass
  const Column = ({ items, speedClass }: { items: string[]; speedClass: string }) => (
    // Column divs, creating infinite scroll effect with duplicated items array
    <div className="flex-1 overflow-hidden">
      <div className={`flex flex-col ${speedClass}`}>
        {[...items, ...items, ...items].map((src, i) => (
          <div key={i} className="aspect-[4/3] relative">
        <Image
          src={src}
          alt={`Gallery image ${i + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={i < 4}
        />
          </div>
        ))}
      </div>
    </div>
  );
  // Section is the photo gallery frame, inner div is the flex container for photo columns
  // Renders the columns with different speeds
  return (
    <section className="w-full h-full overflow-hidden">
      <div className="flex w-full h-full">
        <Column items={column1} speedClass="animate-scroll" />
        <div className="hidden lg:block flex-1">
          <Column items={column2} speedClass="animate-scroll-delay" />
        </div>
      </div>
    </section>
  );
}