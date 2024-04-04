import { Command } from "commander";
//import dotenv from "dotenv";

const commander = new Command();
commander.option(
  `--mode <mode>`,
  "Modo del servidor: development o production"
);
commander.parse();
const environment = commander.opts().environment;
const envPath = `.env.${environment}`;

//dotenv.config('.env');

export default {
  port: process.env.PORT,
  url: process.env.MONGO_URL,
  environment: process.env.NODE_ENV,
};
