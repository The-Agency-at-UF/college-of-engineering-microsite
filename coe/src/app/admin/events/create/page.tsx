"use client";

import { useState } from "react";

export default function CreateEventPage() {
  const [form, setForm] = useState({
    title: "",
    department: "",
    year: "",
    themes: "",
    mediaFormats: "",
    description: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit() {
    setLoading(true);

    // 1. Ask backend for presigned URL
    let uploadedImageUrl = null;

    if (image) {
      const presignRes = await fetch("/api/presign", {
        method: "POST",
        body: JSON.stringify({ fileName: image.name, fileType: image.type }),
      });

      const { uploadUrl, finalUrl } = await presignRes.json();

      // Upload to S3
      await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": image.type },
        body: image,
      });

      uploadedImageUrl = finalUrl;
    }

    // 2. Send event data to AWS backend
    const awsRes = await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        themes: form.themes.split(",").map(t => t.trim()),
        mediaFormats: form.mediaFormats.split(",").map(t => t.trim()),
        image: uploadedImageUrl,
      }),
    });

    if (awsRes.ok) {
      alert("Event created successfully!");
      setForm({
        title: "",
        department: "",
        year: "",
        themes: "",
        mediaFormats: "",
        description: "",
      });
      setImage(null);
    } else {
      alert("Error creating event");
    }

    setLoading(false);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>

      <div className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          className="border p-2 w-full"
          value={form.title}
          onChange={update}
        />

        <input
          name="department"
          placeholder="Department"
          className="border p-2 w-full"
          value={form.department}
          onChange={update}
        />

        <input
          name="year"
          placeholder="Year"
          className="border p-2 w-full"
          value={form.year}
          onChange={update}
        />

        <input
          name="themes"
          placeholder="Themes (comma separated)"
          className="border p-2 w-full"
          value={form.themes}
          onChange={update}
        />

        <input
          name="mediaFormats"
          placeholder="Media formats (comma separated)"
          className="border p-2 w-full"
          value={form.mediaFormats}
          onChange={update}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 w-full"
          value={form.description}
          onChange={update}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit Event"}
        </button>
      </div>
    </div>
  );
}
