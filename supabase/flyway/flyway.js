const config = require('./config.js');

module.exports = function() {
    return {
        flywayArgs: {
            url: `jdbc:postgresql://${config.db_host}/`,
            user: config.db_user,
            password: config.db_password,

            locations: 'filesystem:supabase/migrations/',
            sqlMigrationSuffixes: '.sql',
            baselineOnMigrate: true,

            schemas: '',
            sqlMigrationPrefix: '',
            sqlMigrationSeparator: '_'
        },
    };
};