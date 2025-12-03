"use client";

import React, { useEffect, useState } from "react";
import MilestoneCard from "./MilestoneComponent"; // adjust path if needed

const MilestoneGridComponent = () => {
  const [allMilestones, setAllMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const res = await fetch("/api/milestones");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        // Handle both direct array and wrapper object responses
        let milestonesArray;
        if (Array.isArray(data)) {
          milestonesArray = data;
        } else if (data.milestones && Array.isArray(data.milestones)) {
          milestonesArray = data.milestones;
        } else {
          console.warn("API returned unexpected data format:", data);
          milestonesArray = [];
        }
        
        setAllMilestones(milestonesArray);
      } catch (error) {
        console.error("❌ Failed to fetch milestones:", error);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
        setAllMilestones([]); // Ensure it's still an array on error
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, []);

  if (loading) {
    return (
      <div className="w-full text-center py-12 text-[#002657] text-lg font-medium">
        Loading milestones...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-12 text-red-600 text-lg font-medium">
        Error loading milestones: {error}
      </div>
    );
  }

  return (
    <section className="w-full py-20 px-8 bg-white">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 place-items-center pt-10">
        {/* Ensure allMilestones is an array before mapping */}
        {Array.isArray(allMilestones) && allMilestones.length > 0 ? (
          allMilestones.map((milestone: any) => (
            <MilestoneCard
              key={milestone.milestone_id || Math.random()}
              id={milestone.milestone_id || String(Math.random())}
              imageSrc={milestone.image_url || "/images/pic1.jpg"}
              title={milestone.title || "Untitled Milestone"}
              tags={milestone.tags || []}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-[#002657] text-lg">
            No milestones available
          </div>
        )}
      </div>
    </section>
  );
};

export default MilestoneGridComponent;
