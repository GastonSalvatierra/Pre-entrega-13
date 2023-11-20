import { devLogger } from "../config/logger_BASE.js";

export const testLogger = async (req, res) => {
    res.send('TEST INICIADO CON EXITO')  
    req.logger = devLogger;

        req.logger.debug('TEST DE PRUEBA PARA LOGGER --- debug');
        req.logger.http('TEST DE PRUEBA PARA LOGGER --- http');
        req.logger.info('TEST DE PRUEBA PARA LOGGER --- info');
        req.logger.warning('TEST DE PRUEBA PARA LOGGER --- warning');
        req.logger.error('TEST DE PRUEBA PARA LOGGER --- error ');
        req.logger.fatal('TEST DE PRUEBA PARA LOGGER --- fatal');
      
      
}

