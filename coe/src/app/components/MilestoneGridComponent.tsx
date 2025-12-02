"use client";

import React, { useEffect, useState } from "react";
import MilestoneCard from "./MilestoneComponent"; // adjust path if needed

const MilestoneGridComponent = () => {
  const [allMilestones, setAllMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const res = await fetch("/api/milestones");
        const data = await res.json();
        setAllMilestones(data || []);
      } catch (error) {
        console.error("❌ Failed to fetch milestones:", error);
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

  return (
    <section className="w-full py-20 px-8 bg-white">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 place-items-center pt-10">
        {allMilestones.map((milestone: any) => (
          <MilestoneCard
            key={milestone.milestone_id}
            id={milestone.milestone_id}
            imageSrc={milestone.image_url}
            title={milestone.title}
            tags={milestone.tags || []}
            description={milestone.description}
          />
        ))}
      </div>
    </section>
  );
};

export default MilestoneGridComponent;
