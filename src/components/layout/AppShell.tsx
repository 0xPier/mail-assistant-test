import type { ReactNode } from "react";

import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { NavLink } from "@/components/navigation/NavLink";
import type { Locale } from "@/i18n/config";

type NavigationItem = {
  label: string;
  href: string;
};

type AppShellProps = {
  locale: Locale;
  navigation: NavigationItem[];
  children: ReactNode;
};

export function AppShell({ navigation, children, locale }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden w-64 flex-shrink-0 border-r border-black/10 bg-background/80 p-6 md:block">
        <div className="mb-8 space-y-1">
          <div className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
            Mail Assistant
          </div>
          <div className="text-2xl font-semibold">Workspace</div>
        </div>
        <nav className="flex flex-col gap-2">
          {navigation.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1">
        <header className="flex items-center justify-end border-b border-black/10 bg-background/75 px-6 py-4">
          <LanguageSwitcher key={locale} />
        </header>
        <div className="px-6 py-10">{children}</div>
      </main>
    </div>
  );
}
