import { Meeting, Team } from "../generated/graphql";
import { NextRouter, useRouter } from "next/router";
import { useMemo } from "react";

export interface AgityRouter extends NextRouter {
  openUserOnboarding: () => void;
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
      openUserOnboarding: () => {
        router.push(getUserOnboardingLink());
      },
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

export function getUserOnboardingLink() {
  return `/dashboard/onboarding`;
}

export function getUserDashboardLink() {
  return `/dashboard/overview`;
}

export function getUserSettingsLink() {
  return `/dashboard/settings`;
}

export function getTeamDashboardLink(team: Pick<Team, "uid" | "tid">) {
  return `/u/${team.uid}/${team.tid}/overview`;
}

export function getTeamMembersLink(team: Pick<Team, "uid" | "tid">) {
  return `/u/${team.uid}/${team.tid}/members`;
}

export function getTeamSettingsLink(team: Pick<Team, "uid" | "tid">) {
  return `/u/${team.uid}/${team.tid}/settings`;
}

export function getTeamMeetingLink(team: Pick<Team, "uid" | "tid">) {
  return `/u/${team.uid}/${team.tid}/meeting`;
}
