import { createFileRoute } from "@tanstack/react-router";
import { ALL_TOOLS, ALL_TOPICS, CONTEXTS } from "@/lib/data";
import { ContextDot, Page, SectionHeading, Tag, TopicTag } from "@/components/inktella";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/topics-and-tools")({
  head: () => ({
    meta: [
      { title: "Topics & Tools — Inktella" },
      {
        name: "description",
        content:
          "Browse what people across Inktella are writing about and the tools they're using.",
      },
      { property: "og:title", content: "Topics & Tools — Inktella" },
      {
        property: "og:description",
        content: "What people across the network are working with right now.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/topics-and-tools" },
    ],
    links: [{ rel: "canonical", href: "/topics-and-tools" }],
  }),
  component: TopicsAndTools,
});

function TopicsAndTools() {
  return (
    <Page>
      <header className="max-w-2xl">
        <h1 className="note-title text-3xl font-medium sm:text-4xl">Topics & Tools</h1>
        <p className="mt-2 text-muted-foreground">
          What people are working with, and what they're working on.
        </p>
      </header>

      <section className="mt-10 border-t border-border pt-6">
        <SectionHeading>Topics</SectionHeading>
        <div className="flex flex-wrap gap-2">
          {ALL_TOPICS.map((t) => (
            <TopicTag key={t} label={t} />
          ))}
        </div>
      </section>

      <section className="mt-10 border-t border-border pt-6">
        <SectionHeading>Tools</SectionHeading>
        <div className="flex flex-wrap gap-2">
          {ALL_TOOLS.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      </section>

      <section className="mt-10 border-t border-border pt-6">
        <SectionHeading>Read by context</SectionHeading>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONTEXTS.map((c) => (
            <li key={c.id}>
              <Link to="/context/$contextId" params={{ contextId: c.id }} className="group block">
                <span className="flex items-center gap-2">
                  <ContextDot context={c.id} />
                  <span className="text-sm font-medium group-hover:underline">{c.label}</span>
                </span>
                <span className="meta mt-1 block">{c.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
