import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/sidebar";

export default async function AdminLayout({
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

  // Cek apakah user adalah admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin, full_name")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    redirect("/dashboard"); // Tendang ke dashboard biasa jika bukan admin
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-muted/20">
      <AdminSidebar user={user} profile={profile} />
      <main className="flex-1 overflow-y-auto w-full">
        <div className="p-4 sm:p-8">{children}</div>
      </main>
    </div>
  );
}
