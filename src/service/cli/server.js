'use strict';

const express = require(`express`);
const {DEFAULT_PORT, HttpCode, API_PREFIX} = require(`../constants`);
const appRouter = require(`../api`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger({name: `api`});

module.exports = {
  name: `--server`,
  async run(arg) {
    const [userServerPort] = arg;
    const port = Number.parseInt(userServerPort, 10) || DEFAULT_PORT;

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.use(API_PREFIX, appRouter);

    app.use((req, res, next) => {
      logger.debug(`Request on route ${req.url}`);
      res.on(`finish`, () => {
        logger.info(`Response status code ${res.statusCode}`);
      });
      next();
    });

    app.use((req, res) => {
      res
       .status(HttpCode.NOT_FOUND)
       .send(`Not found`);
      logger.error(`Route not found: ${req.url}`);
    });

    app.use((err, _req, _res, _next) => {
      logger.error(`An error occured on processing request: ${err.message}`);
    });

    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occured on server creation: ${err.message}`);
        }

        return logger.info(`Listening to connections on ${port}`);
      });
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
  },
};
