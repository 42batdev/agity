import { QueryResolvers, User } from '../../../generated/graphql';
import supabase from "../../../supabase";

export const queryResolvers: QueryResolvers = {
  getUserProfile(parent, { id } ) {
    return supabase
      .from("profiles")
      .select("id, uid, name, avatar_url")
      .match({ id })
      .then(({data, error})=> {
        if (error) {
          console.log(error)
          throw error;
        }

        const avatar = data[0].avatar_url ? {
          url: supabase.storage.from("avatars").getPublicUrl(data[0].avatar_url).publicURL,
          filename: data[0].avatar_url
        } : undefined;

        const user : User = {
          id: data[0].id,
          uid: data[0].uid,
          name: data[0].name,
          avatar
        }

        return user;
      }) as Promise<User>
  }
};