const withTM = require("next-transpile-modules")(["ui", "supabase"]);

module.exports = withTM({
  reactStrictMode: true,
});
