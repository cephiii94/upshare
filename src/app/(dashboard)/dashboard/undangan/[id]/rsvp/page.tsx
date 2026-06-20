import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ArrowLeft, Users, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function RsvpManagementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Verifikasi kepemilikan tenant
  const { data: tenant } = await supabase
    .from("tenants")
    .select("subdomain, category")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!tenant || tenant.category !== "undangan") {
    return notFound();
  }

  // Ambil data RSVP
  const { data: rsvps } = await supabase
    .from("invitation_rsvps")
    .select("*")
    .eq("tenant_id", id)
    .order("created_at", { ascending: false });

  const rsvpList = rsvps || [];

  const totalHadir = rsvpList.filter((r) => r.attendance === "hadir").length;
  const totalTidakHadir = rsvpList.filter((r) => r.attendance === "tidak_hadir").length;
  const totalRagu = rsvpList.filter((r) => r.attendance === "ragu").length;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href={`/dashboard/undangan/${id}/edit`}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Editor
          </Link>
        </Button>
        <h1 className="text-2xl font-bold flex-1">
          Buku Tamu: {tenant.subdomain}.upshare.id
        </h1>
      </div>

      {/* Rekap RSVP */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total RSVP</p>
            <p className="text-2xl font-bold">{rsvpList.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full text-green-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Hadir</p>
            <p className="text-2xl font-bold">{totalHadir}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-full text-red-600">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Tidak Hadir</p>
            <p className="text-2xl font-bold">{totalTidakHadir}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4">
          <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Masih Ragu</p>
            <p className="text-2xl font-bold">{totalRagu}</p>
          </div>
        </div>
      </div>

      {/* Tabel RSVP */}
      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b bg-slate-50/50">
          <h2 className="font-bold text-lg">Daftar Ucapan & Kehadiran Tamu</h2>
        </div>
        {rsvpList.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            Belum ada tamu yang mengisi buku tamu.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Tanggal</th>
                  <th className="px-6 py-4 font-medium">Nama Tamu</th>
                  <th className="px-6 py-4 font-medium">Kehadiran</th>
                  <th className="px-6 py-4 font-medium">Pesan / Ucapan</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rsvpList.map((rsvp) => (
                  <tr key={rsvp.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {new Date(rsvp.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4 font-medium">{rsvp.name}</td>
                    <td className="px-6 py-4">
                      {rsvp.attendance === "hadir" && (
                        <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold">Hadir</span>
                      )}
                      {rsvp.attendance === "tidak_hadir" && (
                        <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-semibold">Tidak Hadir</span>
                      )}
                      {rsvp.attendance === "ragu" && (
                        <span className="bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-semibold">Ragu</span>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-md">
                      <p className="truncate text-muted-foreground" title={rsvp.message}>
                        {rsvp.message || "-"}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
