import { useQuery } from "react-query";
import supabase, { Team } from "supabase";

export function useMembersQuery(team: Team) {
  return useQuery(
    ["members", team.id],
    () =>
      supabase
        .rpc("get_team_members", {
          team_id_input: team.id,
        })
        .then(handleSupabaseError)
        .then(({ data }) => data) as Promise<any>
  );
}

function handleSupabaseError({ error, ...rest }) {
  if (error) {
    throw error;
  }
  return rest;
}
