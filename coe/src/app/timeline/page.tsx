"use client";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import TimelineHeader from "../components/TimelineHeader";
import Timeline from "../components/TimelineComponent";
import EventGridComponent from "../components/EventGridComponent";

export default function TimelinePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <NavBar />
      <TimelineHeader />
      
      {/* Timeline Bar */}
      <Timeline />

      {/* Main Content Section - Events Display */}
      <section className="bg-white">
        <EventGridComponent />
      </section>
      
      <Footer />
    </div>
  );
}