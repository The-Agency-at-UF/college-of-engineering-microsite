"use client";

import { useState, useEffect } from "react";

export function useToast() {
  const [message, setMessage] = useState("");

  function showToast(msg: string) {
    setMessage(msg);

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  return {
    message,
    showToast,
  };
}