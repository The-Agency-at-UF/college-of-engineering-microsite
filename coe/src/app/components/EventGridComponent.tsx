"use client";

import React, { useEffect, useState } from "react";
import EventCardComponent from "./EventCardComponent";

const EventGridComponent = () => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return <p className="text-center py-20 text-[#002657]">Loading events...</p>;
  }

  return (
    <section className="w-full py-20 px-8 bg-white"> {/* increased top padding */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 place-items-center pt-10">
        {events.map((event: any) => (
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
