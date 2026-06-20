/**
 * Mayar.id API Client
 * Berisi fungsi-fungsi untuk berinteraksi dengan API Mayar.id
 */

const MAYAR_API_URL = process.env.NEXT_PUBLIC_MAYAR_API_URL || "https://api.mayar.id/hl/v1";
const MAYAR_API_KEY = process.env.MAYAR_API_KEY;

export interface CreatePaymentLinkParams {
  name: string;
  description: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  userId: string;
  planId?: string;
  type?: "subscription" | "addon_domain" | "topup";
  tenantId?: string;
}

export async function createPaymentLink(params: CreatePaymentLinkParams) {
  if (!MAYAR_API_KEY) {
    throw new Error("MAYAR_API_KEY is not configured");
  }

  // Format request yang umum untuk Mayar Payment Link (Single Payment)
  const payload = {
    name: params.name,
    description: params.description,
    amount: params.amount,
    customer: {
      name: params.customerName,
      email: params.customerEmail,
    },
    // Menyisipkan metadata agar saat webhook masuk, kita tahu ini milik siapa
    custom_field: {
      user_id: params.userId,
      plan_id: params.planId,
      type: params.type || "subscription",
      tenant_id: params.tenantId,
    },
  };

  try {
    const response = await fetch(`${MAYAR_API_URL}/paymentlink/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MAYAR_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Mayar API Error:", errorData);
      throw new Error("Gagal membuat link pembayaran Mayar");
    }

    const data = await response.json();
    
    // Biasanya API Mayar mengembalikan struktur { data: { link: "https://..." } } atau sejenisnya
    // Untuk amannya, kita sediakan fallback
    return data?.data?.link || data?.link || null;
  } catch (error) {
    console.error("Error creating Mayar payment link:", error);
    throw error;
  }
}
