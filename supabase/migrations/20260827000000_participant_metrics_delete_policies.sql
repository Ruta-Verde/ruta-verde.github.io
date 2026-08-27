-- Companion to 20260826010000_participant_metrics_write_policies.sql.
--
-- upsertMetric in useEventParticipantMetrics.ts now deletes a participant's
-- metrics row once every field on it (hours, trees, notes) has been cleared
-- out, rather than leaving an all-null row behind. That needs the DELETE
-- privilege on the table, which was never granted -- same gap pattern as
-- the earlier UPDATE fix, this time surfacing as "permission denied for
-- table event_participant_metrics" on a clear-all-fields edit.
--
-- Run this by hand against the Supabase project (SQL editor or CLI) --
-- there is no migration runner wired up in this repo yet.

grant delete on event_participant_metrics to authenticated;

-- Event organizers can delete metrics for participants in their event.
create policy "event_participant_metrics_delete_organizers"
  on event_participant_metrics for delete
  using (
    exists (
      select 1 from event_participants ep
      where ep.event_id = event_participant_metrics.event_id
        and ep.profile_id = auth.uid()
        and ep.event_role = 'event-organizer'
    )
  );

-- Global admins can delete metrics for any event.
create policy "event_participant_metrics_delete_admins"
  on event_participant_metrics for delete
  using (
    exists (
      select 1 from global_user_roles gur
      where gur.user_id = auth.uid()
        and gur.role = 'admin'
    )
  );
