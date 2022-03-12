import { createClient } from "@supabase/supabase-js";

export const supabaseSSRServiceRole = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export function handleSupabaseError(result) {
  const { error, ...rest } = result;
  if (error) {
    console.error("A graphql error occurred.", result);
    throw error;
  }
  return rest;
}

export function logSupabaseData(result) {
  console.log(result);
  return result;
}
