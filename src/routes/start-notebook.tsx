import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/start-notebook")({
  head: () => ({
    meta: [
      { title: "Start your Notebook — Inktella" },
      {
        name: "description",
        content:
          "A place for what you're building, trying and figuring out — connected to the Inktella network. $1/month.",
      },
      { property: "og:title", content: "Start your Notebook — Inktella" },
      {
        property: "og:description",
        content: "Publish Notes, organise Collections and be discovered across the network.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/start-notebook" },
    ],
    links: [{ rel: "canonical", href: "/start-notebook" }],
  }),
  component: StartNotebook,
});

const INCLUDES = [
  "Publish Notes",
  "Your own Notebook page",
  "Organize with Collections",
  "Images, GIFs and embeds",
  "Network discovery",
  "Context discovery",
  "Topic & Tool discovery",
  "Observers",
  "Simple writing experience",
];

function StartNotebook() {
  return (
    <div className="mx-auto w-full max-w-xl px-5 py-12 sm:px-8 sm:py-20">
      <h1 className="note-title text-3xl font-medium sm:text-4xl">Start your Notebook</h1>
      <p className="mt-3 text-muted-foreground">
        A place for what you're building, trying and figuring out — connected to the Inktella
        network.
      </p>

      <p className="note-title mt-8 text-4xl">
        $1<span className="text-lg text-muted-foreground">/month</span>
      </p>

      <h2 className="mt-10 text-sm font-medium">Your Notebook includes</h2>
      <ul className="mt-4 space-y-2.5 text-sm">
        {INCLUDES.map((i) => (
          <li key={i} className="flex gap-3">
            <span aria-hidden className="text-muted-foreground">
              ✓
            </span>
            {i}
          </li>
        ))}
      </ul>

      <button className="mt-10 w-full rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
        Start my Notebook — $1/month
      </button>

      <p className="meta mt-4">
        Reading Inktella is free. A Notebook is only needed to publish.
      </p>
    </div>
  );
}
