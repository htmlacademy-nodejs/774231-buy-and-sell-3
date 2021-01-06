'use strict';

const {Router} = require(`express`);
const getMockData = require(`../lib/get-mock-data`);
const CategoryService = require(`../data-service/category`);
const SearchService = require(`../data-service/search`);
const OfferService = require(`../data-service/offer`);

const categoriesRouter = require(`./routes/categories`);
const offersRouter = require(`./routes/offers`);
const searchRouter = require(`./routes/search`);

const appRouter = new Router();

(async () => {
  const data = await getMockData();

  categoriesRouter(appRouter, new CategoryService(data));
  offersRouter(appRouter, new OfferService(data));
  searchRouter(appRouter, new SearchService(data));
})();

module.exports = appRouter;
