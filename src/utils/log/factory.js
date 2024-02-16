import config from "../../config/server.config.js";

export const  getLogger = async () => {
  let response
  switch (config.environment) {
    case 'desarrollo':
      console.log('Logger funcionando en modo desarrollo')
      response = await import('./dev.logger.js')
      break

    case 'produccion':
      console.log('logger funcionando en modo produccion')
      response = await import('./prod.logger.js')
      break
  }

  return response
}

