import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import { logger } from './src/utils/logger'
import { morganMiddleware } from './src/middlewares/morgan.middleware'
// Routes
import { rootRoutes as setupRootRoutes } from './src/routes';
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
// /* @ts-expect-error */
// import { RedditStrategy } from "passport-reddit";
// /* @ts-expect-error */
// import { GitLabStrategy } from "passport-gitlab2";

import connection from "./src/services/database";

dotenv.config();

const app: Express = express();
const port: string|undefined = process.env['API_APP_PORT'];
const host: string|undefined = process.env['API_APP_HOST'];


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware(logger));

setupRootRoutes(app,"/", logger);

//Passport Setup
/* @ts-expect-error */
if (JSON.parse(<string>process.env['API_AUTH_GITHUB_CLIENT_ENABLED'].toLowerCase())) {
    passport.use(new GitHubStrategy({
        clientID: <string>process.env['API_AUTH_GITHUB_CLIENT_ID'],
        clientSecret: <string>process.env['API_AUTH_GITHUB_CLIENT_SECRET'],
        callbackURL: <string>process.env['API_AUTH_GITHUB_CALLBACK_URL'],
        scope: ['user:email'],
    },(accessToken: any, refreshToken: any, profile: any, done: any)=>{

    }));
}
// /* @ts-expect-error */
// if (JSON.parse(<string>process.env['API_AUTH_REDDIT_CLIENT_ENABLED'].toLowerCase())) {
//     passport.use(new RedditStrategy({
//         clientID: <string>process.env['API_AUTH_REDDIT_CLIENT_ID'],
//         clientSecret: <string>process.env['API_AUTH_REDDIT_CLIENT_SECRET'],
//         callbackURL: <string>process.env['API_AUTH_REDDIT_CALLBACK_URL']
//     },(accessToken: any, refreshToken: any, profile: any, done: any)=>{
        
//     }));
// }

// /* @ts-expect-error */
// if (JSON.parse(<string>process.env['API_AUTH_GITLAB_CLIENT_ENABLED'].toLowerCase())) {
//     passport.use(new GitLabStrategy({
//         clientID: <string>process.env['API_AUTH_GITLAB_CLIENT_ID'],
//         clientSecret: <string>process.env['API_AUTH_GITLAB_CLIENT_SECRET'],
//         callbackURL: <string>process.env['API_AUTH_GITLAB_CALLBACK_URL']
//     },(accessToken: any, refreshToken: any, profile: any, done: any)=>{
        
//     }));
// }
    
app.listen(port, () => {
    logger.info(`Server is running at ${host}:${port}`);
});
