"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/admin/useToast";
import { Toast } from "@/app/admin/Toast";
import Image from "next/image";

interface Event {
  event_id: string;
  title: string;
  description: string;
  event_date: string;
  department: string;
  tags: string[];
  image_url?: string;
  media_type?: string;
}

interface EventForm {
  title: string;
  description: string;
  event_date: string;
  department: string;
  tags: string[];
  image_url?: string;
  media_type?: string;
}

export default function EditEventPage() {
  const router = useRouter();
  const { message, showToast } = useToast();

  const [events, setEvents] = useState<Event[]>([]);
  const [selected, setSelected] = useState("");
  const [form, setForm] = useState<EventForm | null>(null);

  const [newImage, setNewImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Load all events
  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => setEvents(data.events || []));
  }, []);

  // Load selected event details
  useEffect(() => {
    if (!selected) return;

    fetch(`/api/events/edit/${selected}`)
      .then((r) => r.json())
      .then((data) => setForm(data));
  }, [selected]);

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    if (form) {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  }

  async function saveChanges() {
    if (!form) return;
    
    setLoading(true);

    let image_url = form.image_url;

    // Upload new image if provided
    if (newImage) {
      const formData = new FormData();
      formData.append("file", newImage);
      formData.append("kind", "event");

      try {
        const upload = await fetch("/api/s3upload", { method: "POST", body: formData });
        const json = await upload.json();

        if (!upload.ok) {
          showToast(`Upload failed: ${json.error || "Unknown error"}`);
          setLoading(false);
          return;
        }

        image_url = json.imageUrl;
      } catch (error) {
        showToast(`Upload error: ${error instanceof Error ? error.message : "Unknown error"}`);
        setLoading(false);
        return;
      }
    }

    const updateData = {
      ...form,
      image_url,
    };

    try {
      const res = await fetch(`/api/events/edit/${selected}`, {
        method: "PATCH",
        body: JSON.stringify(updateData),
      });

      const resJson = await res.json();

      setLoading(false);

      if (res.ok) {
        showToast("Event updated successfully!");
        setTimeout(() => router.push("/admin"), 800);
      } else {
        showToast(`Failed to update event: ${resJson.error || "Unknown error"}`);
      }
    } catch (error) {
      setLoading(false);
      showToast(`Failed to update event: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  return (
    <div>

      <h2 className="text-2xl text-[#002657] font-bold mb-4">Edit Event</h2>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="border p-2 rounded w-full mb-6 text-[#002657]"
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
            placeholder="Title"
            value={form.title || ""}
            onChange={update}
            className="border p-2 w-full text-[#002657] placeholder:text-[#002657]"
          />

          <input
            name="department"
            placeholder="Department"
            value={form.department || ""}
            onChange={update}
            className="border p-2 w-full text-[#002657] placeholder:text-[#002657]"
          />

          <input
            type="date"
            name="event_date"
            value={form.event_date?.slice(0, 10) || ""}
            onChange={update}
            className="border p-2 w-full text-[#002657] placeholder:text-[#002657]"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description || ""}
            onChange={update}
            className="border p-2 w-full text-[#002657] placeholder:text-[#002657]"
          />

          <input
            name="tags"
            placeholder="Tags (comma separated)"
            value={form.tags?.join(", ") || ""}
            onChange={(e) =>
              setForm({ ...form, tags: e.target.value.split(",").map((t) => t.trim()) })
            }
            className="border p-2 w-full text-[#002657] placeholder:text-[#002657]"
          />

          <select
            name="media_type"
            value={form.media_type || "image"}
            onChange={update}
            className="border p-2 w-full text-[#002657]"
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
          </select>

          {/* Current image preview */}
          {form.image_url && (
            <Image
              src={form.image_url}
              alt="event"
              width={160}
              height={160}
              className="w-40 rounded border object-cover"
            />
          )}

          {/* Styled Upload Button + File Name */}
          <div className="flex flex-col">
            <label className="bg-[#0021A5] text-white px-4 py-2 rounded cursor-pointer w-fit hover:bg-[#001d42] transition">
              Choose File
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0] ?? null;
                  setNewImage(selectedFile);
                }}
              />
            </label>

            {newImage && (
              <p className="text-sm text-green-700 mt-2">
                Selected file: <span className="font-semibold">{newImage.name}</span>
              </p>
            )}
          </div>

          <button
            onClick={saveChanges}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}

      {message && <Toast message={message} />}
    </div>
  );
}
