CREATE TABLE public.notebooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  handle text NOT NULL UNIQUE,
  title text NOT NULL DEFAULT 'My Notebook',
  bio text NOT NULL DEFAULT '',
  about text NOT NULL DEFAULT '',
  link text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.notebooks TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notebooks TO authenticated;
GRANT ALL ON public.notebooks TO service_role;

ALTER TABLE public.notebooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Notebooks are viewable by everyone" ON public.notebooks FOR SELECT USING (true);
CREATE POLICY "Users create own notebook" ON public.notebooks FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users update own notebook" ON public.notebooks FOR UPDATE TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users delete own notebook" ON public.notebooks FOR DELETE TO authenticated USING (auth.uid() = owner_id);

CREATE TRIGGER notebooks_touch BEFORE UPDATE ON public.notebooks FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  notebook_id uuid NOT NULL REFERENCES public.notebooks(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  handle text NOT NULL,
  slug text NOT NULL,
  title text NOT NULL,
  context text NOT NULL,
  body text NOT NULL DEFAULT '',
  topics text[] NOT NULL DEFAULT '{}',
  tools text[] NOT NULL DEFAULT '{}',
  is_published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (handle, slug)
);

CREATE INDEX notes_published_idx ON public.notes (is_published, published_at DESC);
CREATE INDEX notes_handle_idx ON public.notes (handle);

GRANT SELECT ON public.notes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notes TO authenticated;
GRANT ALL ON public.notes TO service_role;

ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published notes are viewable by everyone" ON public.notes FOR SELECT USING (is_published = true);
CREATE POLICY "Authors can view own notes" ON public.notes FOR SELECT TO authenticated USING (auth.uid() = author_id);
CREATE POLICY "Authors can create notes" ON public.notes FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own notes" ON public.notes FOR UPDATE TO authenticated USING (auth.uid() = author_id) WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can delete own notes" ON public.notes FOR DELETE TO authenticated USING (auth.uid() = author_id);

CREATE TRIGGER notes_touch BEFORE UPDATE ON public.notes FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();