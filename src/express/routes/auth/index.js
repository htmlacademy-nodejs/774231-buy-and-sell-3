'use strict';

const {Router} = require(`express`);

const loginRouter = new Router();
const registerRouter = new Router();

loginRouter.get(`/`, (req, res) => {
  res.render(`login`);
});

registerRouter.get(`/`, (req, res) => {
  res.render(`sign-up`);
});

module.exports = {
  loginRouter,
  registerRouter,
};
