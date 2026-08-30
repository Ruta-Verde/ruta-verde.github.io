-- Adds RPCs backing the admin dashboard's Roster tab:
--   * get_roster()             -- every profile plus admin flag + stats, admin-only
--   * promote_to_admin(uuid)   -- grants admin; no corresponding demote function
--
-- Run this by hand against the Supabase project (SQL editor or CLI) --
-- there is no migration runner wired up in this repo yet.

create or replace function get_roster()
returns table (
  profile_id uuid,
  username text,
  is_admin boolean,
  events_attended bigint,
  volunteer_hours numeric,
  trees_planted bigint
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from global_user_roles
    where user_id = auth.uid() and role = 'admin'
  ) then
    raise exception 'Only admins can view the roster';
  end if;

  return query
  select
    p.profile_id::uuid,
    p.username::text,
    exists (
      select 1 from global_user_roles gur
      where gur.user_id = p.profile_id and gur.role = 'admin'
    ) as is_admin,
    coalesce(ep.events_attended, 0)::bigint as events_attended,
    coalesce(epm.volunteer_hours, 0)::numeric as volunteer_hours,
    coalesce(epm.trees_planted, 0)::bigint as trees_planted
  from profiles p
  left join (
    select ep2.profile_id, count(*) as events_attended
    from event_participants ep2
    group by ep2.profile_id
  ) ep on ep.profile_id = p.profile_id
  left join (
    select epm2.event_participant_id,
      sum(epm2.daily_volunteer_hours) as volunteer_hours,
      sum(epm2.trees_planted) as trees_planted
    from event_participant_metrics epm2
    group by epm2.event_participant_id
  ) epm on epm.event_participant_id = p.profile_id
  order by p.username;
end;
$$;

grant execute on function get_roster() to authenticated;

-- Admin grants are one-way: this inserts a global_user_roles row if one
-- doesn't already exist, and there is deliberately no counterpart that
-- removes one -- admins can't be demoted from the dashboard.
create or replace function promote_to_admin(target_profile_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from global_user_roles
    where user_id = auth.uid() and role = 'admin'
  ) then
    raise exception 'Only admins can grant admin access';
  end if;

  if not exists (
    select 1 from global_user_roles
    where user_id = target_profile_id and role = 'admin'
  ) then
    insert into global_user_roles (user_id, role) values (target_profile_id, 'admin');
  end if;
end;
$$;

grant execute on function promote_to_admin(uuid) to authenticated;
