import React from "react";
import EventCardComponent from "./EventCardComponent";

const EventGridComponent = () => {
  return (
    <section className="w-full py-10 px-8 bg-white">
      {/* Removed the top “MORE FROM XXXX” label */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
        <EventCardComponent />
        <EventCardComponent />
        <EventCardComponent />
        <EventCardComponent />
        <EventCardComponent />
        <EventCardComponent />
        <EventCardComponent />
        <EventCardComponent />
        <EventCardComponent />
      </div>
    </section>
  );
};

export default EventGridComponent;
