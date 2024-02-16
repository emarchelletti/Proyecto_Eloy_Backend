import config from "../config/server.config.js";

export const loggerGet = async (req, res) => {
  req.logger.debug("Este es un mensaje de debugging");
  req.logger.http(`Se realizo un metodo ${req.method} en ${req.url} - a las ${new Date().toLocaleTimeString()}`);
  req.logger.info("Este es un mensaje de info");
  req.logger.warning("Este es un mensaje de warning");
  req.logger.error("Este es un mensaje de error");
  req.logger.fatal("Este es un mensaje de FATAL");
  res.json({ message: `Probando el logger desde el modo ${config.environment}` });
};
