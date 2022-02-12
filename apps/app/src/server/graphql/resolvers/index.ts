import { Resolvers } from '../../../generated/graphql';
import { usersResolvers } from './basicResolvers';
import { queryResolvers } from './queryResolvers';

export const resolvers: Resolvers = {
  Query: queryResolvers,
  User: usersResolvers
};
