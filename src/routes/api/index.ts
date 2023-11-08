import { Express,Request, Response, Router } from "express";
import { Logger } from "winston";
import { v1Routes as setupV1Routes } from "./v1";

function setupRoutes(app: Express, mount: string, logger: Logger): void {
    let apiRouter = Router()
    apiRouter.get("/", (req: Request, res: Response) =>{
        res.status(200).json({message:`Hello World! from ${req.baseUrl}`});
    });
    setupV1Routes(app,`${mount}/v1`, logger)
    app.use(mount, apiRouter);
}

export { setupRoutes as apiRoutes }