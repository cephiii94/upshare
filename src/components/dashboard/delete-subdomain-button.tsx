"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Trash2, AlertTriangle } from "lucide-react";

interface DeleteSubdomainButtonProps {
  tenantId: string;
  deleteAction: (formData: FormData) => Promise<void>;
}

export function DeleteSubdomainButton({ tenantId, deleteAction }: DeleteSubdomainButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleConfirm() {
    setLoading(true);
    const formData = new FormData();
    formData.set("tenant_id", tenantId);
    await deleteAction(formData);
    setLoading(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          size="sm"
        >
          <Trash2 className="w-3.5 h-3.5 mr-1.5" />
          Hapus
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <DialogTitle className="text-base font-semibold text-foreground">
              Hapus Subdomain?
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            Tindakan ini{" "}
            <span className="font-semibold text-foreground">tidak dapat dibatalkan</span>.
            Subdomain ini akan dihapus secara permanen dan slot kuota Anda akan dikembalikan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none" disabled={loading}>
              Batal
            </Button>
          </DialogClose>
          <Button
            type="button"
            size="sm"
            className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white border-0"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-1.5">
                <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Menghapus...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Trash2 className="w-3.5 h-3.5" />
                Ya, Hapus
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
