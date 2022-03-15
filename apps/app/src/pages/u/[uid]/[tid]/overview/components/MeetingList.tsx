import Card from "../../../../../../components/card/Card";
import { CardGrid } from "../../../../../../components/card/CardGrid";
import { useAgityRouter } from "../../../../../../functions/AgityRouter";
import { useGetTeamMeetingsQuery } from "../../../../../../generated/graphql";
import { useTid, useUid } from "../../TeamNavigationContext";

export const MeetingList = () => {
  const router = useAgityRouter();

  const { data, loading } = useGetTeamMeetingsQuery({
    variables: {
      input: {
        uidtid: {
          uid: useUid(),
          tid: useTid(),
        },
      },
    },
  });

  return (
    <CardGrid loading={loading}>
      {data &&
        data.getTeam?.meetings?.map((meeting) => (
          <Card
            key={meeting.id}
            title={meeting.name}
            description={meeting.state}
            onClick={() => {
              if (data?.getTeam) {
                router.openTeamMeeting(data.getTeam, meeting);
              }
            }}
          />
        ))}
    </CardGrid>
  );
};
