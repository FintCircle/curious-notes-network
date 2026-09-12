import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { CONTEXTS, notesByContext, type ContextId } from "@/lib/data";
import { ContextDot, NoteList, Page } from "@/components/inktella";

export const Route = createFileRoute("/context/$contextId")({
  loader: ({ params }) => {
    const def = CONTEXTS.find((c) => c.id === params.contextId);
    if (!def) throw notFound();
    return { def };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable — Inktella" }, { name: "robots", content: "noindex" }] };
    }
    const { def } = loaderData;
    const title = `${def.label} — Inktella`;
    return {
      meta: [
        { title },
        { name: "description", content: def.page },
        { property: "og:title", content: title },
        { property: "og:description", content: def.page },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/context/${params.contextId}` },
      ],
      links: [{ rel: "canonical", href: `/context/${params.contextId}` }],
    };
  },
  component: ContextPage,
});

function ContextPage() {
  const { def } = Route.useLoaderData();
  const [sort, setSort] = useState<"Recent" | "Popular">("Recent");
  const notes = notesByContext(def.id as ContextId);
  const sorted =
    sort === "Popular" ? [...notes].sort((a, b) => b.interesting - a.interesting) : notes;

  return (
    <Page>
      <Link to="/" className="meta hover:text-foreground">
        ← Discover
      </Link>
      <header className="mt-4 max-w-2xl">
        <h1 className="note-title flex items-center gap-3 text-3xl font-medium sm:text-4xl">
          <ContextDot context={def.id} />
          {def.label}
        </h1>
        <p className="mt-2 text-lg text-foreground/80">{def.short}.</p>
        <p className="mt-2 text-muted-foreground">{def.page}</p>
      </header>

      <div className="mt-8 flex gap-6 border-b border-border" role="tablist">
        {(["Recent", "Popular"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={sort === t}
            onClick={() => setSort(t)}
            className={`-mb-px border-b-2 pb-2 text-sm transition-colors ${
              sort === t
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <NoteList notes={sorted} showContext={false} />
      </div>
    </Page>
  );
}
