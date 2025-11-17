"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "@/app/admin/Toast";
import { useToast } from "@/app/admin/useToast";

export default function CreateMilestonePage() {
  const router = useRouter();
  const { message, showToast } = useToast();

  const [form, setForm] = useState({
    title: "",
    department: "",
    description: "",
    milestone_date: "",
    tags: "",
    media_type: "image",
  });

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  function update(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit() {
    setLoading(true);

    let uploadedImageUrl = null;

    // STEP 1 — Upload file to S3
    if (image) {
      const formData = new FormData();
      formData.append("kind", "milestone");  // IMPORTANT
      formData.append("file", image);

      const uploadRes = await fetch("/api/s3upload", {
        method: "POST",
        body: formData,
      });

      const uploadJson = await uploadRes.json();
      uploadedImageUrl = uploadJson.imageUrl;
    }

    // STEP 2 — Save milestone to DynamoDB
    const awsRes = await fetch("/api/milestones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        department: form.department,
        milestone_date: form.milestone_date,
        image_url: uploadedImageUrl,
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
        media_type: form.media_type
      }),
    });

    setLoading(false);

    if (awsRes.ok) {
      showToast("Milestone created successfully!");
      setTimeout(() => router.push("/admin"), 800);
    } else {
      showToast("Error creating milestone");
    }
  }

  return (
    <div>

      <h2 className="text-2xl font-bold mb-4">Create Milestone</h2>

      <div className="space-y-4">

        <input name="title" onChange={update} className="border p-2 w-full" placeholder="Title" />
        <input name="department" onChange={update} className="border p-2 w-full" placeholder="Department" />
        <input type="date" name="milestone_date" onChange={update} className="border p-2 w-full" />
        <textarea name="description" onChange={update} className="border p-2 w-full" placeholder="Description" />
        <input name="tags" onChange={update} className="border p-2 w-full" placeholder="Tags" />

        <select name="media_type" value={form.media_type} onChange={update} className="border p-2 w-full">
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="pdf">PDF</option>
        </select>

        {/* Upload Button */}
        <div className="flex flex-col">
          <label className="bg-[#0021A5] text-white px-4 py-2 rounded cursor-pointer w-fit hover:bg-[#001d42]">
            Choose File
            <input type="file" className="hidden" onChange={(e) => setImage(e.target.files?.[0] ?? null)} />
          </label>

          {image && (
            <p className="text-sm text-green-700 mt-2">
              Selected file: <span className="font-semibold">{image.name}</span>
            </p>
          )}
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? "Submitting..." : "Submit Milestone"}
        </button>
      </div>

      {message && <Toast message={message} />}
    </div>
  );
}
