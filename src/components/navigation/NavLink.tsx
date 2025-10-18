"use client";

import { Link } from "next-intl/navigation";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(`${href}`));

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-foreground text-background"
          : "text-foreground/80 hover:bg-foreground/10 hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}
