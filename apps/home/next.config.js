const withTM = require("next-transpile-modules")(["ui", "supabase"]);

const { APP_URL } = process.env;

module.exports = withTM({
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/login",
        destination: `${APP_URL}/login`,
        permanent: true,
      },
    ];
  },
});
