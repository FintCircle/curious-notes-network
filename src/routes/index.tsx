import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ALL_TOOLS,
  CONTEXTS,
  NOTES,
  type Note,
} from "@/lib/data";
import { ContextDot, NoteList, Page, SectionHeading, Tag } from "@/components/inktella";
import { listLiveNotes } from "@/lib/notes.functions";

export const Route = createFileRoute("/")({
  loader: async () => ({ live: await listLiveNotes() }),
  head: () => ({
    meta: [
      { title: "Discover — Inktella" },
      {
        name: "description",
        content:
          "Real Notes from curious builders and makers: what they're building, trying, learning, breaking and discovering.",
      },
      { property: "og:title", content: "What people are figuring out — Inktella" },
      {
        property: "og:description",
        content: "A network of Notebooks from people building, trying and figuring things out.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Discover,
});

const TABS = ["For you", "Fresh", "From new Notebooks"] as const;

function tabNotes(tab: (typeof TABS)[number], live: Note[]): Note[] {
  if (tab === "Fresh") return [...live, ...NOTES.slice(2, 9)];
  if (tab === "From new Notebooks")
    return [...live, ...NOTES.filter((n) => ["theo", "kai", "lena", "jon"].includes(n.handle))];
  return [...live, ...NOTES.slice(0, 7)];
}

function Discover() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("For you");
  const { live } = Route.useLoaderData();


  return (
    <Page>
      <header className="max-w-2xl">
        <h1 className="note-title text-3xl font-medium sm:text-4xl">
          What people are figuring out.
        </h1>
        <p className="mt-2 text-muted-foreground">
          Real Notes from curious builders and makers.
        </p>
      </header>

      <section className="mt-10 border-t border-border pt-6" aria-labelledby="ctx-h">
        <SectionHeading
          action={
            <Link to="/topics-and-tools" className="meta hover:text-foreground">
              See all →
            </Link>
          }
        >
          <span id="ctx-h">Read by context</span>
        </SectionHeading>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
          {CONTEXTS.map((c) => (
            <li key={c.id}>
              <Link
                to="/context/$contextId"
                params={{ contextId: c.id }}
                className="group block"
              >
                <span className="flex items-center gap-2">
                  <ContextDot context={c.id} />
                  <span className="text-sm font-medium group-hover:underline">{c.label}</span>
                </span>
                <span className="meta mt-1 block leading-snug">{c.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 border-t border-border pt-4">
        <div className="mb-2 flex gap-6 border-b border-border" role="tablist">
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
        <NoteList notes={tabNotes(tab, live)} />
      </section>

      <section className="mt-10 border-t border-border pt-6">
        <SectionHeading>Tools people are using</SectionHeading>
        <div className="flex flex-wrap gap-2">
          {ALL_TOOLS.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      </section>

      <section className="mt-12 rule border-t border-border pt-8 pb-8">
        <h2 className="note-title text-2xl font-medium">Always building something?</h2>
        <p className="mt-1 text-muted-foreground">Keep Notes along the way.</p>
        <Link
          to="/start-notebook"
          className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Start your Notebook — $1/month
        </Link>
      </section>
    </Page>
  );
}
