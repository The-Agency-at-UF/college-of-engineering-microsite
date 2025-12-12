"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function PhotoGallery() {
  const [images, setImages] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Fetch images from API route
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/carousel");
        const data = await res.json();

        // Handle both array response and object with images array
        if (Array.isArray(data)) {
          setImages(data);
        } else if (data.images && Array.isArray(data.images)) {
          setImages(data.images);
        } else if (data.error) {
          setImages([]);
        } else {
          setImages([]);
        }
      } catch (err) {
        setImages([]);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  if (!loaded) return null;

  // If no images, return a placeholder or empty div
  if (images.length === 0) {
    return (
      <section className="w-full h-full overflow-hidden bg-gray-100 flex items-center justify-center">
        <p className="text-gray-400 text-sm">No images available</p>
      </section>
    );
  }

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
              unoptimized={src.includes('?')} // Disable optimization for presigned URLs with query params
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
