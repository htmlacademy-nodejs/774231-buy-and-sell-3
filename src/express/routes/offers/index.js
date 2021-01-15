'use strict';

const {Router} = require(`express`);
const {ServiceRequestAPI} = require(`../../http-service`);
const {storage} = require(`../../lib/upload-storage`);
const multer = require(`multer`);

const offersRouter = new Router();
const upload = multer({storage});

// Публикации к определенной категории рендер шаблона
offersRouter.get(`/category/:id`, (req, res) => {
  res.render(`category`);
});

// Создание публикации рендер шаблона
offersRouter.get(`/add`, (req, res) => {
  res.render(`new-ticket`, {formData: {}});
});
// Создание публикации обработчик запроса
offersRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;

  const offerData = {
    picture: file ? file.filename : ``,
    sum: body.price,
    type: body.action,
    description: body.comment,
    title: body[`ticket-name`],
    category: body.category || [],
  };
  try {
    await ServiceRequestAPI.createOffer(offerData);
    res.redirect(`/my`);
  } catch (err) {
    console.log(`err`, err);
    res.redirect(`/offers/add`);
  }
});

// Редактирование публикации рендер шаблона
offersRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [publication, categories] = await Promise.all([
    ServiceRequestAPI.getOneOffer(id),
    ServiceRequestAPI.getCategories()
  ]);

  res.render(`ticket-edit`, {publication, categories});
});

// Отдельная публикация рендер шаблона
offersRouter.get(`/:id`, (req, res) => {
  res.render(`ticket`);
});

module.exports = {
  offersRouter
};
