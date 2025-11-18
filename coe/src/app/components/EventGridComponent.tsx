import React from "react";
import EventCardComponent from "./EventCardComponent";

const EventGridComponent = () => {
  return (
    <section className="w-full py-20 px-8 bg-white"> {/* increased top padding */}
      {/* <div className="grid grid-cols-3 gap-8 justify-center mx-auto"> */}
      <div className="grid grid-cols-3 gap-8 justify-center mx-auto max-w-[1300px]">
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
