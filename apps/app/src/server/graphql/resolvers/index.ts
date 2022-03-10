import { Resolvers } from "../../../generated/graphql";
import {
  meetingMutationResolvers,
  profileMutationResolvers,
  teamMutationResolvers,
} from "./mutationResolvers";
import { profileQueryResolvers, teamQueryResolvers } from "./queryResolvers";
import {
  memberResolvers,
  profileResolvers,
  teamResolvers,
} from "./typeResolvers";

export const resolvers: Resolvers = {
  Mutation: {
    ...profileMutationResolvers,
    ...teamMutationResolvers,
    ...meetingMutationResolvers,
  },
  Query: { ...profileQueryResolvers, ...teamQueryResolvers },
  Profile: { ...profileResolvers },
  Team: { ...teamResolvers },
  Member: { ...memberResolvers },
};
