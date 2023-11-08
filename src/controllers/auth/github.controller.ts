import { Request, Response } from "express";
const { Op } = require("sequelize");
import { logger } from '../../utils/logger';
import { log } from "console";
import passport from "passport";
import { promisify } from "util";

class Controller {
    className!: string;
    debug!: boolean;
    constructor() {}


    // TODO: FIX
    // static authenticate(req: Request, res: Response): any {
    //     return passport.authenticate('github', { scope: [ 'user:email' ] }); 
    // }

    static async callback(req: Request, res: Response): Promise<Response> {     
        logger.info(`Body: ${JSON.stringify(req.body)}`);
        logger.info(`Params: ${JSON.stringify(req.params)}`);   
        logger.info(`Query: ${JSON.stringify(req.query)}`);
        logger.info(`User: ${JSON.stringify(req.user)}`);
        return res.status(200).json({message:`Hello World! from ${req.baseUrl}${req.path}`});
    }

    static async info(req: Request, res: Response): Promise<Response> {
        logger.info(`Body: ${JSON.stringify(req.body)}`);
        logger.info(`Params: ${JSON.stringify(req.params)}`);   
        logger.info(`Query: ${JSON.stringify(req.query)}`);
        logger.info(`User: ${JSON.stringify(req.user)}`);
        return res.status(200).json({message:`Hello World! from ${req.baseUrl}${req.path}`});
    }

}


export default Controller;