import { Express,Request, Response, Router } from "express";
import { Logger } from "winston";
import { githubRoutes as setupGithubRoutes } from "./github";
function setupRoutes(app: Express, mount: string, logger: Logger): void {
    let authRouter = Router()
    authRouter.get("/", (req: Request, res: Response) =>{
        res.status(200).json({message:`Hello World! from ${req.baseUrl}`});
    });
    setupGithubRoutes(app,`${mount}/github`, logger)
    app.use(mount, authRouter);
}

export { setupRoutes as authRoutes }