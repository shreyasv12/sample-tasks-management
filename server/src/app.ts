import cors from 'cors';
import bodyParser from 'body-parser';
import express, { Express, NextFunction, Request, Response } from 'express';

import config from './config/config';

import loginRoutes from './routes/login.route';

const app: Express = express();

app.use(cors({
  origin: config.appWhiteListDomains,
  credentials: true, // access-control-allow-credentials:true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function errorHandlers (err: any, req: Request, res: Response, next: NextFunction) {
  if (!err.statusCode || err.statusCode === 500) {
    console.error('ERROR ', err);
  }

  res.status(err.statusCode || 500).send(err);
}

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(loginRoutes);

app.use(errorHandlers);

export default app;
