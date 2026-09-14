import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { contextById, noteById, notebookByHandle, notesByHandle } from "@/lib/data";
import { Avatar, ContextLabel, Tag, TopicTag } from "@/components/inktella";
import { CommentsSection } from "@/components/comments/CommentsSection";
import { noteRef } from "@/lib/comments";
import { getLiveNote, getLiveNotebook } from "@/lib/notes.functions";

export const Route = createFileRoute("/notebook/$handle/$slug")({
  loader: async ({ params }) => {
    const live = await getLiveNote({ data: { handle: params.handle, slug: params.slug } });
    const note = live.note ?? noteById(params.handle, params.slug);
    const notebook = live.notebook ?? notebookByHandle(params.handle);
    if (!note || !notebook) throw notFound();
    const liveMore = live.note
      ? (await getLiveNotebook({ data: { handle: params.handle } })).notes
      : [];
    return {
      note,
      notebook,
      more: [...liveMore, ...notesByHandle(params.handle)]
        .filter((n) => n.slug !== params.slug)
        .slice(0, 3),
    };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable — Inktella" }, { name: "robots", content: "noindex" }] };
    }
    const { note, notebook } = loaderData;
    const description = note.body[0];
    const url = `/notebook/${params.handle}/${params.slug}`;
    return {
      meta: [
        { title: `${note.title} — Inktella` },
        { name: "description", content: description },
        { property: "og:title", content: note.title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: note.title,
            author: { "@type": "Person", name: notebook.name },
            keywords: [...note.topics, ...note.tools].join(", "),
          }),
        },
      ],
    };
  },
  component: NoteView,
});

function NoteView() {
  const { note, notebook, more } = Route.useLoaderData();
  const [interesting, setInteresting] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-8 sm:px-8 sm:py-12">
      <Link
        to="/notebook/$handle"
        params={{ handle: notebook.handle }}
        className="meta hover:text-foreground"
      >
        ← {notebook.title}
      </Link>

      <article className="mt-6">
        <div className="meta flex flex-wrap items-center gap-2 uppercase tracking-[0.08em]">
          <ContextLabel context={note.context} />
          <span aria-hidden>·</span>
          <span>{note.date}, 2026</span>
          <span aria-hidden>·</span>
          <span>{note.readMinutes} min</span>
        </div>

        <h1 className="note-title mt-4 text-3xl font-medium sm:text-4xl">{note.title}</h1>

        <div className="mt-6 flex items-center gap-3 border-b border-border pb-6">
          <Avatar name={notebook.name} size={40} />
          <div>
            <Link
              to="/notebook/$handle"
              params={{ handle: notebook.handle }}
              className="block text-sm font-medium hover:underline"
            >
              {notebook.name}
            </Link>
            <span className="meta">@{notebook.handle}</span>
          </div>
        </div>

        <div className="mt-8 space-y-5 text-[1.0625rem] leading-[1.75] text-foreground/90">
          {note.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <pre className="overflow-x-auto rounded-md border border-border bg-muted p-4 font-mono text-sm">
            <code>{`// Example\nconst env = c.env;\nconst result = await env.DB.prepare(\n  "select 1"\n).all();`}</code>
          </pre>
        </div>
      </article>

      <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-border pt-5">
        <button
          onClick={() => setInteresting((v) => !v)}
          aria-pressed={interesting}
          className={`text-sm transition-colors ${
            interesting ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Interesting <span className="tabular-nums">{note.interesting + (interesting ? 1 : 0)}</span>
        </button>
        <button
          onClick={() => setSaved((v) => !v)}
          aria-pressed={saved}
          className={`text-sm transition-colors ${
            saved ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {saved ? "Saved" : "Save"}
        </button>
        <button className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          Share
        </button>
      </div>

      <section className="mt-8 border-t border-border pt-6">
        <h2 className="text-sm font-medium">Topics & Tools</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {note.topics.map((t) => (
            <TopicTag key={t} label={t} />
          ))}
          {note.tools.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      </section>

      <CommentsSection noteRef={noteRef(note.handle, note.slug)} />

      {more.length > 0 && (
        <section className="mt-10 border-t border-border pt-6">
          <h2 className="text-sm font-medium">More from {notebook.title}</h2>
          <ul className="mt-3 divide-y divide-border">
            {more.map((n) => (
              <li key={n.slug} className="py-3">
                <Link
                  to="/notebook/$handle/$slug"
                  params={{ handle: n.handle, slug: n.slug }}
                  className="note-title text-base hover:text-foreground/70"
                >
                  {n.title}
                </Link>
                <p className="meta mt-1">
                  {contextById(n.context).label} · {n.readMinutes} min
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
