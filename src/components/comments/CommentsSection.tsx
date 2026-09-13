import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/inktella";
import {
  addComment,
  editComment,
  fetchThread,
  removeComment,
  sortTree,
  timeAgo,
  toggleReaction,
  type CommentNode,
  type SortMode,
} from "@/lib/comments";

const MAX = 5000;
const SORTS: { id: SortMode; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
  { id: "top", label: "Top" },
];

export function CommentsSection({ noteRef }: { noteRef: string }) {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();
  const [sort, setSort] = useState<SortMode>("newest");
  const queryKey = ["comments", noteRef, user?.id ?? "anon"];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchThread(noteRef, user?.id ?? null),
  });

  useEffect(() => {
    const channel = supabase
      .channel(`comments:${noteRef}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "comments" }, () => {
        void queryClient.invalidateQueries({ queryKey: ["comments", noteRef] });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "comment_reactions" }, () => {
        void queryClient.invalidateQueries({ queryKey: ["comments", noteRef] });
      })
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [noteRef, queryClient]);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["comments", noteRef] });

  const post = useMutation({
    mutationFn: (vars: { body: string; parentId: string | null }) =>
      addComment({ ref: noteRef, body: vars.body, parentId: vars.parentId, authorId: user!.id }),
    onSuccess: () => {
      void invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const edit = useMutation({
    mutationFn: (vars: { id: string; body: string }) => editComment(vars.id, vars.body),
    onSuccess: () => void invalidate(),
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (node: CommentNode) => removeComment(node),
    onSuccess: () => void invalidate(),
    onError: (e: Error) => toast.error(e.message),
  });

  const react = useMutation({
    mutationFn: (node: CommentNode) => toggleReaction(node.id, user!.id, node.reactedByMe),
    onSuccess: () => void invalidate(),
    onError: (e: Error) => toast.error(e.message),
  });

  const tree = useMemo(() => sortTree(data?.roots ?? [], sort), [data, sort]);
  const total = data?.total ?? 0;

  return (
    <section className="mt-10 border-t border-border pt-6" id="replies">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="note-title text-lg font-medium">
          {total} {total === 1 ? "Reply" : "Replies"}
        </h2>
        <div className="flex items-center gap-3">
          {SORTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSort(s.id)}
              aria-pressed={sort === s.id}
              className={`text-xs uppercase tracking-[0.08em] transition-colors ${
                sort === s.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        {user ? (
          <Composer
            placeholder="What are you thinking?"
            authorName={profile?.display_name ?? "You"}
            pending={post.isPending}
            onSubmit={(body) => post.mutateAsync({ body, parentId: null })}
          />
        ) : (
          <div className="rounded-md border border-border bg-surface p-4 text-sm text-muted-foreground">
            <Link to="/auth" search={{}} className="text-foreground underline underline-offset-4">
              Sign in
            </Link>{" "}
            to join this thread.
          </div>
        )}
      </div>

      <div className="mt-6">
        {isLoading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Loading replies…</p>
        ) : tree.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No replies yet. Start the thread.
          </p>
        ) : (
          <ul className="space-y-5">
            {tree.map((node) => (
              <CommentItem
                key={node.id}
                node={node}
                viewerId={user?.id ?? null}
                onReply={(body, parentId) => post.mutateAsync({ body, parentId })}
                onEdit={(id, body) => edit.mutateAsync({ id, body })}
                onDelete={(n) => del.mutateAsync(n)}
                onReact={(n) => react.mutateAsync(n)}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function CommentItem({
  node,
  viewerId,
  onReply,
  onEdit,
  onDelete,
  onReact,
}: {
  node: CommentNode;
  viewerId: string | null;
  onReply: (body: string, parentId: string) => Promise<unknown>;
  onEdit: (id: string, body: string) => Promise<unknown>;
  onDelete: (node: CommentNode) => Promise<unknown>;
  onReact: (node: CommentNode) => Promise<unknown>;
}) {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const mine = viewerId != null && viewerId === node.author_id;
  const name = node.is_deleted ? "—" : node.author?.display_name ?? "Someone";

  return (
    <li>
      <article className="group">
        <div className="flex items-start gap-3">
          <button
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand thread" : "Collapse thread"}
            className="mt-0.5 shrink-0"
          >
            <Avatar name={name} size={28} />
          </button>
          <div className="min-w-0 flex-1">
            <div className="meta flex flex-wrap items-center gap-x-2">
              <span className="font-medium text-foreground/90">{name}</span>
              <span aria-hidden>·</span>
              <span>{timeAgo(node.created_at)}</span>
              {node.edited_at && !node.is_deleted && <span className="italic">edited</span>}
            </div>

            {editing ? (
              <div className="mt-2">
                <Composer
                  initial={node.body}
                  submitLabel="Save"
                  onCancel={() => setEditing(false)}
                  onSubmit={async (body) => {
                    await onEdit(node.id, body);
                    setEditing(false);
                  }}
                />
              </div>
            ) : (
              <p
                className={`mt-1.5 whitespace-pre-wrap text-[0.95rem] leading-relaxed ${
                  node.is_deleted ? "italic text-muted-foreground" : "text-foreground/90"
                }`}
              >
                {node.is_deleted ? "This reply was removed." : node.body}
              </p>
            )}

            {!editing && (
              <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                {!node.is_deleted && (
                  <button
                    onClick={() => void onReact(node)}
                    disabled={!viewerId}
                    aria-pressed={node.reactedByMe}
                    className={`transition-colors hover:text-foreground disabled:opacity-50 ${
                      node.reactedByMe ? "text-foreground" : ""
                    }`}
                  >
                    Interesting <span className="tabular-nums">{node.reactions}</span>
                  </button>
                )}
                {viewerId && !node.is_deleted && (
                  <button onClick={() => setReplying((v) => !v)} className="hover:text-foreground">
                    {replying ? "Cancel" : "Reply"}
                  </button>
                )}
                {mine && !node.is_deleted && (
                  <>
                    <button onClick={() => setEditing(true)} className="hover:text-foreground">
                      Edit
                    </button>
                    <button
                      onClick={() => void onDelete(node)}
                      className="hover:text-foreground"
                    >
                      Delete
                    </button>
                  </>
                )}
                {node.descendants > 0 && (
                  <button onClick={() => setCollapsed((v) => !v)} className="hover:text-foreground">
                    {collapsed ? `Show ${node.descendants} more` : "Hide thread"}
                  </button>
                )}
              </div>
            )}

            {replying && (
              <div className="mt-3">
                <Composer
                  placeholder={`Reply to ${name}`}
                  submitLabel="Reply"
                  onCancel={() => setReplying(false)}
                  onSubmit={async (body) => {
                    await onReply(body, node.id);
                    setReplying(false);
                  }}
                />
              </div>
            )}

            {!collapsed && node.replies.length > 0 && (
              <ul className="mt-4 space-y-4 border-l border-border pl-4">
                {node.replies.map((child) => (
                  <CommentItem
                    key={child.id}
                    node={child}
                    viewerId={viewerId}
                    onReply={onReply}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onReact={onReact}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </article>
    </li>
  );
}

function Composer({
  initial = "",
  placeholder = "Add to the thread…",
  submitLabel = "Post",
  authorName,
  pending,
  onSubmit,
  onCancel,
}: {
  initial?: string;
  placeholder?: string;
  submitLabel?: string;
  authorName?: string;
  pending?: boolean;
  onSubmit: (body: string) => Promise<unknown>;
  onCancel?: () => void;
}) {
  const [value, setValue] = useState(initial);
  const [busy, setBusy] = useState(false);
  const disabled = busy || pending || value.trim().length === 0 || value.length > MAX;

  const submit = async () => {
    if (disabled) return;
    setBusy(true);
    try {
      await onSubmit(value);
      setValue("");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-md border border-border bg-surface p-3">
      {authorName && <p className="meta mb-2">Replying as {authorName}</p>}
      <textarea
        rows={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") void submit();
        }}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className={`text-xs ${value.length > MAX ? "text-destructive" : "text-muted-foreground"}`}>
          {value.length}/{MAX}
        </span>
        <div className="flex items-center gap-2">
          {onCancel && (
            <button
              onClick={onCancel}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Cancel
            </button>
          )}
          <button
            onClick={() => void submit()}
            disabled={disabled}
            className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {busy || pending ? "Posting…" : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
