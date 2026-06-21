import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Ambil profil
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-muted/20">
      <Sidebar user={user} profile={profile} />
      <main className="flex-1 overflow-y-auto w-full">
        <div className="p-4 sm:p-8">{children}</div>
      </main>
    </div>
  );
}
