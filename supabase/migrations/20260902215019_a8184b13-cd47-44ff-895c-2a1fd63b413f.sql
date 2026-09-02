CREATE TABLE public.seo_audit_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  source text NOT NULL DEFAULT 'scheduled',
  origin text NOT NULL,
  score integer NOT NULL,
  critical_count integer NOT NULL DEFAULT 0,
  warning_count integer NOT NULL DEFAULT 0,
  info_count integer NOT NULL DEFAULT 0,
  emailed_to text,
  report jsonb NOT NULL
);

CREATE INDEX seo_audit_runs_created_at_idx ON public.seo_audit_runs (created_at DESC);

GRANT SELECT ON public.seo_audit_runs TO authenticated;
GRANT ALL ON public.seo_audit_runs TO service_role;

ALTER TABLE public.seo_audit_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read audit runs"
ON public.seo_audit_runs
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));