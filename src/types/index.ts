// ── User ──────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// ── Tenant ────────────────────────────────────────────
export interface Tenant {
  id: string;
  user_id: string;
  subdomain: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ── Subscription ─────────────────────────────────────
export type SubscriptionPlan = "free" | "pro" | "business";
export type SubscriptionStatus =
  | "active"
  | "inactive"
  | "past_due"
  | "canceled";

export interface Subscription {
  id: string;
  user_id: string;
  tenant_id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  mayar_subscription_id: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
}

// ── API Responses ─────────────────────────────────────
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// ── Navigation ────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
}
