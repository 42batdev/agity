import { QueryResolvers } from "../../../generated/graphql";
import supabase from "../../../supabase";
import { handleSupabaseError } from "../../../supabase/pql";
import { createProfile } from "../../../supabase/pql/profiles";

export const profileQueryResolvers: QueryResolvers = {
  async getUserProfile(parent, args, { user }) {
    return await supabase
      .from("profiles")
      .select("*")
      .match({ id: user.id })
      .then(handleSupabaseError)
      .then(({ data }) => createProfile(data[0]));
  },
};
