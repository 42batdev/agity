import { MutationResolvers } from "../../../generated/graphql";
import supabase from "../../../supabase";

export const mutationResolvers: MutationResolvers = {
  updateUserProfile: (parent, { id, input }) => {
    let update = {};
    if (input.uid !== undefined) update = { ...update, uid: input.uid };
    if (input.name !== undefined) update = { ...update, name: input.name };
    if (input.avatar !== undefined)
      update = { ...update, avatar_url: input.avatar.filename };

    return supabase
      .from("profiles")
      .update({ ...update })
      .match({ id })
      .then((result) => {
        if (result.error) {
          throw result.error;
        }

        return result.data[0];
      }) as Promise<any>;
  },
};
