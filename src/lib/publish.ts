import { supabase } from "@/integrations/supabase/client";
import type { ContextId } from "@/lib/data";

export function toSlug(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 70)
      .replace(/^-+|-+$/g, "") || "note"
  );
}

function handleFrom(seed: string) {
  const base = seed.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 20);
  return base || `maker${Math.floor(Math.random() * 10000)}`;
}

export interface NotebookRecord {
  id: string;
  handle: string;
  title: string;
}

/** Returns the signed-in user's Notebook, creating one the first time they publish. */
export async function ensureNotebook(
  userId: string,
  displayName: string,
  preferredHandle?: string | null,
): Promise<NotebookRecord> {
  const { data: existing, error } = await supabase
    .from("notebooks")
    .select("id, handle, title")
    .eq("owner_id", userId)
    .maybeSingle();
  if (error) throw error;
  if (existing) return existing as NotebookRecord;

  const base = handleFrom(preferredHandle || displayName || "maker");
  for (let i = 0; i < 6; i++) {
    const handle = i === 0 ? base : `${base}${i + 1}`;
    const { data, error: insertError } = await supabase
      .from("notebooks")
      .insert({
        owner_id: userId,
        handle,
        title: `${displayName}'s Notebook`,
        bio: "",
        about: "",
      })
      .select("id, handle, title")
      .maybeSingle();
    if (data) return data as NotebookRecord;
    if (insertError && insertError.code !== "23505") throw insertError;
  }
  throw new Error("Could not create a Notebook handle");
}

export interface PublishInput {
  userId: string;
  notebook: NotebookRecord;
  title: string;
  body: string;
  context: ContextId;
  topics: string[];
  tools: string[];
}

export async function publishNote(input: PublishInput) {
  const base = toSlug(input.title);
  for (let i = 0; i < 6; i++) {
    const slug = i === 0 ? base : `${base}-${i + 1}`;
    const { data, error } = await supabase
      .from("notes")
      .insert({
        notebook_id: input.notebook.id,
        author_id: input.userId,
        handle: input.notebook.handle,
        slug,
        title: input.title,
        context: input.context,
        body: input.body,
        topics: input.topics,
        tools: input.tools,
        is_published: true,
        published_at: new Date().toISOString(),
      })
      .select("handle, slug")
      .maybeSingle();
    if (data) return data as { handle: string; slug: string };
    if (error && error.code !== "23505") throw error;
  }
  throw new Error("Could not publish this Note");
}
