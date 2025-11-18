"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BackButton() {
  const pathname = usePathname();

  // Hide on root admin page ONLY
  if (pathname === "/admin") return null;

  return (
    <Link
      href="/admin"
      className="
        inline-block mb-6 px-4 py-2 rounded 
        bg-gray-200 text-gray-800 
        hover:bg-gray-300 transition
      "
    >
      ← Back to Admin Dashboard
    </Link>
  );
}
