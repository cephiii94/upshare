import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { UndanganEditor } from "@/components/dashboard/undangan-editor";

export default async function UndanganEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: tenant } = await supabase
    .from("tenants")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!tenant || tenant.category !== "undangan") {
    return notFound();
  }

  return (
    <div className="animate-in fade-in duration-500">
      <UndanganEditor tenant={tenant} />
    </div>
  );
}
