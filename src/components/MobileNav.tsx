import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, Eye, Plus, Search, User } from "lucide-react";
import type { ReactNode } from "react";

function Item({
  active,
  label,
  children,
}: {
  active: boolean;
  label: string;
  children?: ReactNode;
}) {
  return (
    <span
      className={`flex h-14 flex-col items-center justify-center gap-1 text-[11px] ${
        active ? "text-foreground" : "text-muted-foreground"
      }`}
    >
      {children ?? <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />}
      {label}
    </span>
  );
}

export function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur sm:hidden"
    >
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)]">
        <Link to="/" className="flex-1">
          <Item active={pathname === "/"} label="Discover">
            <Compass size={20} strokeWidth={1.75} />
          </Item>
        </Link>
        <Link to="/observing" className="flex-1">
          <Item active={pathname.startsWith("/observing")} label="Observing">
            <Eye size={20} strokeWidth={1.75} />
          </Item>
        </Link>
        <Link to="/compose" className="flex-1">
          <Item active={pathname.startsWith("/compose")} label="Note">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Plus size={18} strokeWidth={2.5} />
            </span>
          </Item>
        </Link>
        <Link to="/search" className="flex-1">
          <Item active={pathname.startsWith("/search")} label="Search">
            <Search size={20} strokeWidth={1.75} />
          </Item>
        </Link>
        <Link to="/notebook/$handle" params={{ handle: "derrick" }} className="flex-1">
          <Item active={pathname.startsWith("/notebook/derrick")} label="Me">
            <User size={20} strokeWidth={1.75} />
          </Item>
        </Link>
      </div>
    </nav>
  );
}
