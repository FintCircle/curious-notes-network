import { supabase } from "@/integrations/supabase/client";

export interface CommentRow {
  id: string;
  note_ref: string;
  parent_id: string | null;
  author_id: string;
  body: string;
  depth: number;
  is_deleted: boolean;
  edited_at: string | null;
  created_at: string;
}

export interface CommentAuthor {
  id: string;
  display_name: string;
  handle: string | null;
}

export interface CommentNode extends CommentRow {
  author: CommentAuthor | null;
  reactions: number;
  reactedByMe: boolean;
  replies: CommentNode[];
  descendants: number;
}

export type SortMode = "newest" | "oldest" | "top";

export const noteRef = (handle: string, slug: string) => `${handle}/${slug}`;

export async function fetchThread(ref: string, viewerId: string | null) {
  const [{ data: rows, error }, { data: reactions }] = await Promise.all([
    supabase
      .from("comments")
      .select("id, note_ref, parent_id, author_id, body, depth, is_deleted, edited_at, created_at")
      .eq("note_ref", ref)
      .order("created_at", { ascending: true }),
    supabase.from("comment_reactions").select("comment_id, user_id"),
  ]);
  if (error) throw error;

  const comments = (rows ?? []) as CommentRow[];
  const authorIds = Array.from(new Set(comments.map((c) => c.author_id)));
  let authors: CommentAuthor[] = [];
  if (authorIds.length > 0) {
    const { data } = await supabase
      .from("profiles")
      .select("id, display_name, handle")
      .in("id", authorIds);
    authors = (data ?? []) as CommentAuthor[];
  }
  const authorById = new Map(authors.map((a) => [a.id, a]));

  const counts = new Map<string, number>();
  const mine = new Set<string>();
  for (const r of reactions ?? []) {
    counts.set(r.comment_id, (counts.get(r.comment_id) ?? 0) + 1);
    if (viewerId && r.user_id === viewerId) mine.add(r.comment_id);
  }

  const nodes = new Map<string, CommentNode>();
  for (const c of comments) {
    nodes.set(c.id, {
      ...c,
      author: authorById.get(c.author_id) ?? null,
      reactions: counts.get(c.id) ?? 0,
      reactedByMe: mine.has(c.id),
      replies: [],
      descendants: 0,
    });
  }

  const roots: CommentNode[] = [];
  for (const node of nodes.values()) {
    const parent = node.parent_id ? nodes.get(node.parent_id) : undefined;
    if (parent) parent.replies.push(node);
    else roots.push(node);
  }

  const countDescendants = (node: CommentNode): number => {
    node.descendants = node.replies.reduce((sum, r) => sum + 1 + countDescendants(r), 0);
    return node.descendants;
  };
  roots.forEach(countDescendants);

  return { roots, total: comments.length };
}

export function sortTree(nodes: CommentNode[], mode: SortMode): CommentNode[] {
  const sorted = [...nodes].sort((a, b) => {
    if (mode === "top") {
      if (b.reactions !== a.reactions) return b.reactions - a.reactions;
      if (b.descendants !== a.descendants) return b.descendants - a.descendants;
    }
    const da = new Date(a.created_at).getTime();
    const db = new Date(b.created_at).getTime();
    return mode === "newest" ? db - da : da - db;
  });
  return sorted.map((n) => ({ ...n, replies: sortTree(n.replies, mode) }));
}

export async function addComment(input: {
  ref: string;
  body: string;
  parentId: string | null;
  authorId: string;
}) {
  const { error } = await supabase.from("comments").insert({
    note_ref: input.ref,
    body: input.body.trim(),
    parent_id: input.parentId,
    author_id: input.authorId,
  });
  if (error) throw error;
}

export async function editComment(id: string, body: string) {
  const { error } = await supabase
    .from("comments")
    .update({ body: body.trim(), edited_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function removeComment(node: CommentNode) {
  if (node.replies.length > 0) {
    const { error } = await supabase
      .from("comments")
      .update({ is_deleted: true, body: "[removed]" })
      .eq("id", node.id);
    if (error) throw error;
    return;
  }
  const { error } = await supabase.from("comments").delete().eq("id", node.id);
  if (error) throw error;
}

export async function toggleReaction(commentId: string, userId: string, reacted: boolean) {
  if (reacted) {
    const { error } = await supabase
      .from("comment_reactions")
      .delete()
      .eq("comment_id", commentId)
      .eq("user_id", userId);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("comment_reactions")
      .insert({ comment_id: commentId, user_id: userId });
    if (error) throw error;
  }
}

export function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
