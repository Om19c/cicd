const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello from the CI/CD demo 🚀</h1>");
});

app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

app.get("/api/info", (req, res) =>
  res.json({ version: process.env.APP_VERSION || "dev", env: process.env.NODE_ENV || "development" })
);

module.exports = app;
