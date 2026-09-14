import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ALL_TOOLS, ALL_TOPICS, CONTEXTS, type ContextId } from "@/lib/data";
import { ContextDot } from "@/components/inktella";
import { useAuth } from "@/hooks/useAuth";
import { ensureNotebook, publishNote } from "@/lib/publish";

export const Route = createFileRoute("/compose")({
  head: () => ({
    meta: [
      { title: "New Note — Inktella" },
      { name: "description", content: "Write a Note about what you're figuring out." },
      { property: "og:title", content: "New Note — Inktella" },
      { property: "og:description", content: "A simple, focused editor for your Notes." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Compose,
});

const FORMATS = ["B", "I", "Link", "H2", "Quote", "Image", "Code"] as const;
const SUGGESTIONS = [...ALL_TOPICS, ...ALL_TOOLS];

function Compose() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [context, setContext] = useState<ContextId | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!title && !body) return;
    const t = setTimeout(() => setSavedAt("just now"), 900);
    return () => clearTimeout(t);
  }, [title, body]);

  const matches = useMemo(() => {
    const q = tagInput.trim().toLowerCase();
    if (!q) return [];
    return SUGGESTIONS.filter(
      (s) => s.toLowerCase().includes(q) && !tags.includes(s),
    ).slice(0, 6);
  }, [tagInput, tags]);

  const addTag = (t: string) => {
    setTags((prev) => (prev.includes(t) ? prev : [...prev, t]));
    setTagInput("");
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-8 sm:px-8 sm:py-12">
      <div className="flex items-baseline justify-between">
        <h1 className="note-title text-2xl font-medium">New Note</h1>
        <span className="meta">{savedAt ? `Saved ${savedAt}` : "Not saved yet"}</span>
      </div>

      <div className="mt-8">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What are you figuring out?"
          className="note-title mt-2 w-full rounded-md border border-input bg-surface px-3 py-2.5 text-lg outline-none placeholder:font-sans placeholder:text-base placeholder:text-muted-foreground focus:border-ring"
        />
      </div>

      <div className="mt-6">
        <label htmlFor="body" className="text-sm font-medium">
          Note
        </label>
        <textarea
          id="body"
          rows={10}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Start writing..."
          className="mt-2 w-full resize-y rounded-md border border-input bg-surface px-3 py-3 leading-relaxed outline-none placeholder:text-muted-foreground focus:border-ring"
        />
        <div className="mt-2 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          {FORMATS.map((f) => (
            <button
              key={f}
              type="button"
              className="rounded px-2 py-1 transition-colors hover:bg-accent hover:text-foreground"
            >
              {f}
            </button>
          ))}
          <span className="meta ml-auto">Markdown</span>
        </div>
      </div>

      <fieldset className="mt-8">
        <legend className="text-sm font-medium">
          Context <span className="meta">(choose one)</span>
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {CONTEXTS.map((c) => (
            <label
              key={c.id}
              className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors ${
                context === c.id ? "border-foreground bg-accent" : "border-border hover:bg-accent"
              }`}
            >
              <input
                type="radio"
                name="context"
                className="sr-only"
                checked={context === c.id}
                onChange={() => setContext(c.id)}
              />
              <ContextDot context={c.id} />
              {c.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8">
        <label htmlFor="tags" className="text-sm font-medium">
          Topics & Tools
        </label>
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTags((p) => p.filter((x) => x !== t))}
                className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground hover:text-foreground"
              >
                {t} ×
              </button>
            ))}
          </div>
        )}
        <input
          id="tags"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Add topics or tools..."
          className="mt-2 w-full rounded-md border border-input bg-surface px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-ring"
        />
        {matches.length > 0 && (
          <ul className="mt-2 overflow-hidden rounded-md border border-border">
            {matches.map((m) => (
              <li key={m}>
                <button
                  onClick={() => addTag(m)}
                  className="w-full px-3 py-2 text-left text-sm transition-colors hover:bg-accent"
                >
                  {m}
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="meta mt-2">Start typing to find existing topics and tools.</p>
      </div>

      <div className="mt-8 flex items-center justify-end border-t border-border pt-6">
        <button
          disabled={!title || !context}
          className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
