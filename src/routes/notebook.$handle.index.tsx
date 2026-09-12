import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { notebookByHandle, notesByHandle } from "@/lib/data";
import { Avatar, ContextLabel, Empty, Page, Tag } from "@/components/inktella";

export const Route = createFileRoute("/notebook/$handle/")({
  loader: ({ params }) => {
    const notebook = notebookByHandle(params.handle);
    if (!notebook) throw notFound();
    return { notebook, notes: notesByHandle(params.handle) };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable — Inktella" }, { name: "robots", content: "noindex" }] };
    }
    const { notebook } = loaderData;
    const title = `${notebook.title} — Inktella`;
    return {
      meta: [
        { title },
        { name: "description", content: notebook.bio },
        { property: "og:title", content: title },
        { property: "og:description", content: notebook.bio },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: `/notebook/${params.handle}` },
      ],
      links: [{ rel: "canonical", href: `/notebook/${params.handle}` }],
    };
  },
  component: NotebookPage,
});

const TABS = ["Notes", "Collections", "About"] as const;

const COLLECTIONS = [
  "Cloudflare Adventures",
  "Things I Learned",
  "Domains I Probably Didn't Need",
];

function NotebookPage() {
  const { notebook, notes } = Route.useLoaderData();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Notes");
  const [observing, setObserving] = useState(false);

  return (
    <Page>
      <header className="flex flex-wrap items-start gap-5">
        <Avatar name={notebook.name} size={72} className="font-serif" />
        <div className="min-w-0 flex-1">
          <h1 className="note-title text-2xl font-medium sm:text-3xl">{notebook.title}</h1>
          <p className="meta mt-0.5">@{notebook.handle}</p>
          <p className="mt-3 max-w-xl text-foreground/80">{notebook.bio}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {notebook.often.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        </div>
        <button
          onClick={() => setObserving((v) => !v)}
          aria-pressed={observing}
          className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
            observing ? "border-border bg-accent" : "border-border hover:bg-accent"
          }`}
        >
          {observing ? "✓ Observing" : "Observe"}
        </button>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div>
          <div className="flex gap-6 border-b border-border" role="tablist">
            {TABS.map((t) => (
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

          {tab === "Notes" && (
            <div className="divide-y divide-border">
              {notes.length === 0 && <Empty>Nothing noted yet.</Empty>}
              {notes.map((n) => (
                <article key={n.slug} className="flex gap-5 py-5">
                  <span className="meta w-14 shrink-0 pt-1 uppercase tracking-wide">
                    {n.date}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="note-title text-lg font-medium">
                      <Link
                        to="/notebook/$handle/$slug"
                        params={{ handle: n.handle, slug: n.slug }}
                        className="hover:text-foreground/70"
                      >
                        {n.title}
                      </Link>
                    </h2>
                    <div className="meta mt-2 flex items-center gap-3">
                      <ContextLabel context={n.context} />
                      <span>{n.readMinutes} min</span>
                    </div>
                  </div>
                  <span className="meta hidden shrink-0 pt-1 tabular-nums sm:block">
                    {n.replies}
                  </span>
                </article>
              ))}
            </div>
          )}

          {tab === "Collections" && (
            <ul className="divide-y divide-border">
              {COLLECTIONS.map((c) => (
                <li key={c} className="py-4">
                  <span className="note-title text-lg">{c}</span>
                  <p className="meta mt-1">
                    {Math.max(2, notes.length - COLLECTIONS.indexOf(c) * 2)} Notes
                  </p>
                </li>
              ))}
            </ul>
          )}

          {tab === "About" && (
            <div className="max-w-prose space-y-4 py-6 text-foreground/85">
              {notebook.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {notebook.link && (
                <a
                  href={notebook.link}
                  className="inline-block text-sm underline underline-offset-4"
                >
                  {notebook.link.replace("https://", "")}
                </a>
              )}
            </div>
          )}
        </div>

        <aside className="space-y-6 border-t border-border pt-6 lg:border-t-0 lg:pt-0">
          <div>
            <h2 className="text-sm font-medium">About</h2>
            <div className="mt-2 space-y-3 text-sm text-muted-foreground">
              {notebook.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {notebook.link && (
              <a
                href={notebook.link}
                className="meta mt-3 inline-block underline underline-offset-4"
              >
                {notebook.link.replace("https://", "")}
              </a>
            )}
          </div>
          <div className="border-t border-border pt-6">
            <h2 className="text-sm font-medium">Often noting about</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {notebook.often.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
          </div>
          <div className="flex gap-8 border-t border-border pt-6">
            <div>
              <div className="note-title text-xl">{notebook.observers}</div>
              <div className="meta">Observers</div>
            </div>
            <div>
              <div className="note-title text-xl">{notebook.noteCount}</div>
              <div className="meta">Notes</div>
            </div>
          </div>
        </aside>
      </div>
    </Page>
  );
}
