const withTM = require("next-transpile-modules")(["ui", "supabase"]);

module.exports = withTM({
  reactStrictMode: true,
  assetPrefix: "http://localhost:3001",
});
