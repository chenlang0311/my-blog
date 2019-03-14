module.exports = {
  apps : [{
    name: 'API',
    script: 'build/main.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '47.106.247.86',
      ref  : 'origin/master',
      repo : 'git@github.com:chenlang0311/my-blog.git',
      path : '/home/blogspace/my-blog',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
