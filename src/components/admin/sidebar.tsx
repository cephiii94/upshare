"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Globe, LayoutDashboard, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminSidebar({ user, profile }: { user: any; profile: any }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Subdomains", href: "/admin/subdomains", icon: Globe },
  ];

  return (
    <aside className="w-full lg:w-64 bg-background border-r flex flex-col justify-between">
      <div>
        <div className="p-6">
          <Link href="/admin" className="text-2xl font-bold text-red-600">
            Upshare Admin
          </Link>
        </div>
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = 
              item.href === "/admin" 
                ? pathname === item.href 
                : pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-red-50 text-red-600"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t space-y-4">
        <div className="px-2">
          <p className="text-sm font-medium truncate">{profile?.full_name || "Admin"}</p>
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
        </div>
        
        <Link
          href="/dashboard"
          className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Dashboard
        </Link>
      </div>
    </aside>
  );
}
