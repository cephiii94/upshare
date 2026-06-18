"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Settings, LogOut, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/actions/auth";

export function Sidebar({ user, profile }: { user: any; profile: any }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: Activity },
    { name: "Subdomains", href: "/dashboard/subdomains", icon: Globe },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="w-full lg:w-64 bg-background border-r flex flex-col justify-between">
      <div>
        <div className="p-6">
          <Link href="/dashboard" className="text-2xl font-bold text-primary">
            Upshare
          </Link>
        </div>
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = 
              item.href === "/dashboard" 
                ? pathname === item.href 
                : pathname === item.href || pathname.startsWith(item.href + "/");
                
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
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

      <div className="p-4 border-t">
        <div className="mb-4 px-2">
          <p className="text-sm font-medium truncate">{profile?.full_name || "User"}</p>
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
