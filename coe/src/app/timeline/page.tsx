import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import TimelineHeader from "../components/TimelineHeader";
import ExcellenceSection from "../components/ExcellenceSection";

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
      <Footer />
    </div>
  );
}