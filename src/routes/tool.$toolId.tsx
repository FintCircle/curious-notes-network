import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { NOTEBOOKS, notesByTool, unslug } from "@/lib/data";
import { NoteList, Page, Tag, TopicTag } from "@/components/inktella";

export const Route = createFileRoute("/tool/$toolId")({
  loader: ({ params }) => ({ name: unslug(params.toolId) }),
  head: ({ params, loaderData }) => {
    const name = loaderData?.name ?? params.toolId;
    const title = `${name} — Inktella`;
    const description = `Notes from people using, testing and figuring out ${name}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/tool/${params.toolId}` },
      ],
      links: [{ rel: "canonical", href: `/tool/${params.toolId}` }],
    };
  },
  component: ToolPage,
});

const TABS = ["Notes", "Related topics", "Related tools"] as const;

function ToolPage() {
  const { name } = Route.useLoaderData();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Notes");
  const [observing, setObserving] = useState(false);
  const notes = notesByTool(name);

  const relatedTopics = Array.from(new Set(notes.flatMap((n) => n.topics)));
  const relatedTools = Array.from(new Set(notes.flatMap((n) => n.tools))).filter(
    (t) => t.toLowerCase() !== name.toLowerCase(),
  );
  const notebookCount = new Set(notes.map((n) => n.handle)).size;

  return (
    <Page>
      <Link to="/topics-and-tools" className="meta hover:text-foreground">
        ← Tools
      </Link>

      <div className="mt-4 flex flex-wrap items-start gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="note-title text-3xl font-medium sm:text-4xl">{name}</h1>
          <p className="mt-2 text-muted-foreground">
            Notes from people using, testing and figuring out {name}.
          </p>
        </div>
        <button
          onClick={() => setObserving((v) => !v)}
          aria-pressed={observing}
          className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
            observing
              ? "border-border bg-accent text-foreground"
              : "border-border hover:bg-accent"
          }`}
        >
          {observing ? "Observing" : "Observe tool"}
        </button>
      </div>

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

          <div className="mt-4">
            {tab === "Notes" && <NoteList notes={notes} />}
            {tab === "Related topics" && (
              <div className="flex flex-wrap gap-2 py-4">
                {relatedTopics.length ? (
                  relatedTopics.map((t) => <TopicTag key={t} label={t} />)
                ) : (
                  <p className="meta">Nothing noted yet.</p>
                )}
              </div>
            )}
            {tab === "Related tools" && (
              <div className="flex flex-wrap gap-2 py-4">
                {relatedTools.length ? (
                  relatedTools.map((t) => <Tag key={t} label={t} />)
                ) : (
                  <p className="meta">What are you using?</p>
                )}
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-6 border-t border-border pt-6 lg:border-t-0 lg:pt-0">
          <div>
            <h2 className="text-sm font-medium">Popular topics</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {relatedTopics.slice(0, 6).map((t) => (
                <TopicTag key={t} label={t} />
              ))}
            </div>
          </div>
          <div className="flex gap-8 border-t border-border pt-6">
            <div>
              <div className="note-title text-xl">{notes.length}</div>
              <div className="meta">Notes</div>
            </div>
            <div>
              <div className="note-title text-xl">{notebookCount}</div>
              <div className="meta">Notebooks</div>
            </div>
          </div>
          <div className="border-t border-border pt-6">
            <h2 className="text-sm font-medium">Notebooks noting about this</h2>
            <ul className="mt-3 space-y-2">
              {NOTEBOOKS.filter((nb) => notes.some((n) => n.handle === nb.handle)).map(
                (nb) => (
                  <li key={nb.handle}>
                    <Link
                      to="/notebook/$handle"
                      params={{ handle: nb.handle }}
                      className="meta hover:text-foreground"
                    >
                      {nb.title}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </aside>
      </div>
    </Page>
  );
}
