import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminSubdomainsPage() {
  const supabase = getSupabaseAdmin();

  const { data: tenants } = await supabase
    .from("tenants")
    .select("*, profiles(full_name)")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Daftar Subdomain</h1>
        <p className="text-muted-foreground mt-2">
          Pantau seluruh subdomain yang telah diklaim dan arah URL Target-nya.
        </p>
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
                  <th className="px-6 py-3">Target URL</th>
                  <th className="px-6 py-3">Pemilik</th>
                  <th className="px-6 py-3">Tanggal Klaim</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {tenants?.map((tenant) => (
                  <tr key={tenant.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="px-6 py-4 font-medium text-foreground">
                      <a 
                        href={`http://${tenant.subdomain}.localhost:3000`} 
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
                  </tr>
                ))}

                {(!tenants || tenants.length === 0) && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
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
