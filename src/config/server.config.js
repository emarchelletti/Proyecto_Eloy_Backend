import { Command } from "commander";

const commander = new Command();
commander.option(
  `--mode <mode>`,
  "Modo del servidor: development o production"
);
commander.parse();
const environment = commander.opts().environment;
const envPath = `.env.${environment}`;


export default {
  port: process.env.PORT,
  url: process.env.MONGO_URL,
  environment: process.env.NODE_ENV,
};
