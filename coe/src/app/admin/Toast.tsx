"use client";

export function Toast({ message }: { message: string }) {
  return (
    <div
      className="
        fixed bottom-6 right-6
        bg-[#0021A5] text-white
        px-5 py-3 rounded-lg shadow-lg
        text-sm font-semibold
        animate-toast-slide-in
        z-50
      "
    >
      {message}
    </div>
  );
}
