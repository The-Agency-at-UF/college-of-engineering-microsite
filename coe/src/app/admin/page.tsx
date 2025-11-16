import Link from "next/link";
import { auth } from "@/app/lib/auth";

export default async function AdminPage() {
  const session = await auth();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <p className="mb-8 text-gray-700">
        Logged in as <span className="font-semibold">{session?.user?.email}</span>
      </p>

      <div className="grid grid-cols-1 gap-4">
        <Link
          href="/admin/events/create"
          className="p-4 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          Create Event
        </Link>

        <Link
          href="/admin/milestones/create"
          className="p-4 bg-green-600 text-white rounded shadow hover:bg-green-700"
        >
          Create Milestone
        </Link>
      </div>
    </div>
  );
}

