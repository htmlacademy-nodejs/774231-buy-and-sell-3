'use strict';

const {Router} = require(`express`);
const {ServiceRequestAPI} = require(`../../lib/http-service`);

const myRouter = new Router();

// Все публикации рендер шаблона
myRouter.get(`/`, async (req, res) => {
  const publications = await ServiceRequestAPI.getListOffers();
  res.render(`main`, {publications});
});

// Личные публикации рендер шаблона
myRouter.get(`/my`, async (req, res) => {
  const publications = await ServiceRequestAPI.getListOffers();
  res.render(`my-tickets`, {publications});
});

// Личные комментарии к публикации рендер шаблона
myRouter.get(`/my/comments`, async (req, res) => {
  const publications = await ServiceRequestAPI.getListOffers();
  res.render(`comments`, {publications: publications.slice(0, 3)});
});

module.exports = {
  myRouter
};
