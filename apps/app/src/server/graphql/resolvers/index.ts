import { Resolvers } from "../../../generated/graphql";
import { profileResolvers } from "./basicResolvers";
import {
  profileMutationResolvers,
  teamMutationResolvers,
} from "./mutationResolvers";
import { profileQueryResolvers } from "./queryResolvers";

export const resolvers: Resolvers = {
  Mutation: { ...profileMutationResolvers, ...teamMutationResolvers },
  Query: { ...profileQueryResolvers },
  Profile: { ...profileResolvers },
};
