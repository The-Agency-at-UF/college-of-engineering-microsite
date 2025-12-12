import { useState, useEffect, useMemo } from "react";
import { Milestone, Event } from "./fakeApiData";
import { ApiClient } from "./apiClient";

export interface UseMilestonesReturn {
  milestones: Milestone[];
  loading: boolean;
  error: string | null;
  usingMockData: boolean;
}

export interface UseEventsReturn {
  events: Event[];
  loading: boolean;
  error: string | null;
  usingMockData: boolean;
}

export const useMilestones = (): UseMilestonesReturn => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        setLoading(true);
        const milestonesData = await ApiClient.getMilestones();
        setMilestones(milestonesData);
        setUsingMockData(false); // Using ApiClient which handles fake/real switching
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch milestones");
        setMilestones([]);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, []);

  return { milestones, loading, error, usingMockData };
};

export const useEvents = (): UseEventsReturn => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const eventsData = await ApiClient.getEvents();
        setEvents(eventsData);
        setUsingMockData(false); // Using ApiClient which handles fake/real switching
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch events");
        setEvents([]);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error, usingMockData };
};

export const useFilteredMilestones = (milestones: Milestone[], selectedDepartment: string) => {
  return useMemo(() => {
    if (selectedDepartment === "all") return milestones;
    return milestones.filter(milestone => 
      milestone.department?.toLowerCase() === selectedDepartment.toLowerCase()
    );
  }, [milestones, selectedDepartment]);
};

export const useFilteredEvents = (events: Event[], selectedDepartment: string) => {
  return useMemo(() => {
    if (selectedDepartment === "all") return events;
    return events.filter(event => 
      event.department?.toLowerCase() === selectedDepartment.toLowerCase()
    );
  }, [events, selectedDepartment]);
};