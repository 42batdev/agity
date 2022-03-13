import { resolvers } from "./graphql/resolvers";
import * as typeDefs from "./graphql/schema.graphql";
import {
  getUser,
  supabaseServerClient,
} from "@supabase/supabase-auth-helpers/nextjs";
import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = await supabaseServerClient({ req, res });
  const { user } = await getUser({ req, res });

  if (!supabase.auth.session() || !user) {
    throw Error;
  }

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: { user, supabase },
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
