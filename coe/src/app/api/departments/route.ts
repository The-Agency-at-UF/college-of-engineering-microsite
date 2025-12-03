import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const dir = path.join(process.cwd(), "public/images/departments");

  const files = fs.readdirSync(dir);

  // Filter image files
  const urls = files
    .filter((f) => /\.(jpg|jpeg|png|gif)$/i.test(f))
    .map((f) => `/images/departments/${f}`);

  return NextResponse.json(urls);
}
