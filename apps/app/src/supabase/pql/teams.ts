import { Team } from "../../generated/graphql";

export function createTeam(data: any): Team {
  return {
    id: data.id,
    tid: data.tid,
    name: data.name,
  };
}
