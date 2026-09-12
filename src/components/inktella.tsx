import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  contextById,
  notebookByHandle,
  slugify,
  type ContextId,
  type Note,
} from "@/lib/data";

const CTX_DOT: Record<ContextId, string> = {
  building: "bg-ctx-building",
  tried: "bg-ctx-tried",
  learned: "bg-ctx-learned",
  exploring: "bg-ctx-exploring",
  broke: "bg-ctx-broke",
  discovered: "bg-ctx-discovered",
};

const CTX_TEXT: Record<ContextId, string> = {
  building: "text-ctx-building",
  tried: "text-ctx-tried",
  learned: "text-ctx-learned",
  exploring: "text-ctx-exploring",
  broke: "text-ctx-broke",
  discovered: "text-ctx-discovered",
};

export function ContextLabel({
  context,
  size = "sm",
}: {
  context: ContextId;
  size?: "sm" | "md";
}) {
  const def = contextById(context);
  return (
    <Link
      to="/context/$contextId"
      params={{ contextId: def.id }}
      className="inline-flex items-center gap-1.5 align-middle"
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${CTX_DOT[context]}`} />
      <span
        className={`${CTX_TEXT[context]} font-medium uppercase tracking-[0.09em] ${
          size === "sm" ? "text-[10px]" : "text-xs"
        }`}
      >
        {def.label}
      </span>
    </Link>
  );
}

export function ContextDot({ context }: { context: ContextId }) {
  return <span className={`h-2 w-2 rounded-full ${CTX_DOT[context]}`} />;
}

export function Avatar({
  name,
  size = 28,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-secondary font-medium text-secondary-foreground ${className}`}
    >
      {name.slice(0, 1).toUpperCase()}
    </span>
  );
}

export function Tag({ label }: { label: string }) {
  return (
    <Link
      to="/tool/$toolId"
      params={{ toolId: slugify(label) }}
      className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
    >
      {label}
    </Link>
  );
}

export function TopicTag({ label }: { label: string }) {
  return (
    <Link
      to="/topic/$topicId"
      params={{ topicId: slugify(label) }}
      className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
    >
      {label}
    </Link>
  );
}

export function NoteRow({
  note,
  showContext = true,
  showTags = true,
}: {
  note: Note;
  showContext?: boolean;
  showTags?: boolean;
}) {
  const nb = notebookByHandle(note.handle);
  return (
    <article className="group py-5 first:pt-0">
      {showContext && (
        <div className="mb-1.5">
          <ContextLabel context={note.context} />
        </div>
      )}
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="note-title text-lg font-medium sm:text-xl">
            <Link
              to="/notebook/$handle/$slug"
              params={{ handle: note.handle, slug: note.slug }}
              className="transition-colors group-hover:text-foreground/70"
            >
              {note.title}
            </Link>
          </h3>
          <div className="meta mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
            <Avatar name={nb?.name ?? "?"} size={20} />
            <Link
              to="/notebook/$handle"
              params={{ handle: note.handle }}
              className="text-foreground/80 hover:underline"
            >
              {nb?.name}
            </Link>
            <span aria-hidden>·</span>
            <Link
              to="/notebook/$handle"
              params={{ handle: note.handle }}
              className="hover:underline"
            >
              {nb?.title}
            </Link>
            <span aria-hidden>·</span>
            <span>{note.date}</span>
          </div>
          {showTags && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {note.topics.map((t) => (
                <TopicTag key={t} label={t} />
              ))}
              {note.tools.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
          )}
        </div>
        <div className="meta hidden shrink-0 items-center gap-4 pt-1 sm:flex">
          <span>{note.readMinutes} min</span>
          <span className="tabular-nums">{note.replies}</span>
        </div>
      </div>
    </article>
  );
}

export function NoteList({
  notes,
  showContext = true,
  showTags = true,
}: {
  notes: Note[];
  showContext?: boolean;
  showTags?: boolean;
}) {
  if (notes.length === 0) return <Empty>Nothing noted yet.</Empty>;
  return (
    <div className="divide-y divide-border">
      {notes.map((n) => (
        <NoteRow key={n.handle + n.slug} note={n} showContext={showContext} showTags={showTags} />
      ))}
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return (
    <p className="py-12 text-center text-sm text-muted-foreground">{children}</p>
  );
}

export function SectionHeading({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-baseline justify-between">
      <h2 className="text-base font-medium">{children}</h2>
      {action}
    </div>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-12">{children}</div>
  );
}
