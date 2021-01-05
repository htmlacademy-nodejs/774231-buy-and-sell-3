'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

const searchRouter = new Router();

module.exports = (appRouter, service) => {
  appRouter.use(`/search`, searchRouter);

  searchRouter.get(`/`, (req, res) => {
    console.log(`query: `, req.query.query);
    const searchData = service.getDataByQuery(req.query.query || ``);

    if (searchData.length === 0) {
      return res.status(HttpCode.NOT_FOUND).send(`По результатм поиска ничего не найдено`);
    }

    return res.status(HttpCode.OK).json(searchData);
  });
};
