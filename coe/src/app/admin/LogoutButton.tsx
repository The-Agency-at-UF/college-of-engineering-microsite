"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="bg-[#bdd9e4] text-black font-bold px-6 py-2 rounded-full shadow hover:bg-[#5e8892] transition"
    >
      Logout
    </button>
  );
}
