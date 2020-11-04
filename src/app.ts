import 'tsconfig-paths/register';
import { env } from '@app/config/environment';

import { errorMiddleware, httpLogger, expressStatusMonitorMiddleware, corsMiddleware, sessionMiddleware } from '@app/middleware';
import { ping as pingPostgresDatabase } from './db/knex';
import { pingRedisDatabase } from './redis/client';
import { initRoutes } from './routes';
import { initApolloGraphqlServer } from './graphql';

import { createServer } from 'http';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import express from 'express';

import passport from 'passport';
import './passport-strategies';

const app = express();

(async () => {
  // Test Postgres DB
  try {
    await pingPostgresDatabase();
  } catch {
    return;
  }

  // Test Redis DB
  try {
    await pingRedisDatabase();
  } catch {
    return;
  }

  // Note:
  // In case your app is running behind a proxy, you should configure this.
  // Elastic Beanstalk instances for example has an nginx proxy by default.
  // Read more at https://expressjs.com/en/guide/behind-proxies.html
  app.set('trust proxy', true);

  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(corsMiddleware());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(sessionMiddleware());
  app.use(compression());
  app.use(expressStatusMonitorMiddleware());
  app.use(httpLogger);
  app.use(passport.initialize());
  app.use(passport.session());

  initRoutes(app);

  app.use(errorMiddleware());
  const apolloServer = await initApolloGraphqlServer(app);

  // For the subscription server
  const httpServer = createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(env.app.port, () => {
    console.info(`Server is now up @ ${env.app.port}`);
  });
})();
