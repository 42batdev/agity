import { Meeting, Team } from "../../generated/graphql";
import { NextRouter, useRouter } from "next/router";
import { useMemo } from "react";

export interface AgityRouter extends NextRouter {
  openUserDashboard: () => void;
  openUserSettings: () => void;
  openTeamDashboard: (team: Pick<Team, "id" | "uid" | "tid">) => void;
  openTeamSettings: (team: Pick<Team, "id" | "uid" | "tid">) => void;
  openTeamMembers: (team: Pick<Team, "id" | "uid" | "tid">) => void;
  openTeamMeeting: (
    team: Pick<Team, "id" | "uid" | "tid">,
    meeting: Pick<Meeting, "id">
  ) => void;
}

export function useAgityRouter(): AgityRouter {
  const router = useRouter();

  return useMemo(() => {
    return {
      ...router,
      openUserDashboard: () => {
        router.push(getUserDashboardLink());
      },
      openUserSettings: () => {
        router.push(getUserSettingsLink());
      },
      openTeamDashboard: (team) => {
        const pathname = getTeamDashboardLink(team);
        router.push(
          {
            pathname,
            query: { id: team.id },
          },
          pathname
        );
      },
      openTeamMembers: (team) => {
        const pathname = getTeamMembersLink(team);
        router.push(
          {
            pathname,
            query: { id: team.id },
          },
          pathname
        );
      },
      openTeamSettings: (team) => {
        const pathname = getTeamSettingsLink(team);
        router.push(
          {
            pathname,
            query: { id: team.id },
          },
          pathname
        );
      },
      openTeamMeeting: (team, meeting) => {
        const pathname = getTeamMeetingLink(team);
        router.push(
          {
            pathname,
            query: { id: team.id, meetingId: meeting.id },
          },
          pathname
        );
      },
    };
  }, [router]);
}

export function getUserDashboardLink() {
  return `/dashboard`;
}

export function getUserSettingsLink() {
  return `/dashboard/settings`;
}

export function getTeamDashboardLink(team: Pick<Team, "uid" | "tid">) {
  return `/u/${team.uid}/${team.tid}`;
}

export function getTeamMembersLink(team: Pick<Team, "uid" | "tid">) {
  return `${getTeamDashboardLink(team)}/members`;
}

export function getTeamSettingsLink(team: Pick<Team, "uid" | "tid">) {
  return `${getTeamDashboardLink(team)}/settings`;
}

export function getTeamMeetingLink(team: Pick<Team, "uid" | "tid">) {
  return `${getTeamDashboardLink(team)}/meeting`;
}
