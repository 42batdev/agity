import { Resolvers } from "../../../generated/graphql";
import { queryResolvers } from "./queryResolvers";

export const resolvers: Resolvers = {
  Query: queryResolvers,
};
