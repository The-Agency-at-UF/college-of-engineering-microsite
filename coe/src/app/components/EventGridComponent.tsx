"use client";

import React, { useEffect, useState } from "react";
import EventCardComponent from "./EventCardComponent";

const EventGridComponent = () => {

  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events"); // AWS backend endpoint
        const data = await res.json();
        setAllEvents(data || []); // store results in state
      } catch (error) {
        console.error("❌ Failed to fetch events:", error);
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

  return (
    <section className="w-full py-20 px-8 bg-white"> {/* increased top padding */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 place-items-center pt-10">
        {allEvents.map((event: any) => (
          <EventCardComponent
            key={event.event_id}
            title={event.title}
            dateRange={event.event_date}
            description={event.description}
            sourceLabel={event.department}
          />
        ))}
      </div>
    </section>
  );
};

export default EventGridComponent;
