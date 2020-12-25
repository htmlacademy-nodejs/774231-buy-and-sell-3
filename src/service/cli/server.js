'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {DEFAULT_PORT, MOCKS_FILE_NAME, HttpCode} = require(`../constants`);

module.exports = {
  name: `--server`,
  run(arg) {
    const [userServerPort] = arg;
    const port = Number.parseInt(userServerPort, 10) || DEFAULT_PORT;

    const app = express();
    const router = new express.Router();

    router.get(`/`, async (_, res) => {
      try {
        const fileContent = await fs.readFile(MOCKS_FILE_NAME, `utf8`);
        const mocks = JSON.parse(fileContent);
        res.json(mocks);
      } catch (err) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
      }
    });

    app.use(`/offers`, router);

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
