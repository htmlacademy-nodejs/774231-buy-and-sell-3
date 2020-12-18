'use strict';

const http = require(`http`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {DEFAULT_PORT, MOCKS_FILE_NAME, HttpCode} = require(`../constants`);

const sendResponseClient = (res, statusCode, message) => {
  const template = `
  <!Doctype html>
    <html lang="ru">
    <head>
      <title>With love from Node</title>
    </head>
    <body>${message}</body>
  </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const onClientConnect = async (req, res) => {
  const NOT_FOUND_MESSAGE = `Not found`;

  switch (req.url) {
    case `/`: {
      try {
        const fileContent = JSON.parse(await fs.readFile(MOCKS_FILE_NAME, `utf8`));
        const message = `<ul>${fileContent.map((post) => `<li>${post.title}</li>`).join(``)}</ul>`;
        sendResponseClient(res, HttpCode.OK, message);
      } catch (err) {
        sendResponseClient(res, HttpCode.NOT_FOUND, NOT_FOUND_MESSAGE);
      }
      break;
    }

    default: {
      sendResponseClient(res, HttpCode.NOT_FOUND, NOT_FOUND_MESSAGE);
      break;
    }
  }
};

module.exports = {
  name: `--server`,
  run(arg) {
    const [userServerPort] = arg;
    const port = Number.parseInt(userServerPort, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
        .listen(port)
        .on(`listening`, (err) => {
          if (err) {
            return console.error(chalk.red(`Ошибка при создании сервера`, err));
          }

          return console.info(chalk.green(`Ожидаю соединений на ${port}`));
        });
  },
};
