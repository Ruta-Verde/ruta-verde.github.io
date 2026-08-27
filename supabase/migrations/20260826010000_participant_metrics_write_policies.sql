-- Companion to 20260826000000_participant_metrics_select_policy.sql.
--
-- The upsert in useEventParticipantMetrics.ts does
-- INSERT ... ON CONFLICT (event_id, event_participant_id) DO UPDATE, which
-- needs the UPDATE privilege on the table in addition to INSERT. The
-- original design only ever appended rows (see 20260814000000's header), so
-- only INSERT was ever granted/policied. The missing UPDATE grant/policy
-- surfaces as "permission denied for table event_participant_metrics" the
-- moment a cell with an already-existing row is edited -- a brand new row
-- still inserts fine, which is why this wasn't caught immediately.
--
-- Run this by hand against the Supabase project (SQL editor or CLI) --
-- there is no migration runner wired up in this repo yet.

grant select, insert, update on event_participant_metrics to authenticated;

-- Event organizers can create/update metrics for participants in their event.
create policy "event_participant_metrics_insert_organizers"
  on event_participant_metrics for insert
  with check (
    exists (
      select 1 from event_participants ep
      where ep.event_id = event_participant_metrics.event_id
        and ep.profile_id = auth.uid()
        and ep.event_role = 'event-organizer'
    )
  );

create policy "event_participant_metrics_update_organizers"
  on event_participant_metrics for update
  using (
    exists (
      select 1 from event_participants ep
      where ep.event_id = event_participant_metrics.event_id
        and ep.profile_id = auth.uid()
        and ep.event_role = 'event-organizer'
    )
  )
  with check (
    exists (
      select 1 from event_participants ep
      where ep.event_id = event_participant_metrics.event_id
        and ep.profile_id = auth.uid()
        and ep.event_role = 'event-organizer'
    )
  );

-- Global admins can create/update metrics for any event.
create policy "event_participant_metrics_insert_admins"
  on event_participant_metrics for insert
  with check (
    exists (
      select 1 from global_user_roles gur
      where gur.user_id = auth.uid()
        and gur.role = 'admin'
    )
  );

create policy "event_participant_metrics_update_admins"
  on event_participant_metrics for update
  using (
    exists (
      select 1 from global_user_roles gur
      where gur.user_id = auth.uid()
        and gur.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from global_user_roles gur
      where gur.user_id = auth.uid()
        and gur.role = 'admin'
    )
  );
