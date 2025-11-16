import React from "react";
import EventCardComponent from "./EventCardComponent";

const EventGridComponent = () => {
  return (
    <section className="w-full py-20 px-8 bg-white"> {/* increased top padding */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 place-items-center pt-10"> 
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
