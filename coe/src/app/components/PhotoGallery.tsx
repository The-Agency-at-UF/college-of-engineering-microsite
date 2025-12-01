"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function PhotoGallery() {
  const [images, setImages] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Fetch images from API route
  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setLoaded(true);
      });
  }, []);

  if (!loaded) return null;

  // Split array into 2 columns
  const mid = Math.ceil(images.length / 2);
  const column1 = images.slice(0, mid);
  const column2 = images.slice(mid);

  // Column component
  const Column = ({
    items,
    speedClass,
  }: {
    items: string[];
    speedClass: string;
  }) => (
    <div className="flex-1 overflow-hidden">
      <div className={`flex flex-col ${speedClass}`}>
        {[...items, ...items, ...items].map((src, i) => (
          <div key={i} className="aspect-[4/3] relative">
            <Image
              src={src}
              alt={`Gallery image ${i}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );

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
