import { GetServerSidePropsResult } from "next";

export interface TeamServerSideProps {
  id: string;
  uid: string;
  tid: string;
}

export const initTeamProps = async (
  context
): Promise<GetServerSidePropsResult<TeamServerSideProps>> => {
  const { uid, tid, id } = context.query;

  if (uid && tid && id) {
    return {
      props: {
        id,
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
