import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import TimelineHeader from "../components/TimelineHeader";
import ExcellenceSection from "../components/ExcellenceSection";
import Timeline from "../components/TimelineComponent";
import EventGridComponent from "../components/EventGridComponent";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
        <NavBar />
        <TimelineHeader />
      

      {/* Main Content Section */}
      <section className="bg-white">
      <ExcellenceSection />
      </section>

      {/* ======= TIMELINE BAR + EVENT GRID ======= */}
      <section className="bg-white">
        <Timeline />
        <EventGridComponent />
      </section>

      <Footer />
    </div>
  );
}