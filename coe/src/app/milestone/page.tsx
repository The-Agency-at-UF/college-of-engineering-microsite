"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [departmentImages, setDepartmentImages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch department images - must be called before any conditional returns
  useEffect(() => {
    fetch("/api/departments")
      .then((res) => res.json())
      .then((data: string[]) => setDepartmentImages(data))
      .catch(() => setDepartmentImages([]));
  }, []);

  const handleFilterChange = (filterId: string, selectedValues: string[]) => {
    setFilterState(prev => ({
      ...prev,
      [filterId]: selectedValues
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleDepartmentClick = (department: string) => {
    setSelectedDepartment(department);
    setCurrentPage(1); // Reset to first page when department changes
  };

  // Define how to filter milestones based on selected filters AND department
  const filterMilestones = (milestone: Milestone, filters: FilterState): boolean => {
    // First check department filter
    if (selectedDepartment && milestone.department?.toUpperCase() !== selectedDepartment) {
      return false;
    }

    // If no other filters selected, show all milestones (filtered by department if selected)
    if (Object.keys(filters).length === 0) return true;

    // Check themes filter
    if (filters.themes && filters.themes.length > 0) {
      const hasMatchingTheme = milestone.themes?.some(theme => 
        filters.themes.includes(theme)
      );
      if (!hasMatchingTheme) return false;
    }

    // Check media formats filter - use media_type field which is what's actually stored
    if (filters.mediaFormats && filters.mediaFormats.length > 0) {
      // Check both media_type (actual API field) and media_format (legacy/mock field) for compatibility
      const milestoneMediaType = (milestone.media_type || (milestone as any).media_format || "image")?.toLowerCase();
      const matchingFilter = filters.mediaFormats.some(filterValue => 
        filterValue.toLowerCase() === milestoneMediaType
      );
      if (!matchingFilter) {
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

  // Match department names to images, with placeholder fallback
  const getDeptImage = (dept: string, index: number) => {
    // First try to find the actual department image
    const deptImage = departmentImages.find((img) => {
      // Extract filename from path and normalize
      const filename = img.split('/').pop()?.toLowerCase().replace(/\s/g, "").replace(/\.(jpg|jpeg|png|gif)$/i, "") || "";
      const deptNormalized = dept.toLowerCase().replace(/\s/g, "");
      return filename.includes(deptNormalized) || deptNormalized.includes(filename);
    });
    
    // If found, return it; otherwise use a placeholder
    if (deptImage) {
      return deptImage;
    }
    
    // Use placeholder images (pic1-pic7) cycling through them
    const placeholderIndex = (index % 7) + 1;
    return `/images/pic${placeholderIndex}.jpg`;
  };



  return (
    <main className="min-h-screen flex flex-col bg-white">
      <NavBar />

      {/* Browse over a century banner */}
      <section className="relative flex justify-start mt-10">
        <div className="bg-[#0021A5] text-white text-4xl font-bold py-6 px-12 pr-8 rounded-r-[50px] shadow-md">
          Browse Over a Century of Innovation
        </div>
      </section>

      {/* Department Carousel - Now clickable for filtering */}
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

        {/* Clear Filter Button */}
        {selectedDepartment && (
          <div className="absolute left-8 -top-6 z-20">
            <button
              onClick={() => setSelectedDepartment(null)}
              className="bg-[#FA4616] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#e63e0f] transition-colors"
            >
              Show All Departments
            </button>
          </div>
        )}

        {/* Scrollable Department Row - Now clickable */}
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
          {["ECE", "CHEM", "ABE", "MAE", "MSE", "NE", "ISE", "CISE", "BME", "ESSIE", "EED"].map((dept, idx) => {
            const imagePath = getDeptImage(dept, idx);
            return (
              <button
                key={idx}
                onClick={() => handleDepartmentClick(dept)}
                className={`relative flex-shrink-0 w-80 h-50 rounded-xl cursor-pointer overflow-hidden transition ${
                  selectedDepartment === dept
                    ? 'ring-4 ring-[#FA4616] shadow-lg' 
                    : 'hover:ring-2 hover:ring-[#002657]'
                }`}
              >
                {/* Image */}
                <Image
                  src={imagePath}
                  alt={dept}
                  fill
                  className="object-cover z-0"
                  sizes="(max-width: 768px) 100vw, 20vw"
                  onError={(e) => (e.target as HTMLImageElement).style.display = "none"}
                />
                {/* Overlay */}
                <div className={`absolute inset-0 z-10 ${
                  selectedDepartment === dept
                    ? 'bg-[rgba(250,70,22,0.7)]' 
                    : 'bg-[rgba(0,38,87,0.7)]'
                }`} />
                {/* Text */}
                <span className="absolute inset-0 z-20 flex items-center justify-center text-white text-6xl italic">
                  {dept}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Selected Department Indicator */}
      {selectedDepartment && (
        <section className="px-8 mt-4">
          <div className="text-center">
            <span className="text-[#002657] text-lg font-medium">
              Showing milestones from: <span className="font-bold text-[#FA4616]">{selectedDepartment}</span>
            </span>
          </div>
        </section>
      )}

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
          filterControlsClassName="flex gap-4 mb-6 justify-end"
        >
          {(filteredMilestones) => {
            // Calculate pagination
            const totalPages = Math.ceil(filteredMilestones.length / itemsPerPage);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedMilestones = filteredMilestones.slice(startIndex, endIndex);

            const handlePreviousPage = () => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            };

            const handleNextPage = () => {
              if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
              }
            };

            return (
              <>
                <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
                  {paginatedMilestones.length > 0 ? (
                    paginatedMilestones.map((milestone) => {
                      // Check multiple possible field names for media URL (image_url, media_url, video_url)
                      const mediaUrl = milestone.image_url || 
                                       (milestone as any).media_url || 
                                       (milestone as any).video_url || 
                                       "/images/pic1.jpg";
                      
                      return (
                        <MilestoneCard
                          key={milestone.milestone_id || Math.random()}
                          id={milestone.milestone_id || String(Math.random())}
                          imageSrc={mediaUrl}
                          title={milestone.title}
                          tags={milestone.themes || []}
                          description={milestone.description}
                          media_type={(milestone.media_type || (milestone as any).media_format || "image")}
                        />
                      );
                    })
                  ) : (
                    <div className="col-span-full text-center py-12 text-[#002657] text-lg">
                      {selectedDepartment ? 
                        `No milestones found for ${selectedDepartment} ${Object.keys(filterState).length > 0 ? 'matching the selected filters' : ''}` :
                        'No milestones found matching the selected filters'
                      }
                    </div>
                  )}
                </div>

                {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-12">

                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-md bg-[#002657] text-white disabled:opacity-40"
                      >
                        ←
                      </button>

                      {/* Page Dropdown */}
                      <div className="flex items-center gap-2">
                        <span className="text-[#002657] font-medium">Page</span>
                        <select
                          value={currentPage}
                          onChange={(e) => setCurrentPage(Number(e.target.value))}
                          className="px-3 py-2 border border-gray-300 rounded-md text-[#002657] font-medium focus:outline-none focus:ring-2 focus:ring-[#FA4616]"
                        >
                          {Array.from({ length: totalPages }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                        <span className="text-[#002657] font-medium">of {totalPages}</span>
                      </div>

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-md bg-[#002657] text-white disabled:opacity-40"
                      >
                        →
                      </button>

                    </div>
                  )}
              </>
            );
          }}
        </FilterSystem>
      </section>

      <Footer />
    </main>
  );
}
