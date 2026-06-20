import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminCreateSubdomainDialog, AdminDeleteSubdomainButton } from "@/components/admin/admin-subdomain-actions";

export default async function AdminSubdomainsPage() {
  const supabase = getSupabaseAdmin();

  // Ambil semua tenant beserta profil pemiliknya
  const { data: tenants } = await supabase
    .from("tenants")
    .select("*, profiles(full_name)")
    .order("created_at", { ascending: false });

  // Ambil semua profil pengguna untuk pilihan dropdown "Buat Subdomain"
  const { data: users } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Daftar Subdomain</h1>
          <p className="text-muted-foreground mt-2">
            Pantau seluruh subdomain yang telah diklaim dan arah URL Target-nya.
          </p>
        </div>
        <AdminCreateSubdomainDialog users={users || []} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Semua Subdomain</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-3">Subdomain</th>
                  <th className="px-6 py-3">Target URL / Mode</th>
                  <th className="px-6 py-3">Pemilik</th>
                  <th className="px-6 py-3">Tanggal Klaim</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {tenants?.map((tenant) => (
                  <tr key={tenant.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="px-6 py-4 font-medium text-foreground">
                      <a 
                        href={`https://${tenant.subdomain}.upshare.id`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="hover:underline text-primary"
                      >
                        {tenant.subdomain}.upshare.id
                      </a>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-muted-foreground max-w-[250px] truncate">
                      {tenant.target_url ? (
                        <a href={tenant.target_url} target="_blank" rel="noreferrer" className="hover:underline">
                          {tenant.target_url}
                        </a>
                      ) : tenant.category === "undangan" && tenant.template_data ? (
                        <span className="text-rose-600 font-semibold uppercase">Template Internal</span>
                      ) : (
                        <span className="italic">Belum diatur</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {/* @ts-ignore karena foreign key typing mungkin belum diupdate */}
                      {tenant.profiles?.full_name || "Unknown"}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(tenant.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={tenant.is_active ? "default" : "secondary"}>
                        {tenant.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <AdminDeleteSubdomainButton tenantId={tenant.id} subdomain={tenant.subdomain} />
                    </td>
                  </tr>
                ))}

                {(!tenants || tenants.length === 0) && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      Belum ada subdomain yang diklaim.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
