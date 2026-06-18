import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminUsersPage() {
  const supabase = await createClient();

  // Ambil data users dengan join ke subscriptions dan tenants jika memungkinkan.
  // Karena struktur kita, kita bisa ambil dari profiles lalu manual join, atau pakai View.
  // Untuk kesederhanaan, kita ambil profiles, subscriptions, dan tenants secara terpisah lalu digabung di memori
  // karena jumlah pengguna mungkin belum jutaan.
  
  const { data: profiles } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
  const { data: subscriptions } = await supabase.from("subscriptions").select("*");
  const { data: tenants } = await supabase.from("tenants").select("*");

  const usersList = profiles?.map((profile) => {
    const sub = subscriptions?.find((s) => s.user_id === profile.id);
    const userTenants = tenants?.filter((t) => t.user_id === profile.id) || [];
    
    return {
      ...profile,
      plan: sub?.plan || "free",
      sub_status: sub?.status || "inactive",
      subdomainsCount: userTenants.length,
    };
  }) || [];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Daftar Pengguna</h1>
        <p className="text-muted-foreground mt-2">
          Kelola seluruh pengguna yang terdaftar di Upshare.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Semua Pengguna</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-3">Nama</th>
                  <th className="px-6 py-3">Bergabung Sejak</th>
                  <th className="px-6 py-3">Paket</th>
                  <th className="px-6 py-3">Subdomain Diklaim</th>
                  <th className="px-6 py-3">Admin</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user) => (
                  <tr key={user.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="px-6 py-4 font-medium text-foreground">
                      {user.full_name || "Tanpa Nama"}
                      <div className="text-xs text-muted-foreground font-mono">{user.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(user.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold uppercase text-xs">{user.plan}</span>
                        <Badge variant={user.sub_status === "active" ? "default" : "secondary"}>
                          {user.sub_status === "active" ? "Active" : "Free"}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.subdomainsCount}
                    </td>
                    <td className="px-6 py-4">
                      {user.is_admin ? (
                        <Badge className="bg-red-500 hover:bg-red-600">Admin</Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                  </tr>
                ))}
                
                {usersList.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                      Belum ada pengguna.
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
