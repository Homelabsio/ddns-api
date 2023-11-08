import { Sequelize } from "sequelize-typescript";
import { logger } from "../utils/logger";
// import x25519Key from "../models/x25519Key.model";
// import portMap from "../models/portMap.model";
// import endPoint from "../models/endPoint.model";

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/tunnel.sqlite',
    logging: (msg: string)=>{
        if (false) {
            logger.info(`[sequelize] ${msg}`);            
        }
    },
    models: []
    // models: [x25519Key, portMap, endPoint]
});

export default connection