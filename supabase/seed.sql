-- Set up default users and profiles
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at,
                        confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at,
                        email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data,
                        raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at,
                        phone_change, phone_change_token, phone_change_sent_at, email_change_token_current,
                        email_change_confirm_status)
VALUES ('00000000-0000-0000-0000-000000000000', 'e916e17d-0e09-44bc-95ed-ea738ed776dc', '', 'authenticated',
        'dev@localhost', '$2a$10$98bDEzWEHUdkclLQ0VXTVuPkOd4.uHP8aQ913bst/z5UzUscwbaYy',
        '2022-02-20 19:55:45.806208 +00:00', null, '', '2022-02-20 19:55:40.255764 +00:00', '', null, '', '', null,
        '2022-02-20 19:55:45.807513 +00:00', '{
    "provider": "email",
    "providers": [
      "email"
    ]
  }', '{}', false, '2022-01-31 21:21:23.649408 +00:00', '2022-01-31 21:21:23.649415 +00:00', null, null, '', '',
        null,
        '', 0),

       ('00000000-0000-0000-0000-000000000000', '298b3b78-12b9-446c-b2a9-47bfe1a452ac', '', 'authenticated',
        'playerone@localhost', '$2a$10$EBfLnS6JmxGx/egw4tX51eLP1gLD/AU.OYtph8tub.3pKTLHxqpcC',
        '2022-01-31 21:21:02.001291 +00:00', null, '', '2022-01-31 21:20:56.087388 +00:00', '', null, '', '', null,
        '2022-01-31 21:21:02.002238 +00:00', '{
         "provider": "email",
         "providers": [
           "email"
         ]
       }', '{}', false, '2022-01-31 21:20:56.082493 +00:00', '2022-01-31 21:20:56.082499 +00:00', null, null, '', '',
        null,
        '', 0),
       ('00000000-0000-0000-0000-000000000000', '09cbcd88-c3ee-4d85-95e5-51b490c1b3cb', '', 'authenticated',
        'playertwo@localhost', '$2a$10$V3ev87Wv812Eb6KVlEzu0OBdZGlhmb424OCG45MM59xv5tPBvEr/2',
        '2022-01-31 21:21:29.446763 +00:00', null, '', '2022-01-31 21:21:23.653315 +00:00', '', null, '', '', null,
        '2022-01-31 21:21:29.447577 +00:00', '{
         "provider": "email",
         "providers": [
           "email"
         ]
       }', '{}', false, '2022-01-31 21:21:23.649408 +00:00', '2022-01-31 21:21:23.649415 +00:00', null, null, '', '',
        null,
        '', 0),
       ('00000000-0000-0000-0000-000000000000', '06f695c1-baf5-4ba9-9ff2-8b3e24db95da', '', 'authenticated',
        'spy@localhost', '$2a$10$2I3Z01J9tLLkEntkhHTmPeEJr.3RuK.oR5gzW3mHwwRXhL5OxzUwS',
        '2022-01-31 21:11:28.107821 +00:00', null, '', '2022-01-31 21:11:22.067775 +00:00', '', null, '', '', null,
        '2022-01-31 21:11:28.108498 +00:00', '{
         "provider": "email",
         "providers": [
           "email"
         ]
       }', '{}', false, '2022-01-31 21:11:22.063784 +00:00', '2022-01-31 21:11:22.063791 +00:00', null, null, '', '',
        null,
        '', 0),
       ('00000000-0000-0000-0000-000000000000', '5121324c-b123-4def-b80a-97cfe28cc44e', '', 'authenticated',
        'scout@localhost', '$2a$10$C5FnyOvGIclxNqQhAMG02Oxa.WaOALTPq6YViKBMNIvjR4ougSu/O',
        '2022-01-31 20:46:34.598736 +00:00', null, '', '2022-01-31 20:46:26.758634 +00:00', '', null, '', '', null,
        '2022-01-31 20:46:34.599640 +00:00', '{
         "provider": "email",
         "providers": [
           "email"
         ]
       }', '{}', false, '2022-01-31 20:46:26.749872 +00:00', '2022-01-31 20:46:26.749956 +00:00', null, null, '', '',
        null,
        '', 0),
       ('00000000-0000-0000-0000-000000000000', '46ba81be-e17e-48e7-b41e-d825084400e7', '', 'authenticated',
        'engineer@localhost', '$2a$10$pCki2Va8rVIPda1.MPDzOuq5qXuKv6NoPPWqPeD17QaeKIhxPhmgC',
        '2022-01-31 21:10:10.167472 +00:00', null, '', '2022-01-31 21:10:04.689557 +00:00', '', null, '', '', null,
        '2022-01-31 21:10:10.168240 +00:00', '{
         "provider": "email",
         "providers": [
           "email"
         ]
       }', '{}', false, '2022-01-31 21:10:04.685458 +00:00', '2022-01-31 21:10:04.685464 +00:00', null, null, '', '',
        null,
        '', 0),
       ('00000000-0000-0000-0000-000000000000', '2f3e83c4-9aae-496a-8fd9-bb29027630bc', '', 'authenticated',
        'soldier@localhost', '$2a$10$QbpL9h9x0sDizSonFm1KTea9iTmlnkXwYfFL6.poF5TWuA0M3lP/K',
        '2022-01-31 21:08:03.778613 +00:00', null, '', '2022-01-31 21:07:58.048359 +00:00', '', null, '', '', null,
        '2022-01-31 21:08:03.779410 +00:00', '{
         "provider": "email",
         "providers": [
           "email"
         ]
       }', '{}', false, '2022-01-31 21:07:58.043997 +00:00', '2022-01-31 21:07:58.044004 +00:00', null, null, '', '',
        null,
        '', 0),
       ('00000000-0000-0000-0000-000000000000', '91382ad1-a715-49b7-868c-cb56c24f979d', '', 'authenticated',
        'medic@localhost', '$2a$10$G7w1E0LCeonqUU2OWL/TK.dZEbs8hhEUOw9WtijbCCAb7XSq.sqte',
        '2022-01-31 21:10:35.812802 +00:00', null, '', '2022-01-31 21:10:30.636019 +00:00', '', null, '', '', null,
        '2022-01-31 21:10:35.814497 +00:00', '{
         "provider": "email",
         "providers": [
           "email"
         ]
       }', '{}', false, '2022-01-31 21:10:30.632323 +00:00', '2022-01-31 21:10:30.632330 +00:00', null, null, '', '',
        null,
        '', 0),
       ('00000000-0000-0000-0000-000000000000', '92ced8f9-4c83-4dd8-bf8d-4e9c8dc804ee', '', 'authenticated',
        'pyro@localhost', '$2a$10$VOleO/J0b3NzhnIpdHCTDOvAtoEbWieBWhqV/2FpTVH0sAKcZF7U6',
        '2022-01-31 21:08:37.802297 +00:00', null, '', '2022-01-31 21:08:32.431357 +00:00', '', null, '', '', null,
        '2022-01-31 21:08:37.803173 +00:00', '{
         "provider": "email",
         "providers": [
           "email"
         ]
       }', '{}', false, '2022-01-31 21:08:32.427751 +00:00', '2022-01-31 21:08:32.427757 +00:00', null, null, '', '',
        null,
        '', 0),
       ('00000000-0000-0000-0000-000000000000', '3f420285-5557-418d-894f-46114a2e0677', '', 'authenticated',
        'demoman@localhost', '$2a$10$CULXUAs.CupyOn33oP14.eQRTiciwICx1xYgVDBy2JLRjctafTZNm',
        '2022-01-31 21:09:16.333739 +00:00', null, '', '2022-01-31 21:08:57.803901 +00:00', '', null, '', '', null,
        '2022-01-31 21:09:16.334482 +00:00', '{
         "provider": "email",
         "providers": [
           "email"
         ]
       }', '{}', false, '2022-01-31 21:08:57.800174 +00:00', '2022-01-31 21:08:57.800182 +00:00', null, null, '', '',
        null,
        '', 0),
       ('00000000-0000-0000-0000-000000000000', 'd284c9ce-167c-465a-b158-2d592b97fdd0', '', 'authenticated',
        'sniper@localhost', '$2a$10$E9jXDr4vSDV8A7gB10LXfupO4/8uEg8gs8KH58XW07w/y5kBPUAje',
        '2022-01-31 21:10:58.668653 +00:00', null, '', '2022-01-31 21:10:52.537389 +00:00', '', null, '', '', null,
        '2022-01-31 21:10:58.669304 +00:00', '{
         "provider": "email",
         "providers": [
           "email"
         ]
       }', '{}', false, '2022-01-31 21:10:52.533953 +00:00', '2022-01-31 21:10:52.533960 +00:00', null, null, '', '',
        null,
        '', 0),
       ('00000000-0000-0000-0000-000000000000', '24626771-de5a-4149-81ab-bc582ec4a208', '', 'authenticated',
        'heavy@localhost', '$2a$10$43uy7Vik4q92l.3iF1w1gecdhcFi9Srx/XSqx0kCJayWFDKasWUtm',
        '2022-01-31 21:09:50.063980 +00:00', null, '', '2022-01-31 21:09:40.897048 +00:00', '', null, '', '', null,
        '2022-01-31 21:09:50.065115 +00:00', '{
         "provider": "email",
         "providers": [
           "email"
         ]
       }', '{}', false, '2022-01-31 21:09:40.893309 +00:00', '2022-01-31 21:09:40.893326 +00:00', null, null, '', '',
        null,
        '', 0);

INSERT INTO public.profiles (id, uid, name, updated_at, avatar_url)
VALUES ('e916e17d-0e09-44bc-95ed-ea738ed776dc', 'developer', 'Developer', null, null)
     , ('298b3b78-12b9-446c-b2a9-47bfe1a452ac', 'player_one', 'Player One', null, null)
     , ('09cbcd88-c3ee-4d85-95e5-51b490c1b3cb', 'player_two', 'Player Two', null, null)
     , ('5121324c-b123-4def-b80a-97cfe28cc44e', 'scout', 'The Scout', null, null)
     , ('2f3e83c4-9aae-496a-8fd9-bb29027630bc', 'soldier', 'The Soldier', null, null)
     , ('92ced8f9-4c83-4dd8-bf8d-4e9c8dc804ee', 'pyro', 'The Pyro', null, null)
     , ('3f420285-5557-418d-894f-46114a2e0677', 'demo', 'The Demoman', null, null)
     , ('24626771-de5a-4149-81ab-bc582ec4a208', 'heavy', 'The Heavy', null, null)
     , ('46ba81be-e17e-48e7-b41e-d825084400e7', 'engineer', 'The Engineer', null, null)
     , ('91382ad1-a715-49b7-868c-cb56c24f979d', 'medic', 'The Medic', null, null)
     , ('d284c9ce-167c-465a-b158-2d592b97fdd0', 'sniper', 'The Sniper', null, null)
     , ('06f695c1-baf5-4ba9-9ff2-8b3e24db95da', 'spy', 'The Spy', null, null);

-- Set up Teams and Members
INSERT INTO public.teams (id, uid, tid, name, created_at)
VALUES ('341aba12-11fb-40eb-8321-02f131b7b078', 'developer', 'spectator', 'Spectator',
        '2022-01-31 21:34:25.366942 +00:00'),
       ('ac5cc79f-a28f-40c3-8a70-518be34d178e', 'player_one', 'red', 'Reliable Excavation Demolition',
        '2022-01-31 21:34:40.423653 +00:00'),
       ('37879e23-b61d-4b9a-865b-45ad1c916d4f', 'player_two', 'blu', 'Builders League United',
        '2022-01-31 21:35:23.703197 +00:00')
        ,
       ('39b3cfd2-26ed-45b2-8390-fc9a9313c4aa', 'player_one', 'ylw', 'Yard Logistics Workers',
        '2022-02-20 19:55:40.251868 +00:00')
        ,
       ('986b4b6f-d2cc-4234-bd6f-c5fbe5693e69', 'player_two', 'grn', 'Global Radio Network',
        '2022-02-20 19:55:40.251868 +00:00');

INSERT INTO public.members (team_id, user_id, permission_level)
VALUES ('341aba12-11fb-40eb-8321-02f131b7b078', 'e916e17d-0e09-44bc-95ed-ea738ed776dc', 'OWNER')  -- spectator
     , ('341aba12-11fb-40eb-8321-02f131b7b078', '298b3b78-12b9-446c-b2a9-47bfe1a452ac', 'MEMBER') -- spectator
     , ('341aba12-11fb-40eb-8321-02f131b7b078', '09cbcd88-c3ee-4d85-95e5-51b490c1b3cb', 'MEMBER') -- spectator
     , ('ac5cc79f-a28f-40c3-8a70-518be34d178e', '298b3b78-12b9-446c-b2a9-47bfe1a452ac', 'OWNER')  -- red
     , ('ac5cc79f-a28f-40c3-8a70-518be34d178e', 'e916e17d-0e09-44bc-95ed-ea738ed776dc', 'ADMIN')  -- red
     , ('ac5cc79f-a28f-40c3-8a70-518be34d178e', '91382ad1-a715-49b7-868c-cb56c24f979d', 'MEMBER') -- red
     , ('ac5cc79f-a28f-40c3-8a70-518be34d178e', '24626771-de5a-4149-81ab-bc582ec4a208', 'MEMBER') -- red
     , ('37879e23-b61d-4b9a-865b-45ad1c916d4f', '09cbcd88-c3ee-4d85-95e5-51b490c1b3cb', 'OWNER')  -- blu
     , ('37879e23-b61d-4b9a-865b-45ad1c916d4f', 'e916e17d-0e09-44bc-95ed-ea738ed776dc', 'MEMBER') -- blu
     , ('37879e23-b61d-4b9a-865b-45ad1c916d4f', '46ba81be-e17e-48e7-b41e-d825084400e7', 'MEMBER') -- blu
     , ('37879e23-b61d-4b9a-865b-45ad1c916d4f', 'd284c9ce-167c-465a-b158-2d592b97fdd0', 'MEMBER') -- blu
     , ('39b3cfd2-26ed-45b2-8390-fc9a9313c4aa', '298b3b78-12b9-446c-b2a9-47bfe1a452ac', 'OWNER')  -- ylw
     , ('39b3cfd2-26ed-45b2-8390-fc9a9313c4aa', 'e916e17d-0e09-44bc-95ed-ea738ed776dc', 'INVITED')  -- ylw
     , ('986b4b6f-d2cc-4234-bd6f-c5fbe5693e69', '09cbcd88-c3ee-4d85-95e5-51b490c1b3cb', 'OWNER') -- grn
     , ('986b4b6f-d2cc-4234-bd6f-c5fbe5693e69', 'e916e17d-0e09-44bc-95ed-ea738ed776dc', 'INVITED'); -- grn

-- Set up Avatar Storage
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
