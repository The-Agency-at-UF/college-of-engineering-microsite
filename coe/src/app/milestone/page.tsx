"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import MilestoneCard from "../components/MilestoneComponent";
import { FilterSystem, FilterState } from "../components/FilterSystem";
import { MILESTONE_FILTER_CONFIGS } from "../lib/constants";
import { useMilestones } from "../lib/hooks";
import { Milestone } from "../lib/fakeApiData";

export default function MilestonePage() {
  const { milestones, loading, error } = useMilestones();
  const [filterState, setFilterState] = useState<FilterState>({});

  const handleFilterChange = (filterId: string, selectedValues: string[]) => {
    setFilterState(prev => ({
      ...prev,
      [filterId]: selectedValues
    }));
  };

  // Define how to filter milestones based on selected filters
  const filterMilestones = (milestone: Milestone, filters: FilterState): boolean => {
    // If no filters selected, show all milestones
    if (Object.keys(filters).length === 0) return true;

    // Check themes filter
    if (filters.themes && filters.themes.length > 0) {
      const hasMatchingTheme = milestone.themes?.some(theme => 
        filters.themes.includes(theme)
      );
      if (!hasMatchingTheme) return false;
    }

    // Check media formats filter
    if (filters.mediaFormats && filters.mediaFormats.length > 0) {
      if (!milestone.media_format || !filters.mediaFormats.includes(milestone.media_format)) {
        return false;
      }
    }

    return true;
  };

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col bg-white">
        <NavBar />
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-[#002657] text-lg">Loading milestones...</div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex flex-col bg-white">
        <NavBar />
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-red-600 text-lg">Error: {error}</div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <NavBar />

      {/* Browse over a century banner */}
      <section className="relative flex justify-start mt-10">
        <div className="bg-[#0021A5] text-white text-4xl font-bold py-6 px-12 pr-8 rounded-r-[50px] shadow-md">
          Browse Over a Century of Innovation
        </div>
      </section>

      {/* Department Carousel - Restore full department list with scroll */}
      <section className="relative mt-10">
        {/* Scroll Arrows */}
        <div className="absolute right-8 -top-6 flex gap-6 z-20">
          <button
            onClick={() => {
              const carousel = document.getElementById('dept-carousel');
              carousel?.scrollBy({ left: -250, behavior: "smooth" });
            }}
            className="p-1 hover:scale-110 transition group"
          >
            <svg className="scale-150" width="38" height="28" viewBox="0 0 40 24" fill="none">
              <path d="M38 12H4" stroke="#0021A5" strokeWidth="2.2" strokeLinecap="round"
                className="group-hover:stroke-[#001a82]" />
              <path d="M10 6L4 12L10 18" stroke="#0021A5" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round"
                className="group-hover:stroke-[#001a82]" />
            </svg>
          </button>

          <button
            onClick={() => {
              const carousel = document.getElementById('dept-carousel');
              carousel?.scrollBy({ left: 250, behavior: "smooth" });
            }}
            className="p-1 hover:scale-110 transition group"
          >
            <svg className="scale-150" width="38" height="28" viewBox="0 0 40 24" fill="none">
              <path d="M2 12H36" stroke="#0021A5" strokeWidth="2.2" strokeLinecap="round"
                className="group-hover:stroke-[#001a82]" />
              <path d="M30 6L36 12L30 18" stroke="#0021A5" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round"
                className="group-hover:stroke-[#001a82]" />
            </svg>
          </button>
        </div>

        {/* Scrollable Department Row */}
        <div
          id="dept-carousel"
          className="flex overflow-x-auto gap-6 py-4 no-scrollbar scroll-smooth px-8" 
          onWheel={(e) => {
            e.preventDefault();
            const carousel = document.getElementById('dept-carousel');
            if (carousel) {
              carousel.scrollLeft += e.deltaY * 3;
            }
          }}
        >
          {["AG BIO", "BME", "CHEM", "CISE", "CIVIL", "EEE", "ESE", "ISE", "MAE", "MSE", "PHY", "ABE"].map((dept, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-80 h-50 bg-[#002657B2] bg-opacity-70 text-white text-6xl italic flex items-center justify-center rounded-xl cursor-pointer hover:bg-[#002657] transition"
            >
              {dept}
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-[4px] bg-[#FA4616] mx-8 mt-4 rounded-full" />

      {/* Filtering System with Milestone Grid */}
      <section className="w-full py-20 px-8 bg-white">
        <FilterSystem
          items={milestones}
          filterConfigs={MILESTONE_FILTER_CONFIGS}
          filterState={filterState}
          onFilterChange={handleFilterChange}
          filterFunction={filterMilestones}
        >
          {(filteredMilestones) => (
            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
              {filteredMilestones.length > 0 ? (
                filteredMilestones.map((milestone) => (
                  <MilestoneCard
                    key={milestone.milestone_id}
                    imageSrc={milestone.image_url || "/images/pic1.jpg"}
                    title={milestone.title}
                    tags={milestone.themes || []}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-[#002657] text-lg">
                  No milestones found matching the selected filters
                </div>
              )}
            </div>
          )}
        </FilterSystem>
      </section>

      <Footer />
    </main>
  );
}
