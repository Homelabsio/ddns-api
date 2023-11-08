import { IncomingMessage, ServerResponse } from 'http';
import morgan from 'morgan';
import { Logger }  from 'winston';

type Handler<Request extends IncomingMessage, Response extends ServerResponse> = (req: Request, res: Response, callback: (err?: Error) => void) => void;

function setupMorgan(logger: Logger): any {
    
    let transport: morgan.StreamOptions = {
        write: (message) => logger.http(message.trim()),
      };
    let middleware = morgan(
        ":status :method :url :remote-addr :res[content-length] - :response-time ms", 
        {
          stream: transport,
          skip: skip, 
        }
    )
    return middleware;
}

function skip(): boolean {
    var env: string = process.env.NODE_ENV || 'development';
  return env !== "development";
};

export { setupMorgan as morganMiddleware }