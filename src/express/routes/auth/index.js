'use strict';

const {Router} = require(`express`);

const loginRouter = new Router();
const registerRouter = new Router();

loginRouter.get(`/`, (req, res) => {
  res.send(req.originalUrl);
});

registerRouter.get(`/`, (req, res) => {
  res.send(req.originalUrl);
});

module.exports = {
  loginRouter,
  registerRouter,
};
