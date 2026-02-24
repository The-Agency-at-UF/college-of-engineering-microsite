"use client";

import React, { useState, useEffect, useRef } from 'react';

// Define Department type locally as it's not in context
interface Department {
  id: string;
  name: string;
  dataValue: string | null;
}

interface DepartmentDropdownProps {
  departments: Department[];
  selectedDepartments: string[];
  onApply: (selected: string[]) => void;
}

export const DepartmentDropdown: React.FC<DepartmentDropdownProps> = ({
  departments,
  selectedDepartments,
  onApply,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // State for pending selections before 'Apply' is clicked
  const [pendingSelection, setPendingSelection] = useState<string[]>(selectedDepartments);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync pending state when prop changes
  useEffect(() => {
    setPendingSelection(selectedDepartments);
  }, [selectedDepartments]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Reset pending selection to the last applied state
        setPendingSelection(selectedDepartments);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedDepartments]);

  const toggleOption = (deptValue: string) => {
    setPendingSelection(prev => 
      prev.includes(deptValue)
        ? prev.filter(v => v !== deptValue)
        : [...prev, deptValue]
    );
  };

  const handleSelectAll = () => {
    // Select all except the 'ALL' meta-department
    const allDeptValues = departments.filter(d => d.dataValue !== null).map(d => d.dataValue as string);
    setPendingSelection(allDeptValues);
  };

  const handleDeselectAll = () => {
    setPendingSelection([]);
  };

  const handleApply = () => {
    onApply(pendingSelection);
    setIsOpen(false);
  };

  // The 'ALL' department button is not rendered inside the dropdown
  const departmentsToRender = departments.filter(d => d.id !== 'all');

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Filter Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#0021A5] text-white rounded-full flex items-center gap-2 font-medium hover:bg-[#001a85] transition-colors justify-center px-[clamp(1.25rem,4vw,1.75rem)] py-[clamp(0.6rem,1.5vw,0.8rem)] text-[clamp(0.875rem,2vw,1rem)] whitespace-nowrap cursor-pointer"
      >
        ALL DEPARTMENTS
        <svg
          className={`transition-transform ${isOpen ? 'rotate-180' : ''} w-4 h-4`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border-2 border-[#0021A5] rounded-lg shadow-lg z-50 w-[clamp(320px,25vw,380px)]">
          {/* Header */}
          <div className="p-4">
            <div className="text-lg font-bold text-[#0021A5] mb-3">Select Departments</div>
            {/* Department Buttons */}
            <div className="grid grid-cols-1 gap-2">
              {departmentsToRender.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => toggleOption(dept.dataValue as string)}
                  className={`h-[clamp(48px,8vw,50px)] leading-tight flex items-center justify-center text-center text-[clamp(14px,3vw,16px)] px-2 py-2 rounded-full transition-colors border-2 cursor-pointer ${
                    pendingSelection.includes(dept.dataValue as string)
                      ? "bg-[#0021A5] text-white border-[#0021A5]"
                      : "bg-white text-[#0021A5] border-[#0021A5] hover:bg-[#0021A5] hover:text-white"
                  }`}
                  title={dept.name}
                >
                  {dept.name}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-[2px] bg-[#0021A5]"></div>

          {/* Footer Actions */}
          <div className="p-4 flex justify-between items-center">
            <div className="flex gap-4">
              <button
                onClick={handleSelectAll}
                className="text-[#0021A5] text-sm font-medium hover:underline cursor-pointer"
              >
                Select All
              </button>
              <button
                onClick={handleDeselectAll}
                className="text-[#0021A5] text-sm font-medium hover:underline cursor-pointer"
              >
                Deselect All
              </button>
            </div>
            
            <button
              onClick={handleApply}
              className="px-8 py-2 rounded-full text-sm font-medium transition-colors bg-white text-[#0021A5] hover:bg-[#0021A5] hover:text-white border-2 border-[#0021A5] cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
