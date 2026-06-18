import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar & main content akan diisi di Phase 5 */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
