import { User } from "@supabase/supabase-js";

export type ResolverContext = {
  user: User;
};
