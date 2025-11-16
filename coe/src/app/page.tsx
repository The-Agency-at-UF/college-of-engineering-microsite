import Timeline from './components/TimelineComponent';
import EventGridComponent from "./components/EventGridComponent";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gray-100">
      <Timeline />
      <EventGridComponent />

    </main>
  );
}
