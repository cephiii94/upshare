import midtransClient from 'midtrans-client';

const IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === 'true';

// Inisialisasi Snap client
export const snap = new midtransClient.Snap({
  isProduction: IS_PRODUCTION,
  serverKey: process.env.MIDTRANS_SERVER_KEY || '',
  clientKey: process.env.MIDTRANS_CLIENT_KEY || ''
});

// Inisialisasi CoreApi client jika dibutuhkan
export const coreApi = new midtransClient.CoreApi({
  isProduction: IS_PRODUCTION,
  serverKey: process.env.MIDTRANS_SERVER_KEY || '',
  clientKey: process.env.MIDTRANS_CLIENT_KEY || ''
});

export interface CreateSnapTransactionParams {
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  itemName: string;
  userId: string;
  planId?: string;
  type?: "subscription" | "addon_domain" | "topup";
  tenantId?: string;
}

export async function createSnapTransaction(params: CreateSnapTransactionParams) {
  if (!process.env.MIDTRANS_SERVER_KEY) {
    throw new Error("MIDTRANS_SERVER_KEY is not configured");
  }

  // Pisahkan nama depan dan belakang jika ada
  const nameParts = params.customerName.trim().split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : undefined;

  // Custom fields in Midtrans are limited to 3 fields.
  // We can combine tenantId into custom_field3 if type is addon_domain.
  let customField3: string = params.type || "subscription";
  if (params.type === "addon_domain" && params.tenantId) {
    customField3 = `addon_domain:${params.tenantId}`;
  }

  const parameter = {
    transaction_details: {
      order_id: params.orderId,
      gross_amount: params.amount,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: firstName,
      last_name: lastName,
      email: params.customerEmail,
    },
    item_details: [
      {
        id: params.planId || params.type || "item",
        price: params.amount,
        quantity: 1,
        name: params.itemName,
      },
    ],
    // Menyisipkan custom_field agar saat webhook masuk, kita tahu ini milik siapa
    custom_field1: params.userId,
    custom_field2: params.planId || "none",
    custom_field3: customField3,
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    return transaction.token; // Mengembalikan token Snap
  } catch (error) {
    console.error("Error creating Midtrans snap transaction:", error);
    throw error;
  }
}
