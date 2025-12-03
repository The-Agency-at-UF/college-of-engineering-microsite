"use client";

import { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import TimelineHeader from "../components/TimelineHeader";
import ExcellenceSection from "../components/ExcellenceSection";
import Timeline from "../components/TimelineComponent";
import EventGridComponent from "../components/EventGridComponent";

export default function Home() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const handleDepartmentChange = (department: string | null) => {
    setSelectedDepartment(department);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
        <NavBar />
        <TimelineHeader />
      

      {/* Main Content Section */}
      <section className="bg-white">
      <ExcellenceSection 
        selectedDepartment={selectedDepartment}
        onDepartmentChange={handleDepartmentChange}
      />
      </section>

      {/* ======= TIMELINE BAR + EVENT GRID ======= */}
      <section className="bg-white">
        <div className="flex">
          <Timeline />
          <EventGridComponent selectedDepartment={selectedDepartment} />
        </div>
      </section>

      <Footer />
    </div>
  );
}