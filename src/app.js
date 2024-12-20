const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
const config = require("./config");
const db = require("./config/database");

const reqLogger = require("./utils/reqLogger");

const app = express();
const port = config.PORT || 8000;

// Add middleware
app.use(cors());
app.use(express.json());

app.use(reqLogger); // request logger

app.use(router);

app.get("/", (req, res) => {
  res.send("Welcome to Bloogin App...");
});

// Global 404 error handler
app.use((req, res) => res.status(404).send({
  status: "error",
  error: "Not found",
  message: "Route not correct, kindly check URL...",
}));

(async () => {
  process.on("warning", (e) => config.logger.warn(e.stack));
  console.log("Waiting for DATABASE Connection...");
  await db.connect();
  app.listen(config.PORT || 8000, async () => {
    console.log(
      `${config.APP_NAME} API listening on ${port || 4000}`
    );
  });
})();

process.on("unhandledRejection", (error) => {
  console.log("FATAL UNEXPECTED UNHANDLED REJECTION!", error.message);
  console.error("\n\n", error, "\n\n");
});

module.exports = app;  