import { Team } from "../../generated/graphql";

export function getUserDashboardLink(team: Pick<Team, "uid" | "tid">) {
  return `/dashboard`;
}

export function getTeamDashboardLink(team: Pick<Team, "uid" | "tid">) {
  return `/u/${team.uid}/${team.tid}`;
}

export function getTeamSettingsLink(team: Pick<Team, "uid" | "tid">) {
  return `/u/${team.uid}/${team.tid}/settings`;
}

export function getTeamMembersLink(team: Pick<Team, "uid" | "tid">) {
  return `/u/${team.uid}/${team.tid}/members`;
}
