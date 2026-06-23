module.exports = {
  apps: [
    {
      name: "techcatalyst-landing",
      cwd: "/var/www/techcatalyst-landing",
      script: "npm",
      args: "start",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
