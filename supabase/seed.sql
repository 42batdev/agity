-- Set up default user and profile!
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at,
                        confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at,
                        email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data,
                        raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at,
                        phone_change, phone_change_token, phone_change_sent_at, email_change_token_current,
                        email_change_confirm_status)
VALUES ('00000000-0000-0000-0000-000000000000', '39a7b3e6-5b50-49a9-8f24-ca49151dbcce', '', 'authenticated',
        'test@localhost', '$2a$10$Pw6SjoQy5UdEkTQI0RxTHei3oCUUsP1pUYuHPWoo1nKqLLTYXPzJG',
        '2022-01-15 12:45:08.597456 +00:00', null, '', '2022-01-15 12:45:01.612650 +00:00', '', null, '', '', null,
        '2022-01-15 12:45:08.598364 +00:00', '{
    "provider": "email",
    "providers": [
      "email"
    ]
  }', '{}', false, '2022-01-15 12:45:01.608756 +00:00', '2022-01-15 12:45:01.608756 +00:00', null, null, '', '', null,
        '', 0);

INSERT INTO public.profiles (id, username, displayname, updated_at, avatar_url)
VALUES ('39a7b3e6-5b50-49a9-8f24-ca49151dbcce', 'test', 'Localhost Test', '2022-01-15 12:52:02.000000 +00:00', null);


-- Set up Avatar Storage!
insert into storage.buckets (id, name)
values ('avatars', 'avatars');

create policy "Avatar images are publicly accessible."
    on storage.objects for select
    using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar."
    on storage.objects for insert
    with check (bucket_id = 'avatars');

create policy "Anyone can update an avatar."
    on storage.objects for update
    with check (bucket_id = 'avatars');
