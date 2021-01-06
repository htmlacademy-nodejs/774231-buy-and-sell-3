'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const {DEFAULT_PORT, HttpCode, API_PREFIX} = require(`../constants`);
const appRouter = require(`../api`);

module.exports = {
  name: `--server`,
  async run(arg) {
    const [userServerPort] = arg;
    const port = Number.parseInt(userServerPort, 10) || DEFAULT_PORT;

    const app = express();

    app.use(API_PREFIX, appRouter);

    app.use((_, res) => res
       .status(HttpCode.NOT_FOUND)
       .send(`Not found`));

    app.listen(port, (err) => {
      if (err) {
        return console.error(chalk.red(`Ошибка при создании сервера`, err));
      }

      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  },
};
