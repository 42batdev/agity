import { Resolvers } from "../../../generated/graphql";
import {
  memberResolvers,
  profileResolvers,
  teamResolvers,
} from "./typeResolvers";
import {
  profileMutationResolvers,
  teamMutationResolvers,
} from "./mutationResolvers";
import { profileQueryResolvers, teamQueryResolvers } from "./queryResolvers";

export const resolvers: Resolvers = {
  Mutation: { ...profileMutationResolvers, ...teamMutationResolvers },
  Query: { ...profileQueryResolvers, ...teamQueryResolvers },
  Profile: { ...profileResolvers },
  Team: { ...teamResolvers },
  Member: { ...memberResolvers },
};
