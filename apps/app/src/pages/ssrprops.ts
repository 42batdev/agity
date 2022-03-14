import { GetServerSidePropsResult } from "next";

export interface TeamServerSideProps {
  uid: string;
  tid: string;
}

export const initTeamProps = async (
  context
): Promise<GetServerSidePropsResult<TeamServerSideProps>> => {
  const { uid, tid } = context.query;

  if (uid && tid) {
    return {
      props: {
        uid,
        tid,
      },
    };
  }

  return {
    redirect: {
      destination: `/`,
      permanent: false,
    },
  };
};

export interface MeetingServerSideProps {
  meetingId: string;
}

export const initMeetingProps = async (
  context
): Promise<GetServerSidePropsResult<MeetingServerSideProps>> => {
  const { meetingId } = context.query;
  if (meetingId) {
    return {
      props: {
        meetingId,
      },
    };
  }

  return {
    redirect: {
      destination: `/`,
      permanent: false,
    },
  };
};
