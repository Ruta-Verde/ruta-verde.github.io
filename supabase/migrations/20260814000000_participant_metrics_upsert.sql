-- Move event_participant_metrics from an additive insert-log to a single
-- upserted row per (event_id, event_participant_id), so the dashboard's
-- "Update Participant Stats" grid can save cell edits in place instead of
-- appending a new row every submit.
--
-- Run this by hand against the Supabase project (SQL editor or CLI) --
-- there is no migration runner wired up in this repo yet.

-- 3. Enforce one row per participant per event going forward, and give
--    upsert(..., { onConflict: 'event_id,event_participant_id' }) a
--    target to conflict on.
alter table event_participant_metrics
  add constraint event_participant_metrics_event_participant_unique
  unique (event_id, event_participant_id);

-- 4. Broadcast changes on this table so open dashboards can subscribe via
--    supabase.channel(...).on('postgres_changes', ...) and see other
--    admins' edits live.
alter publication supabase_realtime add table public.event_participant_metrics;

-- 5. NEEDS VERIFICATION AGAINST EXISTING RLS: the insert path already
--    worked under RLS, implying some write policy exists, but this repo
--    has no record of current policies. The grid now also needs to SELECT
--    existing rows on load and receive them over the realtime channel, so
--    confirm (or add) something along these lines, adjusted to match
--    whatever role-check the existing insert policy actually uses:
--
-- create policy "event_participant_metrics_select_organizers"
--   on event_participant_metrics for select
--   using (
--     exists (
--       select 1 from event_participants ep
--       where ep.event_id = event_participant_metrics.event_id
--         and ep.profile_id = auth.uid()
--         and ep.event_role = 'event-organizer'
--     )
--   );

-- 6. STUB (not created): future audit-history hook.
--    If per-edit history is ever needed, this is where it attaches --
--    an AFTER UPDATE trigger on event_participant_metrics that inserts
--    the OLD row into a parallel event_participant_metrics_history table
--    (same columns + a changed_at timestamp) before the overwrite commits.
--    Deliberately not built now -- overwrite-only was the chosen design.
