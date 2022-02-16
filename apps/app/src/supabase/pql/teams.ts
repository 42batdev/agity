import { Team } from "../../generated/graphql";
import supabase from "../index";

export function checkTidExists(tid: string) {
  return supabase
    .from("teams")
    .select("id", { count: "exact", head: true })
    .match({ tid: tid.toLowerCase() })
    .then((result) => result.count ?? 0 > 0) as Promise<boolean>;
}

export function createTeam(data: any): Team {
  return {
    id: data.id,
    tid: data.tid,
    name: data.name,
  };
}
