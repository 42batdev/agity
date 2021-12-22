const withTM = require("next-transpile-modules")(["ui", "supabase"]);

module.exports = withTM({
  reactStrictMode: true,
  basePath: "/app",
  assetPrefix: "http://localhost:4000/app",
});
