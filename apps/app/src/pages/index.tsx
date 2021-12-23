import { NextPageContext } from "next";
import React from "react";

const Index = () => {
  return <></>;
};

Index.getInitialProps = async (ctx: NextPageContext) => {
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: "/login/redirect" });
    ctx.res.end();
  }
  return {};
};

export default Index;
