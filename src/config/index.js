const { isEmpty } = require("lodash");
const logger = require("pino");
const dotenv = require("dotenv");

dotenv.config();

const config = {
  logger: logger(),
  PORT: process.env.PORT,
  APP_NAME: process.env.APP_NAME,
  MONGO_URL: process.env.MONGO_URL,
  JWT_KEY: process.env.JWT_KEY,
};

const absentConfig = Object.entries(config)
  .map(([key, value]) => [key, !!value])
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (!isEmpty(absentConfig)) {
  throw new Error(`Missing Config: ${absentConfig.join(", ")}`);
}

module.exports = config;