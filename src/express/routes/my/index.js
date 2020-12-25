'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/`, (req, res) => {
  res.render(`main`);
});

myRouter.get(`/my`, (req, res) => {
  res.render(`my-tickets`);
});

myRouter.get(`/my/comments`, (req, res) => {
  res.render(`comments`);
});

module.exports = {
  myRouter
};
