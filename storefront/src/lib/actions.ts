"use server";

import { MEDUSA_API_URL } from "./constants";

export async function subscribeToRestock(variantId: string, email: string) {
  const res = await fetch(`${MEDUSA_API_URL}/store/restock-notifications`, {
    method: "POST",
    body: JSON.stringify({ variant_id: variantId, email }),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  if (!res.ok) {
    return {
      error:
        "You are already subscribed to restock notifications for this product.",
    };
  }

  return {
    error: null,
  };
}
