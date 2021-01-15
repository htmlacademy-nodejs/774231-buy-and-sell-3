'use strict';

const {Router} = require(`express`);
const {ServiceRequestAPI} = require(`../../http-service`);

const searchRouter = new Router();

searchRouter.get(`/`, async (req, res) => {
  const queryString = req.query.search;
  try {
    const results = await ServiceRequestAPI.search(queryString);
    res.render(`search-result`, {results});
  } catch (err) {
    res.render(`search-result`, {results: []});
  }
});


module.exports = {
  searchRouter
};
