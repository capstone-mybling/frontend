module.exports = {
    apps: [{
        name: 'mybling',
        instance: 4,
        script: 'node_modules/next/dist/bin/next',
        args: 'start',
        exec_mode: 'cluster',
        env_local: {
            APP_ENV: 'local'
        },
        env_development: {
            APP_ENV: 'dev'
        },
        env_production: {
            APP_ENV: 'prod'
        }
    }]
}