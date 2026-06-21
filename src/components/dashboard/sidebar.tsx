"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Settings, LogOut, Activity, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/actions/auth";

export function Sidebar({ user, profile }: { user: any; profile: any }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: Activity },
    { name: "Subdomains", href: "/dashboard/subdomains", icon: Globe },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b bg-background sticky top-0 z-40">
        <div className="font-bold text-lg text-primary">Upshare</div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 -mr-2">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 bg-background border-r flex flex-col justify-between transition-all duration-300 overflow-hidden",
        isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64",
        "lg:static lg:translate-x-0",
        isDesktopOpen ? "lg:w-64" : "lg:w-20"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={cn(
            "p-4 hidden lg:flex items-center h-[72px] shrink-0",
            isDesktopOpen ? "justify-between" : "justify-center"
          )}>
            <Link 
              href="/dashboard" 
              className={cn(
                "font-bold text-primary transition-all truncate", 
                isDesktopOpen ? "text-2xl opacity-100 w-auto" : "w-0 opacity-0 hidden"
              )}
            >
              Upshare
            </Link>
            <button 
              onClick={() => setIsDesktopOpen(!isDesktopOpen)} 
              className="p-2 hover:bg-muted rounded-md text-muted-foreground shrink-0"
              title={isDesktopOpen ? "Tutup Sidebar" : "Buka Sidebar"}
            >
              {isDesktopOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          
          <div className="p-6 lg:hidden flex justify-between items-center shrink-0">
            <span className="text-xl font-bold text-primary">Menu</span>
            <button onClick={() => setIsOpen(false)} className="-mr-2 p-2">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 px-3 mt-2 lg:mt-0 flex-1">
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
                  onClick={() => setIsOpen(false)}
                  title={!isDesktopOpen ? item.name : undefined}
                  className={cn(
                    "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors overflow-hidden",
                    isDesktopOpen ? "gap-3" : "lg:justify-center lg:px-0 gap-3",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className={cn("transition-all whitespace-nowrap", isDesktopOpen ? "opacity-100 w-auto block" : "lg:opacity-0 lg:w-0 lg:hidden block")}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t shrink-0">
          <div className={cn("mb-4 px-2", isDesktopOpen ? "block" : "lg:hidden block")}>
            <p className="text-sm font-medium truncate">{profile?.full_name || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              title={!isDesktopOpen ? "Logout" : undefined}
              className={cn(
                "flex items-center text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors overflow-hidden",
                isDesktopOpen ? "w-full px-3 py-2 gap-2" : "lg:justify-center lg:p-2 lg:w-auto w-full px-3 py-2 gap-2"
              )}
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <span className={cn("whitespace-nowrap", isDesktopOpen ? "block" : "lg:hidden block")}>
                Logout
              </span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
