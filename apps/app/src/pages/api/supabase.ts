import { createClient } from "@supabase/supabase-js";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error(
    "Please define the NEXT_PUBLIC_SUPABASE_URL environment variable inside .env.local"
  );
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error(
    "Please define the NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable inside .env.local"
  );
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "Please define the SUPABASE_SERVICE_ROLE_KEY environment variable inside .env.local"
  );
}

export const supabaseSuperClient = createClient(
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
