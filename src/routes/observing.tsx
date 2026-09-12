import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { contextById, noteById, notebookByHandle, NOTEBOOKS, OBSERVING } from "@/lib/data";
import { Avatar, Empty, Page } from "@/components/inktella";

export const Route = createFileRoute("/observing")({
  head: () => ({
    meta: [
      { title: "Observing — Inktella" },
      {
        name: "description",
        content: "New Notes from the Notebooks you observe on Inktella.",
      },
      { property: "og:title", content: "Observing — Inktella" },
      {
        property: "og:description",
        content: "Check in on the people whose curiosity interests you.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/observing" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/observing" }],
  }),
  component: Observing,
});

function Observing() {
  const [tab, setTab] = useState<"Recent" | "Notebooks">("Recent");
  const observed = NOTEBOOKS.filter((n) =>
    OBSERVING.some((o) => o.handle === n.handle),
  );

  return (
    <Page>
      <header className="max-w-2xl">
        <h1 className="note-title text-3xl font-medium sm:text-4xl">Observing</h1>
        <p className="mt-2 text-muted-foreground">
          New Notes from Notebooks you're keeping up with.
        </p>
      </header>

      <div className="mt-8 flex gap-6 border-b border-border" role="tablist">
        {(["Recent", "Notebooks"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 pb-2 text-sm transition-colors ${
              tab === t
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Recent" ? (
        <div className="mt-2 divide-y divide-border">
          {OBSERVING.length === 0 && (
            <Empty>
              Your Observing feed is quiet. Explore Inktella and Observe Notebooks you'd like
              to hear from again.
            </Empty>
          )}
          {OBSERVING.map((item) => {
            const note = noteById(item.handle, item.slug);
            const nb = notebookByHandle(item.handle);
            if (!note || !nb) return null;
            return (
              <article key={item.slug} className="py-5">
                <p className="meta flex items-center gap-2">
                  <Avatar name={nb.name} size={20} />
                  <span className="text-foreground/80">{nb.name} added a Note</span>
                </p>
                <h2 className="note-title mt-2 text-lg font-medium sm:text-xl">
                  <Link
                    to="/notebook/$handle/$slug"
                    params={{ handle: note.handle, slug: note.slug }}
                    className="hover:text-foreground/70"
                  >
                    {note.title}
                  </Link>
                </h2>
                <p className="meta mt-1.5">
                  {contextById(note.context).label} · {item.when}
                </p>
              </article>
            );
          })}
        </div>
      ) : (
        <ul className="mt-2 divide-y divide-border">
          {observed.map((nb) => (
            <li key={nb.handle} className="flex items-center gap-3 py-4">
              <Avatar name={nb.name} size={36} />
              <div className="min-w-0">
                <Link
                  to="/notebook/$handle"
                  params={{ handle: nb.handle }}
                  className="text-sm font-medium hover:underline"
                >
                  {nb.title}
                </Link>
                <p className="meta truncate">{nb.bio}</p>
              </div>
              <span className="ml-auto rounded-md border border-border px-3 py-1 text-xs text-muted-foreground">
                Observing
              </span>
            </li>
          ))}
        </ul>
      )}
    </Page>
  );
}
