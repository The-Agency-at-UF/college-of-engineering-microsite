"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/admin/useToast";
import { Toast } from "@/app/admin/Toast";
import Image from "next/image";

interface Milestone {
  milestone_id: string;
  title: string;
  description?: string;
  image_url?: string;
  milestone_date: string;
  department: string;
  tags?: string[];
  media_type?: string;
}

interface MilestoneForm {
  title: string;
  description?: string;
  image_url?: string;
  milestone_date: string;
  department: string;
  tags?: string | string[];
  media_type?: string;
}

export default function EditMilestonePage() {
  const router = useRouter();
  const { message, showToast } = useToast();

  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [selected, setSelected] = useState("");
  const [form, setForm] = useState<MilestoneForm | null>(null);

  const [newFile, setNewFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Load all milestones
  useEffect(() => {
    fetch("/api/milestones")
      .then((r) => r.json())
      .then((data) => setMilestones(data.milestones || []));
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

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    if (form) {
      setForm({ ...form, [e.target.name]: e.target.value });
      // Clear file when media type changes
      if (e.target.name === "media_type") {
        setNewFile(null);
      }
    }
  }

  // Get accept attribute based on media type
  const getAcceptAttribute = () => {
    if (!form) return "image/*";
    switch (form.media_type) {
      case "video":
        return "video/*";
      case "pdf":
        return "application/pdf";
      case "image":
      default:
        return "image/*";
    }
  };

  async function saveChanges() {
    if (!form) return;
    
    setLoading(true);

    let image_url = form.image_url;

    // Upload new file if chosen
    if (newFile) {
      const formData = new FormData();
      formData.append("file", newFile);
      formData.append("kind", "milestone");

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

    // Handle tags - convert string to array if needed
    const tagsArray = typeof form.tags === "string"
      ? form.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : Array.isArray(form.tags)
      ? form.tags
      : [];

    const updateData = {
      ...form,
      image_url,
      tags: tagsArray,
    };

    try {
      const res = await fetch(`/api/milestones/edit/${selected}`, {
        method: "PATCH",
        body: JSON.stringify(updateData),
      });

      const resJson = await res.json();

      setLoading(false);

      if (res.ok) {
        showToast("Milestone updated successfully!");
        setTimeout(() => router.push("/admin"), 800);
      } else {
        showToast(`Failed to update milestone: ${resJson.error || "Unknown error"}`);
      }
    } catch (error) {
      setLoading(false);
      showToast(`Failed to update milestone: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  return (
    <div>

      <h2 className="text-2xl text-[#002657] font-bold mb-4">Edit Milestone</h2>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="border p-2 rounded w-full mb-6 text-[#002657]"
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
            name="milestone_date"
            value={form.milestone_date?.slice(0, 10) || ""}
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
            value={form.tags || ""}
            onChange={update}
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

          {/* Current media (image or video) */}
          {form.image_url && (
            form.media_type === "video" ? (
              <video
                src={form.image_url}
                controls
                className="w-40 rounded border"
              />
            ) : (
              <Image
                src={form.image_url}
                alt="milestone"
                width={160}
                height={160}
                className="w-40 rounded border object-cover"
              />
            )
          )}

          {/* Styled Upload Button + File Name */}
          <div className="flex flex-col gap-2">
            <label className="bg-[#0021A5] text-white px-4 py-2 rounded cursor-pointer w-fit hover:bg-[#001d42] transition">
              Choose File
              <input
                type="file"
                className="hidden"
                accept={getAcceptAttribute()}
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0] ?? null;
                  setNewFile(selectedFile);
                }}
              />
            </label>

            {newFile && (
              <p className="text-sm text-green-700 mt-2">
                Selected file: <span className="font-semibold">{newFile.name}</span>
              </p>
            )}

            {/* Note about permissions */}
            {form.image_url && (
              <div className="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded p-3">
                <p className="font-semibold text-yellow-800 mb-1">File Access Note:</p>
                <p className="text-yellow-700">
                  If files show &quot;Access Denied&quot;, you need to add a bucket policy in AWS S3 console 
                  to make objects publicly readable. ACLs are disabled on this bucket.
                </p>
              </div>
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

