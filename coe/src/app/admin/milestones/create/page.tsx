"use client";

import { useState } from "react";

export default function CreateMilestonePage() {
  const [form, setForm] = useState({
    title: "",
    year: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit() {
    setLoading(true);

    const res = await fetch("/api/milestones", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Milestone created!");
      setForm({ title: "", year: "", description: "" });
    } else {
      alert("Error creating milestone");
    }

    setLoading(false);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create Milestone</h2>

      <div className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={update}
          className="border p-2 w-full"
        />

        <input
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={update}
          className="border p-2 w-full"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={update}
          className="border p-2 w-full"
        />

        <button
          onClick={submit}
          disabled={loading}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? "Submitting..." : "Submit Milestone"}
        </button>
      </div>
    </div>
  );
}
