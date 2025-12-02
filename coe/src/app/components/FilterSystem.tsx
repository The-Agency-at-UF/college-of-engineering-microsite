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
}

export function FilterSystem<T>({
  items,
  filterConfigs,
  filterState,
  onFilterChange,
  filterFunction,
  children,
  className = ""
}: FilterSystemProps<T>) {
  // Apply all filters to the items
  const filteredItems = items.filter(item => filterFunction(item, filterState));

  return (
    <div className={className}>
      {/* Filter Controls */}
      <div className="flex gap-4 mb-6">
        {filterConfigs.map((config) => (
          <DropdownFilter
            key={config.id}
            config={config}
            selectedValues={filterState[config.id] || []}
            onSelectionChange={onFilterChange}
          />
        ))}
      </div>

      {/* Render filtered content */}
      {children(filteredItems)}
    </div>
  );
}