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
  onApply: () => void;
  onCancel: () => void;
  hasPendingChanges: boolean;
  className?: string;
}

export const DropdownFilter: React.FC<DropdownFilterProps> = ({
  config,
  selectedValues,
  onSelectionChange,
  onApply,
  onCancel,
  hasPendingChanges,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

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

  const handleApply = () => {
    onApply();
    setIsOpen(false);
  };

  // Handle clicking outside - lose pending selections if not applied
  const handleClickOutside = () => {
    setIsOpen(false);
    onCancel(); // This will clear pending selections for this filter
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
          {/* Overlay - preserve selections when clicking outside */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={handleClickOutside}
          />
          
          {/* Dropdown Content - Updated to match image styling */}
          <div className="absolute top-full right-0 mt-2 bg-white border-2 border-[#0021A5] rounded-lg shadow-lg z-20 min-w-[320px]">
            {/* Header */}
            <div className="p-4 border-b-2 border-[#0021A5]">
              <div className="text-sm font-semibold text-[#0021A5] mb-3">Select Topics</div>
              
              {/* Options - Grid layout with enhanced tooltip for truncated text */}
              <div className="grid grid-cols-3 gap-2 relative">
                {config.options.map((option) => (
                  <div key={option.id} className="relative">
                    <button
                      onClick={() => toggleOption(option.value)}
                      onMouseEnter={() => setHoveredOption(option.id)}
                      onMouseLeave={() => setHoveredOption(null)}
                      className={`w-full px-3 py-1.5 text-xs font-medium rounded-full transition-colors border overflow-hidden text-ellipsis whitespace-nowrap ${
                        selectedValues.includes(option.value)
                          ? 'bg-[#0021A5] text-white border-[#0021A5]'
                          : 'bg-white text-[#0021A5] border-[#0021A5] hover:bg-[#0021A5] hover:text-white'
                      }`}
                      title={option.label}
                    >
                      {option.label}
                    </button>
                    
                    {/* Enhanced tooltip for better visibility */}
                    {hoveredOption === option.id && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-30 pointer-events-none">
                        {option.label}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Actions - Apply button now handles pending state */}
            <div className="p-4 flex justify-between items-center">
              <div className="flex gap-4">
                <button
                  onClick={selectAll}
                  className="text-[#0021A5] text-sm font-medium hover:underline"
                >
                  Select All
                </button>
                <button
                  onClick={deselectAll}
                  className="text-[#0021A5] text-sm font-medium hover:underline"
                >
                  Deselect All
                </button>
              </div>
              
              <button
                onClick={handleApply}
                disabled={!hasPendingChanges}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  hasPendingChanges 
                    ? 'bg-[#0021A5] text-white hover:bg-[#001a85]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
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