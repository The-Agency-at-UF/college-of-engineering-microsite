"use client";
import React from "react";
import { Department, COMMON_STYLES } from "../lib/constants";

interface DepartmentFilterProps {
  departments: Department[];
  selectedDepartment: string;
  onDepartmentChange: (departmentId: string) => void;
  title?: string;
  className?: string;
}

const DepartmentFilter: React.FC<DepartmentFilterProps> = ({
  departments,
  selectedDepartment,
  onDepartmentChange,
  title = "Filter by Department",
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-8 mb-12 ${className}`}>
      {/* Title Banner */}
      <div className="bg-[#0021A5] text-white text-center font-bold rounded-full px-16 py-4 text-[clamp(13px,3vw,40px)] w-[min(83%,1200px)]">
        {title}
      </div>

      {/* Department Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 text-white font-bold w-[min(85%,1200px)] gap-y-2">
        {departments.map((dept) => (
          <button
            key={dept.id}
            onClick={() => onDepartmentChange(dept.id)}
            className={`${COMMON_STYLES.button.filter} ${
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

      {/* Active Filter Indicator */}
      {selectedDepartment !== "all" && (
        <div className="text-[#002657] text-lg font-medium">
          Showing results for: <span className="font-bold">{departments.find(d => d.id === selectedDepartment)?.name}</span>
        </div>
      )}
    </div>
  );
};

export default DepartmentFilter;