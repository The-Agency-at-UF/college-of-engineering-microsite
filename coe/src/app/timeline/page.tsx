"use client";

import { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import TimelineHeader from "../components/TimelineHeader";
import ExcellenceSection from "../components/ExcellenceSection";
import Timeline from "../components/TimelineComponent";
import EventGridComponent from "../components/EventGridComponent";

export default function Home() {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleEventDates, setVisibleEventDates] = useState<string[]>([]);
  const itemsPerPage = 9;

  const handleDepartmentChange = (departments: string[]) => {
    setSelectedDepartments(departments);
    setCurrentPage(1); // Reset to first page when department changes
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
        <NavBar />
        <TimelineHeader />
      

      {/* Main Content Section */}
      <section className="bg-white">
      <ExcellenceSection 
        selectedDepartments={selectedDepartments}
        onDepartmentChange={handleDepartmentChange}
      />
      </section>

      {/* ======= TIMELINE BAR + EVENT GRID ======= */}
      <section className="bg-white">
        <div className="flex">
          <Timeline visibleEventDates={visibleEventDates} />
          <EventGridComponent 
            selectedDepartments={selectedDepartments}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onTotalItemsChange={() => {}}
            onVisibleEventDatesChange={setVisibleEventDates}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}