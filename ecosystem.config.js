module.exports = {
  apps: [
    {
      name: "fulcrum-backend",
      script: "backend/dist/main.js",
      cwd: "./backend",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        DATABASE_URL: "postgresql://fulcrum:password@localhost:5432/fulcrum"
      }
    },
    {
      name: "fulcrum-frontend",
      script: "npm",
      args: "start",
      cwd: "./frontend",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
}