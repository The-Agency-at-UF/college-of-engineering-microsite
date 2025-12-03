import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]; // copy to avoid mutating original
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function GET() {
  const galleryPath = path.join(process.cwd(), "public/images/gallery");

  const files = fs.readdirSync(galleryPath);

  const urls = files
    .filter((file) => /\.(png|jpe?g|gif|webp)$/i.test(file))
    .map((file) => `/images/gallery/${file}`);

  const shuffledUrls = shuffleArray(urls);

  return NextResponse.json(shuffledUrls);
}
