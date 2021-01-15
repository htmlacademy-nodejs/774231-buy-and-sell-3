'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const offerValidator = require(`../../middlewares/offer-validator`);
const findOneOfferMiddleware = require(`../../middlewares/find-one-offer`);
const commentValidator = require(`../../middlewares/comment-validator`);


const offersRouter = new Router();

module.exports = (appRouter, service) => {
  appRouter.use(`/offers`, offersRouter);

  // список всех записей

  offersRouter.get(`/`, (_, res) => {
    const offers = service.findAll();

    return res.status(HttpCode.OK).json(offers);
  });

  // получение отдельной записи

  offersRouter.get(`/:offerId`, (req, res) => {
    const {offerId} = req.params;

    const findOffer = service.findOne(offerId);

    if (!findOffer) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK).json(findOffer);
  });

  // создание

  offersRouter.post(`/`, offerValidator, (req, res) => {
    const offer = service.createOffer(req.body);

    return res.status(HttpCode.CREATED)
      .json(offer);

  });

  // редактирование

  offersRouter.put(`/:offerId`, offerValidator, (req, res) => {
    const {offerId} = req.params;

    const editOffer = service.update(offerId, req.body);

    if (!editOffer) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK).json(editOffer);
  });

  // удаление

  offersRouter.delete(`/:offerId`, (req, res) => {
    const {offerId} = req.params;

    const deletedOffer = service.delete(offerId);

    if (!deletedOffer) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK).json(deletedOffer);
  });

  // comments

  offersRouter.get(`/:offerId/comments`, findOneOfferMiddleware(service), (_, res) => {
    const {offer} = res.locals;

    const offerComments = service.findOneComment(offer);

    return res.status(HttpCode.OK).json(offerComments);
  });

  offersRouter.post(`/:offerId/comments`, [findOneOfferMiddleware(service), commentValidator], (req, res) => {
    const {offer} = res.locals;
    const newComment = service.createComment(offer, req.body);

    res.status(HttpCode.OK).json(newComment);
  });

  offersRouter.delete(`/:offerId/comments/:commentId`, findOneOfferMiddleware(service), (req, res) => {
    const {offer} = res.locals;
    const {commentId} = req.params;

    const deletedComment = service.deleteComment(offer, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with comment ${commentId}`);
    }

    return res.status(HttpCode.OK).json({message: `Комментарий успешно удален!`, deletedComment});
  });
};
