"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen px-4">
      <button
        onClick={() => signIn("google", { callbackUrl: "/admin" })}
        className="
          px-6 py-3 
          bg-blue-600 
          text-white 
          rounded-md 
          shadow-md
          transition-all
          hover:bg-blue-700
          hover:shadow-lg
          active:scale-95
        "
      >
        Sign in with Google
      </button>
    </div>
  );
}

