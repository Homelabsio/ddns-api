import { Express,Request, Response, Router } from "express";
import { Logger } from "winston";
import { authRoutes as setupAuthRoutes } from "./auth";

function setupRoutes(app: Express, mount: string, logger: Logger): void {
    let v1Router = Router()
    v1Router.get("/", (req: Request, res: Response) =>{
        res.status(200).json({message:`Hello World! from ${req.baseUrl}`});
    });
    setupAuthRoutes(app, `${mount}/auth`, logger);
    app.use(mount, v1Router);
}

export { setupRoutes as v1Routes }