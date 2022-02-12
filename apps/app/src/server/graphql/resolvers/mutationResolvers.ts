import { MutationResolvers, Profile } from "../../../generated/graphql";
import supabase from "../../../supabase";
import { handleSupabaseError } from "../../../supabase/pql";
import { createProfile } from "../../../supabase/pql/profiles";

export const mutationResolvers: MutationResolvers = {
  updateProfile: (parent, { id, input }) => {
    let update = {};
    if (input.uid !== undefined) update = { ...update, uid: input.uid };
    if (input.name !== undefined) update = { ...update, name: input.name };
    if (input.avatar !== undefined)
      update = { ...update, avatar_url: input.avatar.filename };

    return supabase
      .from("profiles")
      .update({ ...update })
      .match({ id })
      .then(handleSupabaseError)
      .then(({ data }) => createProfile(data)) as Promise<Profile>;
  },
};
