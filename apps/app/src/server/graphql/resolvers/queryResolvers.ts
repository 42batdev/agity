import { QueryResolvers } from "../../../generated/graphql";
import { handleSupabaseError } from "../../ssr/supabase";
import {
  createProfile,
  createSearchProfilesResult,
} from "./factories/profiles";
import { createTeam } from "./factories/teams";

export const profileQueryResolvers: QueryResolvers = {
  async getUserProfile(parent, args, { supabase, user }) {
    return await supabase
      .from("profiles")
      .select("*")
      .match({ id: user.id })
      .then(handleSupabaseError)
      .then(({ data }) => createProfile(supabase, data[0]));
  },
  async searchProfiles(parent, { input }, { supabase }) {
    let filter: string[] = [];
    if (input.uid) filter.push(`uid.ilike.%${input.uid}%`);
    if (input.name) filter.push(`name.ilike.%${input.name}%`);

    if (filter.length === 0)
      return await createSearchProfilesResult(supabase, [], 0);

    let postgrestFilterBuilder = supabase
      .from("profiles")
      .select("*", { count: "exact" });
    if (input.limit) postgrestFilterBuilder.limit(input.limit);
    return await postgrestFilterBuilder
      .or(filter.join(","))
      .then(handleSupabaseError)
      .then(({ data, count }) =>
        createSearchProfilesResult(supabase, data, count)
      );
  },
};

export const teamQueryResolvers: QueryResolvers = {
  async getTeam(parent, { id }, { supabase }) {
    return await supabase
      .from("teams")
      .select("*")
      .match({ id })
      .then(handleSupabaseError)
      .then(({ data }) => createTeam(data[0]));
  },
};
