/* eslint-disable @next/next/no-server-import-in-page */
import type {NextFetchEvent, NextRequest} from "next/server";
import {NextResponse} from "next/server";

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

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  let authResult = await getUser(req);
  if (authResult.error) {
    console.log(
      "Authorization error, redirecting to login page",
      authResult.error
    );
    return NextResponse.redirect(`/`);
  } else if (!authResult.user) {
    console.log("No auth user, redirecting");
    return NextResponse.redirect(`/`);
  } else {
    return NextResponse.next();
  }
}

async function getUser(req: NextRequest) {
  let token = req.cookies["sb:token"];
  if (!token) {
    return {
      user: null,
      data: null,
      error: "There is no supabase token in request cookies",
    };
  }

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        APIKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      },
    }
  );

  if (result.status == 200) {
    const json = await result.json();
    if (json.role === "authenticated") {
      return {
        user: result,
        data: result,
        error: null,
      };
    }
  } else {
    return {
      user: null,
      data: null,
      error: `Supabase auth returned ${result.status}. See logs for details`,
    };
  }
}
