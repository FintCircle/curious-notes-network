import { createFileRoute, Link } from "@tanstack/react-router";
import { notesByTopic, unslug } from "@/lib/data";
import { NoteList, Page, Tag } from "@/components/inktella";

export const Route = createFileRoute("/topic/$topicId")({
  loader: ({ params }) => ({ name: unslug(params.topicId) }),
  head: ({ params, loaderData }) => {
    const name = loaderData?.name ?? params.topicId;
    const title = `${name} — Inktella`;
    const description = `Notes from people figuring out ${name}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/topic/${params.topicId}` },
      ],
      links: [{ rel: "canonical", href: `/topic/${params.topicId}` }],
    };
  },
  component: TopicPage,
});

function TopicPage() {
  const { name } = Route.useLoaderData();
  const notes = notesByTopic(name);
  const tools = Array.from(new Set(notes.flatMap((n) => n.tools)));

  return (
    <Page>
      <Link to="/topics-and-tools" className="meta hover:text-foreground">
        ← Topics
      </Link>
      <header className="mt-4 max-w-2xl">
        <h1 className="note-title text-3xl font-medium capitalize sm:text-4xl">{name}</h1>
        <p className="mt-2 text-muted-foreground">
          Notes from people figuring out {name.toLowerCase()}.
        </p>
      </header>

      {tools.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2 border-b border-border pb-6">
          {tools.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      )}

      <div className="mt-4">
        <NoteList notes={notes} />
      </div>
    </Page>
  );
}
