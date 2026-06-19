"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Loader2 } from "lucide-react";
import { adminDeleteSubdomain, adminCreateSubdomain } from "@/app/actions/admin";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

export function AdminDeleteSubdomainButton({ tenantId, subdomain }: { tenantId: string, subdomain: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Apakah Anda yakin ingin menghapus subdomain ${subdomain}.upshare.id secara permanen?`)) {
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.set("tenant_id", tenantId);
    
    const result = await adminDeleteSubdomain(formData);
    setLoading(false);

    if (result?.success) {
      toast.success(result.message);
    } else if (result?.error) {
      toast.error(result.error);
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleDelete} 
      disabled={loading}
      className="text-red-500 hover:text-red-700 hover:bg-red-50"
      title="Hapus Subdomain"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  );
}

export function AdminCreateSubdomainDialog({ users }: { users: { id: string, full_name: string, email: string }[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [subdomain, setSubdomain] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.set("user_id", userId);
    formData.set("subdomain", subdomain);

    const result = await adminCreateSubdomain(formData);
    setLoading(false);

    if (result?.success) {
      toast.success(result.message);
      setOpen(false);
      setSubdomain("");
      setUserId("");
    } else if (result?.error) {
      toast.error(result.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-brand text-white shadow-sm hover:shadow-md">
          <Plus className="mr-2 h-4 w-4" /> Tambah Subdomain
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Subdomain Manual</DialogTitle>
          <DialogDescription>
            Admin dapat mengklaim subdomain secara paksa untuk pengguna tertentu, bahkan jika paket mereka tidak mencukupi.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreate} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="user_id">Pilih Pemilik (Pengguna)</Label>
            <select 
              id="user_id" 
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            >
              <option value="" disabled>-- Pilih Pengguna --</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.full_name || 'Tanpa Nama'} ({u.email || u.id.slice(0, 8)})
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subdomain">Nama Subdomain</Label>
            <div className="flex items-center">
              <Input 
                id="subdomain" 
                placeholder="nama-proyek" 
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                className="rounded-r-none text-right focus-visible:ring-0 focus-visible:ring-offset-0 border-r-0"
                maxLength={30}
                required
              />
              <div className="bg-muted border border-l-0 px-3 py-2 rounded-r-md text-sm text-muted-foreground h-10 flex items-center">
                .upshare.id
              </div>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={loading || !userId || !subdomain}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Buat Sekarang"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
