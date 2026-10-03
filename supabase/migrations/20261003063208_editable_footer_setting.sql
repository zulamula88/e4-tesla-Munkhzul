create table public.footer_settings (
  id smallint primary key default 1,
  footer_text text not null default 'Tesla © 2026',

  constraint footer_settings_singleton
    check (id = 1),

  constraint footer_settings_text_length
    check (char_length(btrim(footer_text)) between 1 and 120)
);

alter table public.footer_settings enable row level security;

-- Data API access is opt-in and limited to the operations the site needs.
revoke all privileges
  on table public.footer_settings
  from public, anon, authenticated, service_role;

grant usage on schema public to anon, authenticated;
grant select on table public.footer_settings to anon, authenticated;
grant update (footer_text) on table public.footer_settings to authenticated;

create policy "footer is publicly readable"
  on public.footer_settings
  for select
  to anon, authenticated
  using (true);

create policy "designated admin can update footer"
  on public.footer_settings
  for update
  to authenticated
  using (
    (select auth.uid()) =
    '62bf6cd0-0eaf-492b-86c5-741369936eb1'::uuid
  )
  with check (
    (select auth.uid()) =
    '62bf6cd0-0eaf-492b-86c5-741369936eb1'::uuid
  );

insert into public.footer_settings (id, footer_text)
values (1, 'Tesla © 2026');
