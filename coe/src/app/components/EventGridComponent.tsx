"use client";

import React, { useEffect, useState } from "react";
import EventCardComponent from "./EventCardComponent";
import { Event } from "../lib/fakeApiData";
import { ApiClient } from "../lib/apiClient";
import { API_CONFIG } from "../lib/apiConfig";

const EventGridComponent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await ApiClient.getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error("❌ Failed to fetch events:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
      {API_CONFIG.USE_FAKE_API && API_CONFIG.SHOW_FAKE_DATA_BANNER && (
        <div className="mb-8 p-4 bg-blue-100 border border-blue-400 rounded-lg text-blue-800 max-w-4xl mx-auto">
          <p className="font-semibold">🧪 Development Mode</p>
          <p className="text-sm">Using fake data. Set USE_FAKE_API to false in apiConfig.ts to connect to AWS.</p>
        </div>
      )}

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 place-items-center pt-10">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCardComponent
              key={event.event_id}
              title={event.title}
              dateRange={event.event_date}
              description={event.description}
              sourceLabel={`MORE FROM ${event.department}`}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-[#002657] text-lg">
            No events available
          </div>
        )}
      </div>
    </section>
  );
};

export default EventGridComponent;
