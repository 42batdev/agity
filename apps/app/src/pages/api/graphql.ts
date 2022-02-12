import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { resolvers } from "../../server/graphql/resolvers";
import * as typeDefs from "../../server/graphql/schema.graphql";
import supabase from "../../supabase";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await supabase.auth.api.getUserByCookie(req, res);
  supabase.auth.setAuth(user.token);

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
