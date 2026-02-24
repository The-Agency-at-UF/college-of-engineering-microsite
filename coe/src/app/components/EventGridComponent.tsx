"use client";

import React, { useEffect, useState, useMemo } from "react";
import EventCardComponent from "./EventCardComponent";
import { Event } from "../lib/fakeApiData";
import { ApiClient } from "../lib/apiClient";

interface EventGridComponentProps {
  selectedDepartments?: string[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onTotalItemsChange: (total: number) => void;
  onVisibleEventDatesChange: (dates: string[]) => void;
}

const EventGridComponent = ({ 
  selectedDepartments,
  currentPage,
  itemsPerPage,
  onPageChange,
  onTotalItemsChange,
  onVisibleEventDatesChange
}: EventGridComponentProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await ApiClient.getEvents();
        setEvents(eventsData);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events by selected department
  const filteredEvents = useMemo(() => {
    if (!selectedDepartments || selectedDepartments.length === 0) return events;
    
    return events.filter(event => 
      selectedDepartments.includes(event.department.toUpperCase())
    );
  }, [events, selectedDepartments]);

  // Update total items when filtered events change
  useEffect(() => {
    onTotalItemsChange(filteredEvents.length);
  }, [filteredEvents.length, onTotalItemsChange]);

  // Paginate events - show only 9 at a time
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredEvents.slice(startIndex, endIndex);
  }, [filteredEvents, currentPage, itemsPerPage]);

  // Extract dates from visible events and notify parent
  useEffect(() => {
    const visibleDates = paginatedEvents.map(event => event.event_date);
    onVisibleEventDatesChange(visibleDates);
  }, [paginatedEvents, onVisibleEventDatesChange]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="w-full text-center py-12 text-[#002657] text-lg font-medium">
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-12 text-red-600 text-lg font-medium">
        Error: {error}
      </div>
    );
  }

  return (
    <section className="w-full py-20 px-8 bg-white">
      {/* Show banner when using fake data */}
      {/* {API_CONFIG.USE_FAKE_API && API_CONFIG.SHOW_FAKE_DATA_BANNER && (
        <div className="mb-8 p-4 bg-blue-100 border border-blue-400 rounded-lg text-blue-800 max-w-4xl mx-auto">
          <p className="font-semibold">🧪 Development Mode</p>
          <p className="text-sm">Using fake data. Set USE_FAKE_API to false in apiConfig.ts to connect to AWS.</p>
        </div>
      )} */}

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 place-items-center pt-10">
        {paginatedEvents.length > 0 ? (
          paginatedEvents.map((event) => (
            <EventCardComponent
              key={event.event_id}
              title={event.title}
              dateRange={event.event_date}
              description={event.description}
              sourceLabel={`MORE FROM ${event.department}`}
              imageUrl={event.image_url}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-[#002657] text-lg">
            {selectedDepartments && selectedDepartments.length > 0 ? 
              `No events available for the selected department(s)` : 
              'No events available'
            }
          </div>
        )}
      </div>

      {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">

            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
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
                onChange={(e) => onPageChange(Number(e.target.value))}
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
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md bg-[#002657] text-white disabled:opacity-40"
            >
              →
            </button>

          </div>
        )}
    </section>
  );
};

export default EventGridComponent;
