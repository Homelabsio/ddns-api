import { Express,Request, Response, Router } from "express";
import { Logger } from "winston";
import { apiRoutes as setupApiRoutes } from "./api";

function setupRoutes(app: Express, mount: string, logger: Logger): any {
    let rootrouter = Router();
    rootrouter.get(mount, (req: Request, res: Response) =>{
        res.status(200).json({message:`Hello World! from ${req.baseUrl}`});
    });
    setupApiRoutes(app,`${mount}api`, logger)
    app.use(mount, rootrouter);
}

export { setupRoutes as rootRoutes }