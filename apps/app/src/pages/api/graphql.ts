import { ApolloError } from "apollo-server-errors";
import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { resolvers } from "../../server/graphql/resolvers";
import * as typeDefs from "../../server/graphql/schema.graphql";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export class DatabaseError extends ApolloError {
  constructor(message: string) {
    super(message, "DATABASE_ERROR");

    Object.defineProperty(this, "name", { value: "DatabaseError" });
  }
}

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
