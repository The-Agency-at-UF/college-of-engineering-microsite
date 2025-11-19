"use client";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import MilestoneGridComponent from "../components/MilestoneGridComponent";

export default function MilestonePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <NavBar />

      {/* Browse over a century banner */}
      <section className="relative flex justify-start mt-10">
        <div className="bg-[#0021A5] text-white text-4xl font-bold py-6 px-12 pr-8 rounded-r-[50px] shadow-md">
          Browse Over a Century of Innovation
        </div>
      </section>

      {/* Divider */}
      <div className="h-[4px] bg-[#FA4616] mx-8 mt-4 rounded-full" />

      {/* Milestone Grid with Built-in Department Filtering */}
      <MilestoneGridComponent />

      <Footer />
    </main>
  );
}
