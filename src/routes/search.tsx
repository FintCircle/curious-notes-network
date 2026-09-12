import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ALL_TOOLS, ALL_TOPICS, NOTEBOOKS, NOTES, slugify } from "@/lib/data";
import { NoteList, Page, Tag, TopicTag } from "@/components/inktella";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — Inktella" },
      {
        name: "description",
        content: "Search Notes, Notebooks, Topics and Tools across the Inktella network.",
      },
      { property: "og:title", content: "Search — Inktella" },
      {
        property: "og:description",
        content: "Enter the network through something you're already curious about.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/search" },
    ],
    links: [{ rel: "canonical", href: "/search" }],
  }),
  component: Search,
});

function Search() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const results = useMemo(() => {
    if (!query) return null;
    return {
      tools: ALL_TOOLS.filter((t) => t.toLowerCase().includes(query)),
      topics: ALL_TOPICS.filter((t) => t.toLowerCase().includes(query)),
      notes: NOTES.filter(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.tools.some((t) => t.toLowerCase().includes(query)) ||
          n.topics.some((t) => t.toLowerCase().includes(query)),
      ),
      notebooks: NOTEBOOKS.filter(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.name.toLowerCase().includes(query) ||
          n.bio.toLowerCase().includes(query),
      ),
    };
  }, [query]);

  return (
    <Page>
      <h1 className="note-title text-3xl font-medium sm:text-4xl">Search</h1>
      <label htmlFor="q" className="sr-only">
        Search Notes, Notebooks, Topics and Tools
      </label>
      <input
        id="q"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Try Cloudflare, authentication, local AI…"
        className="mt-5 w-full rounded-md border border-input bg-surface px-4 py-3 outline-none placeholder:text-muted-foreground focus:border-ring"
      />

      {!results && (
        <div className="mt-8 border-t border-border pt-6">
          <p className="meta">Popular right now</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {ALL_TOOLS.slice(0, 10).map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        </div>
      )}

      {results && (
        <div className="mt-8 space-y-10">
          {results.tools.length > 0 && (
            <section>
              <h2 className="meta uppercase tracking-[0.09em]">Tools</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {results.tools.map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>
            </section>
          )}
          {results.topics.length > 0 && (
            <section>
              <h2 className="meta uppercase tracking-[0.09em]">Topics</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {results.topics.map((t) => (
                  <TopicTag key={t} label={t} />
                ))}
              </div>
            </section>
          )}
          <section>
            <h2 className="meta uppercase tracking-[0.09em]">Notes</h2>
            <div className="mt-2">
              <NoteList notes={results.notes} />
            </div>
          </section>
          {results.notebooks.length > 0 && (
            <section>
              <h2 className="meta uppercase tracking-[0.09em]">Notebooks</h2>
              <ul className="mt-3 divide-y divide-border">
                {results.notebooks.map((nb) => (
                  <li key={nb.handle} className="py-3">
                    <Link
                      to="/notebook/$handle"
                      params={{ handle: nb.handle }}
                      className="text-sm font-medium hover:underline"
                    >
                      {nb.title}
                    </Link>
                    <p className="meta">{nb.bio}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {results.notes.length === 0 &&
            results.notebooks.length === 0 &&
            results.tools.length === 0 &&
            results.topics.length === 0 && (
              <p className="meta">
                Nothing noted about “{q}” yet. Maybe you could be the first.
              </p>
            )}
        </div>
      )}

      <p className="sr-only">{slugify(q)}</p>
    </Page>
  );
}
