"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, LayoutGrid, Search, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // If we are on login page, just render children.
  if (pathname === "/") return <>{children}</>;

  return (
    <div className="min-h-screen bg-background flex justify-center bg-gradient-to-b from-background to-black">
      <div className="w-full max-w-md h-full min-h-screen bg-background relative flex flex-col shadow-2xl overflow-hidden border-x border-white/5">
        <main className="flex-1 overflow-y-auto pb-20 no-scrollbar relative z-10">
          {children}
        </main>

        {/* Glow effect behind nav */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-40 pointer-events-none" />

        <nav className="absolute bottom-0 left-0 right-0 h-20 bg-card/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-around z-50 px-2 pb-2">
          <Link href="/dashboard" className={cn("p-3 rounded-full transition-all duration-300 flex flex-col items-center gap-1", pathname === "/dashboard" ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
            <Home size={24} strokeWidth={pathname === "/dashboard" ? 2.5 : 2} className={cn("transition-all", pathname === "/dashboard" && "drop-shadow-[0_0_8px_hsl(265,89%,66%,0.5)]")} />
            <span className="text-[10px] font-medium">{pathname === "/dashboard" && "Home"}</span>
          </Link>
          <Link href="/tools" className={cn("p-3 rounded-full transition-all duration-300 flex flex-col items-center gap-1", pathname?.startsWith("/tools") ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
            <LayoutGrid size={24} strokeWidth={pathname?.startsWith("/tools") ? 2.5 : 2} className={cn("transition-all", pathname?.startsWith("/tools") && "drop-shadow-[0_0_8px_hsl(265,89%,66%,0.5)]")} />
            <span className="text-[10px] font-medium">{pathname?.startsWith("/tools") && "Tools"}</span>
          </Link>

          <div className="relative -top-6">
            <button className="p-4 bg-gradient-to-tr from-primary to-secondary text-primary-foreground rounded-full shadow-[0_0_20px_hsl(265,89%,66%,0.6)] transform hover:scale-110 transition-transform duration-300 border-4 border-background">
              <Search size={28} strokeWidth={2.5} />
            </button>
          </div>

          <Link href="/notifications" className={cn("p-3 rounded-full transition-all duration-300 flex flex-col items-center gap-1", pathname === "/notifications" ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
            <Bell size={24} strokeWidth={pathname === "/notifications" ? 2.5 : 2} className={cn("transition-all", pathname === "/notifications" && "drop-shadow-[0_0_8px_hsl(265,89%,66%,0.5)]")} />
            <span className="text-[10px] font-medium">{pathname === "/notifications" && "Alerts"}</span>
          </Link>
          <Link href="/profile" className={cn("p-3 rounded-full transition-all duration-300 flex flex-col items-center gap-1", pathname === "/profile" ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
            <User size={24} strokeWidth={pathname === "/profile" ? 2.5 : 2} className={cn("transition-all", pathname === "/profile" && "drop-shadow-[0_0_8px_hsl(265,89%,66%,0.5)]")} />
            <span className="text-[10px] font-medium">{pathname === "/profile" && "Profile"}</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
