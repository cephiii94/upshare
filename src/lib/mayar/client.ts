/**
 * Mayar.id API Client
 * Berisi fungsi-fungsi untuk berinteraksi dengan API Mayar.id
 */

const MAYAR_API_URL = process.env.NEXT_PUBLIC_MAYAR_API_URL || "https://api.mayar.id/hl/v1";
const MAYAR_API_KEY = process.env.MAYAR_API_KEY;

export interface CreatePaymentLinkParams {
  name: string; // Item/Product name
  description: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerMobile?: string;
  userId: string;
  planId?: string;
  type?: "subscription" | "addon_domain" | "topup";
  tenantId?: string;
}

export async function createPaymentLink(params: CreatePaymentLinkParams) {
  if (!MAYAR_API_KEY) {
    throw new Error("MAYAR_API_KEY is not configured");
  }

  const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`;
  
  // Set expired date to 24 hours from now
  const expiredAt = new Date();
  expiredAt.setHours(expiredAt.getHours() + 24);

  // Payload for Mayar Headless API /payment/create
  const payload = {
    name: params.customerName || "Customer",
    email: params.customerEmail,
    amount: params.amount,
    mobile: params.customerMobile || "08123456789", // Fallback mobile is required by Mayar
    redirectUrl: redirectUrl,
    redirectURL: redirectUrl, // Provide both casings for compatibility
    description: `${params.name} - ${params.description}`,
    expiredAt: expiredAt.toISOString(),
    // Standard metadata fields returned in webhook
    extraData: {
      user_id: params.userId,
      plan_id: params.planId || "none",
      type: params.type || "subscription",
      tenant_id: params.tenantId || "",
    },
    // Also include custom_field for backward compatibility
    custom_field: {
      user_id: params.userId,
      plan_id: params.planId || "none",
      type: params.type || "subscription",
      tenant_id: params.tenantId || "",
    }
  };

  try {
    const response = await fetch(`${MAYAR_API_URL}/payment/create`, {
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
    
    // Mayar returns payment link in data.link
    return data?.data?.link || data?.link || null;
  } catch (error) {
    console.error("Error creating Mayar payment link:", error);
    throw error;
  }
}
