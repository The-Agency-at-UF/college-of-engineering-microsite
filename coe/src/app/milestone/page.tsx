import MilestoneCard from "../components/MilestoneComponent";

export default function MilestonePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 bg-gray-50 p-10">
      {/* Gold variant */}
      <MilestoneCard
        imageSrc="/example.jpg"
        title="MILESTONE TITLE"
        tags={["THEME", "VIDEO"]}
        variant="gold"
      />

      {/* Blue variant */}
      <MilestoneCard
        imageSrc="/example.jpg"
        title="MILESTONE TITLE"
        tags={["THEME", "VIDEO"]}
        variant="blue"
      />
    </main>
  );
}