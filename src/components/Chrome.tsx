import { Link, useRouterState } from "@tanstack/react-router";
import { Avatar } from "@/components/inktella";

const NAV = [
  { to: "/", label: "Discover", exact: true },
  { to: "/observing", label: "Observing" },
  { to: "/topics-and-tools", label: "Topics & Tools" },
] as const;

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="9" cy="9" r="6" />
      <path d="m13.5 13.5 3.5 3.5" strokeLinecap="round" />
    </svg>
  );
}

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center gap-6 px-5 sm:px-8">
        <Link to="/" className="note-title text-lg font-semibold tracking-tight">
          Inktella
        </Link>
        <nav className="hidden items-center gap-5 sm:flex" aria-label="Main">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/search"
            aria-label="Search Inktella"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <SearchIcon />
          </Link>
          <Link
            to="/compose"
            className="hidden items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent sm:inline-flex"
          >
            <span aria-hidden>+</span> Note
          </Link>
          <Link to="/notebook/$handle" params={{ handle: "derrick" }} aria-label="Your account">
            <Avatar name="Derrick" size={28} />
          </Link>
        </div>
      </div>
    </header>
  );
}

const MOBILE = [
  { to: "/", label: "Discover", exact: true },
  { to: "/observing", label: "Observing" },
  { to: "/compose", label: "Note" },
  { to: "/search", label: "Search" },
  { to: "/notebook/derrick", label: "Me" },
] as const;

export function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur sm:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)]">
        {MOBILE.map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          return (
            <li key={item.to} className="flex-1">
              <Link
                to={item.to}
                className={`flex h-14 flex-col items-center justify-center gap-1 text-[11px] ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.label === "Note" ? (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-base leading-none text-primary-foreground">
                    +
                  </span>
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                )}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
