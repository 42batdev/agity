import { useQuery } from "react-query";
import supabase, { Profile, Team } from "supabase";

export enum TeamPermission {
  ADMIN,
  USER,
}

export type TeamMember = Profile & { permission: TeamPermission };

export function useMembersQuery(team: Team) {
  return useQuery<TeamMember[]>(
    ["members", team.id],
    () =>
      supabase
        .rpc("get_team_members", {
          team_id_input: team.id,
        })
        .then(handleSupabaseError)
        .then(({ data }) =>
          data.map(
            (profile) =>
              ({
                uid: profile.uid,
                name: profile.name,
                avatar: {
                  url: profile.avatar_url
                    ? supabase.storage
                        .from("avatars")
                        .getPublicUrl(profile.avatar_url).publicURL
                    : undefined,
                  filename: profile.avatar_url,
                },
              } as TeamMember)
          )
        ) as Promise<any>
  );
}

function handleSupabaseError({ error, ...rest }) {
  if (error) {
    throw error;
  }
  return rest;
}
