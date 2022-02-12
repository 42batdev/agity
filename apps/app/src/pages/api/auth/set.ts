import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  supabase.auth.api.setAuthCookie(req, res);
}