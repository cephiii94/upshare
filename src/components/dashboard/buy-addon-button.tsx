"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { buyAddonDomain } from "@/app/actions/checkout";
import { useState } from "react";

export function BuyAddonButton({ tenantId, isActive }: { tenantId: string; isActive: boolean }) {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.set("tenant_id", tenantId);
      const res = await buyAddonDomain(formData);

      if (res && res.success && res.data?.snapToken) {
        // @ts-ignore
        window.snap.pay(res.data.snapToken, {
          onSuccess: function (result: any) {
            toast.success("Pembayaran berhasil!", { description: "Layanan telah diaktifkan." });
            window.location.reload();
          },
          onPending: function (result: any) {
            toast.info("Menunggu pembayaran Anda!");
          },
          onError: function (result: any) {
            toast.error("Pembayaran gagal!");
          },
          onClose: function () {
            console.log("Customer closed the popup without finishing the payment");
          },
        });
      } else if (res && !res.success) {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleBuy}
      disabled={loading}
      size="sm"
      className="bg-amber-500 hover:bg-amber-600 text-white shadow-sm h-8 text-xs"
    >
      {loading ? "Memproses..." : isActive ? "Perpanjang" : "Aktifkan"} (Rp 10rb)
    </Button>
  );
}
