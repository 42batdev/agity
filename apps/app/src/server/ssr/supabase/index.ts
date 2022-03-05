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

if (!process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY) {
  throw new Error(
    "Please define the NEXT_PUBLIC_SUPABASE_SERVICE_KEY environment variable inside .env.local"
  );
}

const supabaseSSR = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default supabaseSSR;

export const supabaseSSRServiceRole = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY
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
