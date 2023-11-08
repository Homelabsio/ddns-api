import { Express,Request, Response, Router } from "express";
import { Logger } from "winston";
import Controller from "../../../../controllers/auth/github.controller";
import passport from "passport";


function setupRoutes(app: Express, mount: string, logger: Logger): void {
    let githubRouter = Router();
    githubRouter.get('/hello', (req: Request, res: Response) =>{
        res.status(200).json({message:`Hello World! from ${req.baseUrl}`});
    });
    githubRouter.get('', passport.authenticate('github', {}));
    // githubRouter.get('/', (req: Request, res: Response) =>{
    //     res.status(302).redirect('');
    // });
    githubRouter.get('/callback',
        passport.authenticate('github', {
            failureRedirect: '/login'
        }), 
        (req: Request, res: Response) => {
            res.redirect('/api/v1/auth/github/info');
        }
    );
    githubRouter.get('/info', Controller.info);
    app.use(mount,githubRouter);
    logger.debug("[Routes] auth/github mounted");
}

export { setupRoutes as githubRoutes }