"use client";
import React, { useState, useEffect, useMemo } from "react";
import EventCardComponent from "./EventCardComponent";

// Define types
interface Milestone {
  milestone_id: string;
  title: string;
  description?: string;
  image_url?: string;
  milestone_date: string;
  department: string;
  tags?: string[];
  created_at: string;
}

interface Department {
  id: string;
  name: string;
  fullName: string;
}

const departments: Department[] = [
  { id: "all", name: "ALL", fullName: "All Departments" },
  { id: "cise", name: "CISE", fullName: "Computer & Information Science & Engineering" },
  { id: "agbio", name: "AG BIO", fullName: "Agricultural & Biological Engineering" },
  { id: "bme", name: "BME", fullName: "Biomedical Engineering" },
  { id: "chem", name: "CHEM", fullName: "Chemical Engineering" },
  { id: "civil", name: "CIVIL", fullName: "Civil & Coastal Engineering" },
  { id: "ese", name: "ESE", fullName: "Environmental & Sustainable Engineering" },
  { id: "ise", name: "ISE", fullName: "Industrial & Systems Engineering" },
  { id: "mse", name: "MSE", fullName: "Materials Science & Engineering" },
  { id: "mae", name: "MAE", fullName: "Mechanical & Aerospace Engineering" },
];

// Mock milestone data for testing
const mockMilestones: Milestone[] = [
  {
    milestone_id: "1",
    title: "First Engineering Building",
    description: "Construction of the first dedicated engineering building at UF.",
    milestone_date: "1925-09-15",
    department: "CIVIL",
    tags: ["infrastructure", "historic"],
    created_at: "2024-01-01"
  },
  {
    milestone_id: "2", 
    title: "Computer Science Department Founded",
    description: "Establishment of the Computer Science department, pioneering computing education.",
    milestone_date: "1968-01-20",
    department: "CISE",
    tags: ["computing", "education"],
    created_at: "2024-01-01"
  },
  {
    milestone_id: "3",
    title: "Biomedical Engineering Program Launch",
    description: "Launch of interdisciplinary biomedical engineering program.",
    milestone_date: "1975-08-30",
    department: "BME",
    tags: ["biomedical", "interdisciplinary"],
    created_at: "2024-01-01"
  },
  {
    milestone_id: "4",
    title: "Chemical Plant Pilot Laboratory",
    description: "Opening of state-of-the-art chemical engineering pilot plant laboratory.",
    milestone_date: "1982-03-12",
    department: "CHEM",
    tags: ["laboratory", "innovation"],
    created_at: "2024-01-01"
  },
  {
    milestone_id: "5",
    title: "Materials Research Institute",
    description: "Founding of the materials science and engineering research institute.",
    milestone_date: "1988-06-05",
    department: "MSE",
    tags: ["research", "materials"],
    created_at: "2024-01-01"
  },
  {
    milestone_id: "6",
    title: "Agricultural Innovation Center",
    description: "Opening of precision agriculture and biological systems research center.",
    milestone_date: "2005-04-18",
    department: "AG BIO",
    tags: ["agriculture", "sustainability"],
    created_at: "2024-01-01"
  },
  {
    milestone_id: "7",
    title: "Aerospace Engineering Lab",
    description: "Launch of advanced aerospace and mechanical engineering laboratory complex.",
    milestone_date: "2012-11-08",
    department: "MAE",
    tags: ["aerospace", "mechanical"],
    created_at: "2024-01-01"
  }
];

const MilestoneGridComponent: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [usingMockData, setUsingMockData] = useState(false);

  // Fetch milestones from API
  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/milestones');
        
        let data = [];
        if (!response.ok) {
          throw new Error('Failed to fetch milestones');
        }
        
        data = await response.json();
        
        // Check if we have real data or need to use mock data
        if (!Array.isArray(data) || data.length === 0) {
          console.log("No milestones from API, using mock data for testing");
          setMilestones(mockMilestones);
          setUsingMockData(true);
        } else {
          // Sort by milestone_date descending (newest first)
          const sortedData = data.sort((a: Milestone, b: Milestone) => {
            return new Date(b.milestone_date).getTime() - new Date(a.milestone_date).getTime();
          });
          setMilestones(sortedData);
          setUsingMockData(false);
        }
      } catch (err) {
        console.error("Failed to fetch milestones:", err);
        console.log("Using mock data for testing");
        setMilestones(mockMilestones);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, []);

  // Filter milestones by department (client-side filtering)
  const filteredMilestones = useMemo(() => {
    if (selectedDepartment === "all") return milestones;
    return milestones.filter(milestone => 
      milestone.department?.toLowerCase() === selectedDepartment.toLowerCase()
    );
  }, [milestones, selectedDepartment]);

  const handleDepartmentChange = (departmentId: string) => {
    setSelectedDepartment(departmentId);
  };

  if (loading) {
    return (
      <section className="w-full py-20 px-8 bg-white">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-[#002657] text-lg">Loading milestones...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-20 px-8 bg-white">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-red-600 text-lg">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 px-8 bg-white">
      {/* Department Filter Section */}
      <div className="flex flex-col items-center justify-center gap-8 mb-12">
        {/* Title Banner */}
        <div className="bg-[#0021A5] text-white text-center font-bold rounded-full px-16 py-4 text-[clamp(13px,3vw,40px)] w-[min(83%,1200px)]">
          Engineering Milestones
        </div>

        {/* Department Filter Buttons - Same UI as events */}
        <div className="flex flex-wrap justify-center gap-3 text-white font-bold w-[min(85%,1200px)] gap-y-2">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => handleDepartmentChange(dept.id)}
              className={`text-[clamp(6px,2vw,16px)] px-[clamp(10px,4vw,80px)] py-[clamp(2px,0.5vw,12px)] rounded-full transition-colors ${
                selectedDepartment === dept.id
                  ? "bg-[#FA4616]"
                  : "bg-[#002657] hover:bg-[#FA4616]"
              }`}
              title={dept.fullName}
            >
              {dept.name}
            </button>
          ))}
        </div>
      </div>

      {/* Milestones Grid */}
      {filteredMilestones.length === 0 ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-[#002657] text-lg">
            No milestones found
            {selectedDepartment !== "all" && (
              <span className="block text-sm mt-2">
                Try selecting a different department or &quot;ALL&quot;
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
          {filteredMilestones.map((milestone) => (
            <EventCardComponent
              key={milestone.milestone_id}
              title={milestone.title}
              dateRange={new Date(milestone.milestone_date).getFullYear().toString()}
              description={milestone.description || "Detailed information about this significant engineering milestone and its impact on the field."}
              sourceLabel={`MORE FROM ${milestone.department?.toUpperCase() || 'ENGINEERING'}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MilestoneGridComponent;