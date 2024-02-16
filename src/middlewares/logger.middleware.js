import { getLogger } from "../utils/log/factory.js";

export const addLogger = async (req, res, next) => {
  const { logger } = await getLogger();
  req.logger = logger;

  next();
};
