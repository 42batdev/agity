import { Resolvers } from "../../../generated/graphql";
import {
  profileMutationResolvers,
  teamMutationResolvers,
} from "./mutationResolvers";
import { profileQueryResolvers, teamQueryResolvers } from "./queryResolvers";

export const resolvers: Resolvers = {
  Query: { ...profileQueryResolvers, ...teamQueryResolvers },
  Mutation: { ...profileMutationResolvers, ...teamMutationResolvers },
};
