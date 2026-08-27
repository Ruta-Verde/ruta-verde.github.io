-- Adds the SELECT policies on event_participant_metrics that
-- 20260814000000_participant_metrics_upsert.sql 

-- Event organizers can see every participant's metrics for their event.
create policy "event_participant_metrics_select_organizers"
  on event_participant_metrics for select
  using (
    exists (
      select 1 from event_participants ep
      where ep.event_id = event_participant_metrics.event_id
        and ep.profile_id = auth.uid()
        and ep.event_role = 'event-organizer'
    )
  );

-- A participant can see their own metrics row.
create policy "event_participant_metrics_select_self"
  on event_participant_metrics for select
  using (event_participant_id = auth.uid());

-- Global admins (global_user_roles.role = 'admin') can see every row,
-- regardless of which event it belongs to.
create policy "event_participant_metrics_select_admins"
  on event_participant_metrics for select
  using (
    exists (
      select 1 from global_user_roles gur
      where gur.user_id = auth.uid()
        and gur.role = 'admin'
    )
  );
