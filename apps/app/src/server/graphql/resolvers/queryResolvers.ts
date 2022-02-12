import { QueryResolvers, User } from '../../../generated/graphql';

export const queryResolvers: QueryResolvers = {
  async getUserProfile() {
    return {id: "1", name: undefined, avatar: undefined} as User;
  }
};
