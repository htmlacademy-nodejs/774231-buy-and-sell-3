'use strict';

const {Router} = require(`express`);

const searchRouter = new Router();

searchRouter.get(`/`, (req, res) => {
  res.send(req.originalUrl);
});


module.exports = {
  searchRouter
};
