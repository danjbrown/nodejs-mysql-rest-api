const config = {
    development: {
        // database connection settings for dev
        database: {
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'users',
            socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
        }
    },
    production: {
        // database connection settings for live
        database: {
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'users',
            socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
        }
    }
};

module.exports = config;