import React from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Watermark } from "./Watermark";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  ClipboardList,
  BarChart3,
  LogOut,
  ScanFace,
  Camera
} from "lucide-react";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location] = useLocation();

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "Employees", href: "/employees" },
    { icon: UserPlus, label: "Register Employee", href: "/register" },
    { icon: ScanFace, label: "Live Attendance", href: "/attendance" }, // Added for easy access
    { icon: ClipboardList, label: "Attendance Logs", href: "/logs" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
  ];

  return (
    <div className="flex min-h-screen w-full bg-muted/20">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-sidebar text-sidebar-foreground md:flex">
        <div className="flex h-16 items-center border-b border-sidebar-border px-6">
          <div className="flex items-center gap-2 font-bold text-lg text-sidebar-primary-foreground">
            <ScanFace className="h-6 w-6" />
            <span>StaffSense AI</span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="grid gap-1 px-2">
            {sidebarItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <a
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      location === item.href
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <Link href="/">
            <a className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <LogOut className="h-4 w-4" />
              Logout
            </a>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col">
        <header className="flex h-16 items-center border-b bg-background px-6 md:hidden">
          <div className="flex items-center gap-2 font-bold text-lg">
            <ScanFace className="h-6 w-6 text-primary" />
            <span>StaffSense AI</span>
          </div>
        </header>
        <div className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </div>
        <Watermark />
      </main>
    </div>
  );
};
