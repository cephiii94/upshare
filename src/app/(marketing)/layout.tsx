import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Upshare",
    template: "%s | Upshare",
  },
};

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
