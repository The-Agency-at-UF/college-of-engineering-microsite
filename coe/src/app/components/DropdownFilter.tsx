import React, { useState } from "react";

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface FilterConfig {
  id: string;
  label: string;
  options: FilterOption[];
  multiSelect?: boolean;
}

interface DropdownFilterProps {
  config: FilterConfig;
  selectedValues: string[];
  onSelectionChange: (filterId: string, selectedValues: string[]) => void;
  className?: string;
}

export const DropdownFilter: React.FC<DropdownFilterProps> = ({
  config,
  selectedValues,
  onSelectionChange,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (optionValue: string) => {
    if (config.multiSelect) {
      const newSelection = selectedValues.includes(optionValue)
        ? selectedValues.filter(val => val !== optionValue)
        : [...selectedValues, optionValue];
      onSelectionChange(config.id, newSelection);
    } else {
      onSelectionChange(config.id, [optionValue]);
      setIsOpen(false);
    }
  };

  const selectAll = () => {
    const allValues = config.options.map(option => option.value);
    onSelectionChange(config.id, allValues);
  };

  const deselectAll = () => {
    onSelectionChange(config.id, []);
  };

  const applyFilters = () => {
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#0021A5] text-white px-6 py-2 rounded-full flex items-center gap-2 font-medium hover:bg-[#001a85] transition-colors"
      >
        {config.label}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[280px] max-w-[400px]">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="text-sm font-medium text-gray-700 mb-3">Select Topics</div>
              
              {/* Options Grid */}
              <div className="grid grid-cols-3 gap-2">
                {config.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => toggleOption(option.value)}
                    className={`px-3 py-2 text-sm rounded transition-colors ${
                      selectedValues.includes(option.value)
                        ? 'bg-[#0021A5] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 flex justify-between items-center">
              <div className="flex gap-3">
                <button
                  onClick={selectAll}
                  className="text-[#0021A5] text-sm hover:underline"
                >
                  Select All
                </button>
                <button
                  onClick={deselectAll}
                  className="text-[#0021A5] text-sm hover:underline"
                >
                  Deselect All
                </button>
              </div>
              
              <button
                onClick={applyFilters}
                className="bg-[#0021A5] text-white px-4 py-2 rounded text-sm hover:bg-[#001a85] transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};