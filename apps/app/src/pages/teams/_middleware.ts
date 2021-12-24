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
    return NextResponse.redirect(`/login`);
  } else if (!authResult.user) {
    console.log("No auth user, redirecting");
    return NextResponse.redirect(`/login`);
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

  let result = await (
    await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        APIKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      },
    })
  ).json();

  if (
    (
      await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          APIKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
        },
      })
    ).status != 200
  ) {
    return {
      user: null,
      data: null,
      error: `Supabase auth returned ${
        (
          await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
              APIKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
            },
          })
        ).status
      }. See logs for details`,
    };
  } else if (result.aud === "authenticated") {
    return {
      user: result,
      data: result,
      error: null,
    };
  }
}
