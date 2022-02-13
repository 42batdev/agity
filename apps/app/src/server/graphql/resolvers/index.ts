import { Resolvers } from "../../../generated/graphql";
import {
  profileMutationResolvers,
  teamMutationResolvers,
} from "./mutationResolvers";
import { profileQueryResolvers } from "./queryResolvers";

export const resolvers: Resolvers = {
  Query: { ...profileQueryResolvers },
  Mutation: { ...profileMutationResolvers, ...teamMutationResolvers },
};
