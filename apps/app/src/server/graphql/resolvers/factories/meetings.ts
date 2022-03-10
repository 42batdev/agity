import { Meeting } from "../../../../generated/graphql";

export function createMeeting(data: any): Meeting {
  return {
    id: data.id,
    name: data.name,
    state: data.state,
  };
}
