"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/admin/useToast";
import { Toast } from "@/app/admin/Toast";

export default function EditEventPage() {
  const router = useRouter();
  const { message, showToast } = useToast();

  const [events, setEvents] = useState<any[]>([]);
  const [selected, setSelected] = useState("");
  const [form, setForm] = useState<any>(null);

  const [newImage, setNewImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Load all events
  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => setEvents(data));
  }, []);

  // Load selected event details
  useEffect(() => {
    if (!selected) return;

    fetch(`/api/events/edit/${selected}`)
      .then((r) => r.json())
      .then((data) => setForm(data));
  }, [selected]);

  function update(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function saveChanges() {
    setLoading(true);

    let image_url = form.image_url;

    // Upload new image if provided
    if (newImage) {
      const formData = new FormData();
      formData.append("file", newImage);
      formData.append("kind", "event");

      const upload = await fetch("/api/s3upload", { method: "POST", body: formData });
      const json = await upload.json();

      image_url = json.imageUrl;
    }

    const res = await fetch(`/api/events/edit/${selected}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...form,
        image_url,
      }),
    });

    setLoading(false);

    if (res.ok) {
      showToast("Event updated successfully!");
      setTimeout(() => router.push("/admin"), 800);
    } else {
      showToast("Failed to update event.");
    }
  }

  return (
    <div className="pb-10">

      <h2 className="text-2xl font-bold mb-6">Edit Event</h2>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="border p-2 rounded w-full mb-6"
      >
        <option value="">Select an event</option>

        {events.map((ev) => (
          <option key={ev.event_id} value={ev.event_id}>
            {ev.title} — {ev.event_id}
          </option>
        ))}
      </select>

      {/* Show form only once event is selected */}
      {form && (
        <div className="space-y-4">
          <input
            name="title"
            value={form.title || ""}
            onChange={update}
            className="border p-2 w-full"
          />

          <input
            name="department"
            value={form.department || ""}
            onChange={update}
            className="border p-2 w-full"
          />

          <input
            type="date"
            name="event_date"
            value={form.event_date?.slice(0, 10) || ""}
            onChange={update}
            className="border p-2 w-full"
          />

          <textarea
            name="description"
            value={form.description || ""}
            onChange={update}
            className="border p-2 w-full"
          />

          <input
            name="tags"
            value={form.tags?.join(", ") || ""}
            onChange={(e) =>
              setForm({ ...form, tags: e.target.value.split(",").map((t) => t.trim()) })
            }
            className="border p-2 w-full"
          />

          <select
            name="media_type"
            value={form.media_type || "image"}
            onChange={update}
            className="border p-2 w-full"
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
          </select>

          {/* Current image preview */}
          {form.image_url && (
            <img
              src={form.image_url}
              alt="event"
              className="w-40 rounded border"
            />
          )}

          <input
            type="file"
            onChange={(e) => setNewImage(e.target.files?.[0] ?? null)}
          />

          <button
            onClick={saveChanges}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}

      {message && <Toast message={message} />}
    </div>
  );
}
