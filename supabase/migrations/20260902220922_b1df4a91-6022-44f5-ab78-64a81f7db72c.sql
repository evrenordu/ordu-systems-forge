GRANT SELECT ON public.seo_audit_runs TO authenticated;
GRANT ALL ON public.seo_audit_runs TO service_role;

ALTER TABLE public.seo_audit_runs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can read audit runs" ON public.seo_audit_runs;
CREATE POLICY "Admins can read audit runs"
ON public.seo_audit_runs
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS seo_audit_runs_created_at_idx ON public.seo_audit_runs (created_at DESC);

CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

SELECT cron.unschedule('seo-audit-daily')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'seo-audit-daily');

SELECT cron.schedule(
  'seo-audit-daily',
  '15 6 * * *',
  $$
  SELECT net.http_post(
    url := 'https://project--1062dacb-ca14-4b74-bfb4-582a62953b16.lovable.app/api/public/hooks/seo-audit-daily',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', '5a9ecd358bfa5f7ebf05cf313b202eceea7668382a66f7bb'
    ),
    body := '{}'::jsonb
  );
  $$
);