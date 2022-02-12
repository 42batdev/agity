import { User, UserResolvers } from '../../../generated/graphql';

export const usersResolvers: UserResolvers = {
  name(user) {
    return 'Anonymous';
  }
};
