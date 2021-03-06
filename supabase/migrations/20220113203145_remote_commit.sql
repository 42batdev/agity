-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

SET client_min_messages = warning;
DROP TABLE IF EXISTS public.profiles;

CREATE TABLE IF NOT EXISTS public.profiles
(
    id uuid NOT NULL,
    username text COLLATE pg_catalog."default" NOT NULL,
    displayname text COLLATE pg_catalog."default" DEFAULT 'Anonymous'::text,
    updated_at timestamp with time zone,
    avatar_url text COLLATE pg_catalog."default",
    CONSTRAINT profiles_pkey PRIMARY KEY (id),
    CONSTRAINT profiles_username_key UNIQUE (username),
    CONSTRAINT profiles_id_fkey FOREIGN KEY (id)
        REFERENCES auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT username_length CHECK (char_length(username) >= 3)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.profiles
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.profiles
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.profiles TO anon;

GRANT ALL ON TABLE public.profiles TO authenticated;

GRANT ALL ON TABLE public.profiles TO postgres;

GRANT ALL ON TABLE public.profiles TO service_role;

GRANT ALL ON TABLE public.profiles TO supabase_admin;

COMMENT ON TABLE public.profiles
    IS 'Stores the users profiles.';

COMMENT ON COLUMN public.profiles.id
    IS 'The users id from the auth table.';

COMMENT ON COLUMN public.profiles.username
    IS 'The users unique username.';

COMMENT ON COLUMN public.profiles.displayname
    IS 'The display name of the user.';

COMMENT ON COLUMN public.profiles.avatar_url
    IS 'The URL of the users avatar.';
CREATE POLICY "Public profiles are viewable by everyone."
    ON public.profiles
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);
CREATE POLICY "Users can insert their own profile."
    ON public.profiles
    AS PERMISSIVE
    FOR INSERT
    TO public
    WITH CHECK ((auth.uid() = id));
CREATE POLICY "Users can update own profile."
    ON public.profiles
    AS PERMISSIVE
    FOR UPDATE
    TO public
    USING ((auth.uid() = id));

CREATE TABLE IF NOT EXISTS public.teams
(
    id text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default",
    owner_id uuid NOT NULL,
    updated_at timestamp with time zone,
    CONSTRAINT teams_pkey PRIMARY KEY (id),
    CONSTRAINT teams_owner_id_fkey FOREIGN KEY (owner_id)
        REFERENCES auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.teams
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.teams
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.teams TO anon;

GRANT ALL ON TABLE public.teams TO authenticated;

GRANT ALL ON TABLE public.teams TO postgres;

GRANT ALL ON TABLE public.teams TO service_role;

GRANT ALL ON TABLE public.teams TO supabase_admin;

COMMENT ON TABLE public.teams
    IS 'A collection of all teams';

COMMENT ON COLUMN public.teams.id
    IS 'The teams unique id.';

COMMENT ON COLUMN public.teams.name
    IS 'The name of the team.';

COMMENT ON COLUMN public.teams.owner_id
    IS 'The user id of the team owner.';
CREATE POLICY "Owners can see teams"
    ON public.teams
    AS PERMISSIVE
    FOR ALL
    TO public
    USING ((auth.uid() = owner_id));
