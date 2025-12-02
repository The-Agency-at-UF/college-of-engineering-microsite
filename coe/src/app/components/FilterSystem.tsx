import React from "react";
import { DropdownFilter, FilterConfig } from "./DropdownFilter";

export interface FilterState {
  [filterId: string]: string[];
}

export interface FilterSystemProps<T> {
  items: T[];
  filterConfigs: FilterConfig[];
  filterState: FilterState;
  onFilterChange: (filterId: string, selectedValues: string[]) => void;
  filterFunction: (item: T, filters: FilterState) => boolean;
  children: (filteredItems: T[]) => React.ReactNode;
  className?: string;
  filterControlsClassName?: string; // New prop for filter controls positioning
}

export function FilterSystem<T>({
  items,
  filterConfigs,
  filterState,
  onFilterChange,
  filterFunction,
  children,
  className = "",
  filterControlsClassName = "flex gap-4 mb-6" // Default left alignment
}: FilterSystemProps<T>) {
  // Apply all filters to the items
  const filteredItems = items.filter(item => filterFunction(item, filterState));

  // Function to remove a specific filter value
  const removeFilterValue = (filterId: string, valueToRemove: string) => {
    const currentValues = filterState[filterId] || [];
    const newValues = currentValues.filter(value => value !== valueToRemove);
    onFilterChange(filterId, newValues);
  };

  // Get selected filter badges
  const getSelectedFilterBadges = () => {
    const badges: Array<{ filterId: string; value: string; label: string }> = [];
    
    filterConfigs.forEach(config => {
      const selectedValues = filterState[config.id] || [];
      selectedValues.forEach(value => {
        const option = config.options.find(opt => opt.value === value);
        if (option) {
          badges.push({
            filterId: config.id,
            value: value,
            label: option.label // Use actual filter name like "INNOVATION", "VIDEO"
          });
        }
      });
    });
    
    return badges;
  };

  const selectedBadges = getSelectedFilterBadges();

  return (
    <div className={className}>
      {/* Filter Controls */}
      <div className={filterControlsClassName}>
        {filterConfigs.map((config) => (
          <DropdownFilter
            key={config.id}
            config={config}
            selectedValues={filterState[config.id] || []}
            onSelectionChange={onFilterChange}
          />
        ))}
      </div>

      {/* Selected Filter Badges - Left aligned with white background and blue outline */}
      {selectedBadges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6 justify-start">
          {selectedBadges.map((badge, index) => (
            <div
              key={`${badge.filterId}-${badge.value}-${index}`}
              className="bg-white text-[#0021A5] border-2 border-[#0021A5] px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium"
            >
              <span>{badge.label}</span>
              <button
                onClick={() => removeFilterValue(badge.filterId, badge.value)}
                className="text-[#0021A5] hover:text-[#001a85] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Render filtered content */}
      {children(filteredItems)}
    </div>
  );
}