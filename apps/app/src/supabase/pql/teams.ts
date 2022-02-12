import { Team } from "../../generated/graphql";

export function createTeam(data: any) {
  return {
    id: data.id,
    tid: data.tid,
    name: data.name,
  };
}
