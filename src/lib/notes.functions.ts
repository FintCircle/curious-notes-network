import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { ContextId, Note, Notebook } from "@/lib/data";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const url = process.env["SUPABASE_URL"]!;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

const NOTE_COLUMNS =
  "id, handle, slug, title, context, body, topics, tools, published_at, created_at";

type NoteRow = {
  id: string;
  handle: string;
  slug: string;
  title: string;
  context: string;
  body: string;
  topics: string[];
  tools: string[];
  published_at: string | null;
  created_at: string;
};

type NotebookRow = {
  handle: string;
  title: string;
  bio: string;
  about: string;
  link: string | null;
};

export function toNote(row: NoteRow): Note {
  const paragraphs = row.body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  const words = row.body.split(/\s+/).filter(Boolean).length;
  const when = new Date(row.published_at ?? row.created_at);
  return {
    slug: row.slug,
    title: row.title,
    handle: row.handle,
    context: row.context as ContextId,
    date: when.toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
    readMinutes: Math.max(1, Math.round(words / 200)),
    replies: 0,
    interesting: 0,
    topics: row.topics ?? [],
    tools: row.tools ?? [],
    body: paragraphs.length > 0 ? paragraphs : [row.title],
  };
}

export function toNotebook(row: NotebookRow, noteCount: number): Notebook {
  const about = row.about
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  return {
    handle: row.handle,
    name: row.title.replace(/'s Notebook$/, ""),
    title: row.title,
    bio: row.bio,
    about: about.length > 0 ? about : [row.bio].filter(Boolean),
    ...(row.link ? { link: row.link } : {}),
    often: [],
    observers: 0,
    noteCount,
  };
}

export const getLiveNotebook = createServerFn({ method: "GET" })
  .inputValidator((data: { handle: string }) => data)
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { data: nb } = await supabase
      .from("notebooks")
      .select("handle, title, bio, about, link")
      .eq("handle", data.handle)
      .maybeSingle();
    const { data: rows } = await supabase
      .from("notes")
      .select(NOTE_COLUMNS)
      .eq("handle", data.handle)
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    const notes = ((rows ?? []) as NoteRow[]).map(toNote);
    return {
      notebook: nb ? toNotebook(nb as NotebookRow, notes.length) : null,
      notes,
    };
  });

export const getLiveNote = createServerFn({ method: "GET" })
  .inputValidator((data: { handle: string; slug: string }) => data)
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { data: row } = await supabase
      .from("notes")
      .select(NOTE_COLUMNS)
      .eq("handle", data.handle)
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (!row) return { note: null, notebook: null };

    const { data: nb } = await supabase
      .from("notebooks")
      .select("handle, title, bio, about, link")
      .eq("handle", data.handle)
      .maybeSingle();

    return {
      note: toNote(row as NoteRow),
      notebook: nb ? toNotebook(nb as NotebookRow, 0) : null,
    };
  });

export const listLiveNotes = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const { data: rows } = await supabase
    .from("notes")
    .select(NOTE_COLUMNS)
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(20);
  return ((rows ?? []) as NoteRow[]).map(toNote);
});
