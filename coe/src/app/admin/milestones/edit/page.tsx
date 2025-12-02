"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/admin/useToast";
import { Toast } from "@/app/admin/Toast";

export default function EditMilestonePage() {
  const router = useRouter();
  const { message, showToast } = useToast();

  const [milestones, setMilestones] = useState<any[]>([]);
  const [selected, setSelected] = useState("");
  const [form, setForm] = useState<any>(null);

  const [newImage, setNewImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Load all milestones
  useEffect(() => {
    fetch("/api/milestones")
      .then((r) => r.json())
      .then((data) => setMilestones(data));
  }, []);

  // Load selected milestone
  useEffect(() => {
    if (!selected) return;

    fetch(`/api/milestones/edit/${selected}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          ...data,
          tags: Array.isArray(data.tags)
            ? data.tags.join(", ")
            : data.tags ?? "",
        });
      });
  }, [selected]);

  function update(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function saveChanges() {
    setLoading(true);

    let image_url = form.image_url;

    // Upload new image if chosen
    if (newImage) {
      const formData = new FormData();
      formData.append("file", newImage);
      formData.append("kind", "milestone");

      const upload = await fetch("/api/s3upload", { method: "POST", body: formData });
      const json = await upload.json();
      image_url = json.imageUrl;
    }

    const res = await fetch(`/api/milestones/edit/${selected}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...form,
        image_url,
        tags: form.tags
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean),
      }),
    });

    setLoading(false);

    if (res.ok) {
      showToast("Milestone updated successfully!");
      setTimeout(() => router.push("/admin"), 800);
    } else {
      showToast("Failed to update milestone.");
    }
  }

  return (
    <div className="pb-10">

      <h2 className="text-2xl font-bold mb-6">Edit Milestone</h2>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="border p-2 rounded w-full mb-6"
      >
        <option value="">Select a milestone</option>

        {milestones.map((m) => (
          <option key={m.milestone_id} value={m.milestone_id}>
            {m.title} — {m.milestone_id}
          </option>
        ))}
      </select>

      {/* Show form once milestone loaded */}
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
            name="milestone_date"
            value={form.milestone_date?.slice(0, 10) || ""}
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
            value={form.tags || ""}
            onChange={update}
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

          {/* Current image */}
          {form.image_url && (
            <img
              src={form.image_url}
              alt="milestone"
              className="w-40 rounded border"
            />
          )}

          {/* Upload replacement */}
          <input
            type="file"
            onChange={(e) => setNewImage(e.target.files?.[0] ?? null)}
          />

          {newImage && (
            <p className="text-sm text-green-700 mt-1">
              Selected new file:{" "}
              <span className="font-semibold">{newImage.name}</span>
            </p>
          )}

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

