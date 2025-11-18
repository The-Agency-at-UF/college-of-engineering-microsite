"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "@/app/admin/Toast";
import { useToast } from "@/app/admin/useToast";

export default function DeleteMilestonePage() {
  const router = useRouter();
  const { message, showToast } = useToast(); 

  const [milestones, setMilestones] = useState<any[]>([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  // Load all milestones
  useEffect(() => {
    fetch("/api/milestones")
      .then((r) => r.json())
      .then((data) => setMilestones(data));
  }, []);

  async function deleteMilestone() {
    if (!selected) {
      showToast("Please select a milestone");
      return;
    }

    setLoading(true);

    const res = await fetch(`/api/milestones/${selected}`, {
      method: "DELETE",
    });

    setLoading(false);

    if (res.ok) {
      showToast("Milestone deleted successfully!");
      setTimeout(() => router.push("/admin"), 800);
    } else {
      showToast("Error deleting milestone");
    }
  }

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">Delete Milestone</h2>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="border p-2 rounded w-full mb-6"
      >
        <option value="">Select a milestone to delete</option>

        {milestones.map((m) => (
          <option key={m.milestone_id} value={m.milestone_id}>
            {m.title} — {m.milestone_id}
          </option>
        ))}
      </select>

      <button
        disabled={loading}
        onClick={deleteMilestone}
        className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        {loading ? "Deleting..." : "Delete Milestone"}
      </button>

      {/* Toast */}
      {message && <Toast message={message} />}
    </div>
  );
}
