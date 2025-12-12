import { auth } from "@/app/lib/auth";
import Link from "next/link";
import { headers } from "next/headers";
import LogoutButton from "@/app/admin/LogoutButton";

async function getAllData() {
  const h = await headers();
  const cookie = h.get("cookie") ?? "";

  const base = process.env.NEXTAUTH_URL || "http://localhost:3000";

  async function safeFetch(url: string) {
    const res = await fetch(url, {
      cache: "no-store",
      headers: cookie ? { Cookie: cookie } : {}
    });

    try {
      return await res.json();
    } catch (e) {
      return null;
    }
  }

  const eventsResponse = await safeFetch(`${base}/api/events`);
  const milestonesResponse = await safeFetch(`${base}/api/milestones`);

  return {
    events: Array.isArray(eventsResponse?.events) ? eventsResponse.events : (Array.isArray(eventsResponse) ? eventsResponse : []),
    milestones: Array.isArray(milestonesResponse?.milestones) ? milestonesResponse.milestones : (Array.isArray(milestonesResponse) ? milestonesResponse : []),
  };
}

export default async function AdminPage() {
  const session = await auth();
  const { events, milestones } = await getAllData();

  return (
    <div className="pt-10 pb-20 flex flex-col items-center">

      {/* UF Banner */}
      <div className="bg-[#0021A5] text-white font-bold text-center rounded-full px-12 py-4 text-3xl shadow mb-6 w-[min(90%,1000px)]">
        COE Admin Dashboard
      </div>

      {/* Logged in user */}
      <p className="text-[#002657] italic mb-8">
        Logged in as{" "}
        <span className="font-semibold not-italic">
          {session?.user?.email}
        </span>
      </p>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 w-[min(90%,900px)]">

        <Link
          href="/admin/events/create"
          className="bg-[#FA4616] text-white text-center px-6 py-4 rounded-full font-bold hover:bg-[#d93d13] transition shadow"
        >
          Create Event
        </Link>

        <Link
          href="/admin/milestones/create"
          className="bg-[#FA4616] text-white text-center px-6 py-4 rounded-full font-bold hover:bg-[#d93d13] transition shadow"
        >
          Create Milestone
        </Link>

        <Link
          href="/admin/events/delete"
          className="bg-[#002657] text-white text-center px-6 py-4 rounded-full font-bold hover:bg-[#001d42] transition shadow"
        >
          Delete Event
        </Link>

        <Link
          href="/admin/milestones/delete"
          className="bg-[#002657] text-white text-center px-6 py-4 rounded-full font-bold hover:bg-[#001d42] transition shadow"
        >
          Delete Milestone
        </Link>

        <Link
          href="/admin/events/edit"
          className="bg-[#bdd9e4] text-black text-center px-6 py-4 rounded-full font-bold hover:bg-[#5e8892] transition shadow"
        >
          Edit Event
        </Link>

        <Link
          href="/admin/milestones/edit"
          className="bg-[#bdd9e4] text-black text-center px-6 py-4 rounded-full font-bold hover:bg-[#5e8892] transition shadow"
        >
          Edit Milestone
        </Link>
      </div>

      {/* Data Table */}
      <h2 className="text-2xl font-bold text-[#002657] mb-4">
        All Records
      </h2>

      <div className="overflow-x-auto border border-[#002657] rounded-lg shadow w-[min(95%,1000px)]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-[#0021A5] text-white">
              <th className="p-3 border border-[#002657]">Type</th>
              <th className="p-3 border border-[#002657]">Title</th>
              <th className="p-3 border border-[#002657]">ID</th>
            </tr>
          </thead>

          <tbody>
            {/* EVENTS */}
            {Array.isArray(events) &&
              events.map((ev: any) => (
                <tr key={ev.event_id} className="hover:bg-[#E6EDF8]">
                  <td className="p-3 border border-[#002657] text-[#002657]">
                    Event
                  </td>
                  <td className="p-3 text-[#002657] border border-[#002657]">{ev.title}</td>
                  <td className="p-3 text-[#002657] border border-[#002657] font-mono text-xs">
                    {ev.event_id}
                  </td>
                </tr>
              ))}

            {/* MILESTONES */}
            {Array.isArray(milestones) &&
              milestones.map((m: any) => (
                <tr key={m.milestone_id} className="hover:bg-[#E6EDF8]">
                  <td className="p-3 border border-[#002657] text-[#002657]">
                    Milestone
                  </td>
                  <td className="p-3 border text-[#002657] border-[#002657]">{m.title}</td>
                  <td className="p-3 border text-[#002657] border-[#002657] font-mono text-xs">
                    {m.milestone_id}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Logout button */}
      <div className="pt-6 flex justify-center w-full mb-6">
        <LogoutButton />
      </div>
    </div>
  );
}
