"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "@/app/admin/Toast";
import { useToast } from "@/app/admin/useToast";

export default function DeleteEventPage() {
  const router = useRouter();
  const { message, showToast } = useToast();

  const [events, setEvents] = useState<any[]>([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  // Load all events on mount
  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => setEvents(data));
  }, []);

  async function deleteEvent() {
    if (!selected) {
      showToast("Please select an event");
      return;
    }

    setLoading(true);

    const res = await fetch(`/api/events/${selected}`, {
      method: "DELETE",
    });

    setLoading(false);

    if (res.ok) {
      showToast("Event deleted successfully!");

      // Delay for toast animation
      setTimeout(() => {
        router.push("/admin");
      }, 800);
    } else {
      showToast("Error deleting event");
    }
  }

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">Delete Event</h2>

      {/* Dropdown */}
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="border p-2 rounded w-full mb-6 text-[#002657]"
      >
        <option value="">Select an event to delete</option>

        {events.map((ev) => (
          <option key={ev.event_id} value={ev.event_id}>
            {ev.title} — {ev.event_id}
          </option>
        ))}
      </select>

      {/* Delete button */}
      <button
        disabled={loading}
        onClick={deleteEvent}
        className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        {loading ? "Deleting..." : "Delete Event"}
      </button>

      {/* Toast */}
      {message && <Toast message={message} />}
    </div>
  );
}
