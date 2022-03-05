import { resolvers } from "../../server/graphql/resolvers";
import * as typeDefs from "../../server/graphql/schema.graphql";
import supabaseSSR from "../../server/ssr/supabase";
import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await supabaseSSR.auth.api.getUserByCookie(req, res);
  if (session.token) {
    supabaseSSR.auth.setAuth(session.token);
  } else {
    throw Error;
  }

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: { user: session.user },
  });

  const startServer = apolloServer.start();

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST");
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: `/api/graphql`,
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
