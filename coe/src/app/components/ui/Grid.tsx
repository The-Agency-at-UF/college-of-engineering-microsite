"use client";
import React from "react";
import { COMMON_STYLES } from "../../lib/constants";
import EventCardComponent from "../EventCardComponent";
import { Milestone, Event } from "../../lib/fakeApiData";

interface MilestoneGridProps {
  items: Milestone[];
  className?: string;
}

interface EventGridProps {
  items: Event[];
  className?: string;
}

export const MilestoneGrid: React.FC<MilestoneGridProps> = ({ items, className = "" }) => (
  <div className={`${COMMON_STYLES.container.grid} ${className}`}>
    {items.map((milestone) => (
      <EventCardComponent
        key={milestone.milestone_id}
        title={milestone.title}
        dateRange={new Date(milestone.milestone_date).getFullYear().toString()}
        description={milestone.description || "Detailed information about this significant engineering milestone and its impact on the field."}
        sourceLabel={`MORE FROM ${milestone.department?.toUpperCase() || 'ENGINEERING'}`}
      />
    ))}
  </div>
);

export const EventGrid: React.FC<EventGridProps> = ({ items, className = "" }) => (
  <div className={`${COMMON_STYLES.container.grid} ${className}`}>
    {items.map((event) => (
      <EventCardComponent
        key={event.event_id}
        title={event.title}
        dateRange={event.event_date}
        description={event.description || "Detailed information about this engineering event and its significance."}
        sourceLabel={`MORE FROM ${event.department?.toUpperCase() || 'ENGINEERING'}`}
      />
    ))}
  </div>
);