import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import BackButton from "@/app/admin/BackButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">

        {/* Back button — auto-hidden on /admin */}
        <BackButton />

        {children}
      </div>
    </div>
  );
}
