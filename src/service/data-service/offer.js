'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../constants`);

class OfferService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll() {
    return this._offers;
  }

  findOne(id) {
    return this._offers.find((item) => item.id === id);
  }

  findOneComment(offer) {
    return this._offers.find((iterOffer) => iterOffer.id === offer.id).comments;
  }

  deleteComment(offer, id) {
    const editOffer = offer;
    editOffer.comments = editOffer.comments.filter((comment) => comment.id !== id);

    this._offers = this._offers.map((item) => {
      if (item.id === editOffer.id) {
        return editOffer;
      }

      return item;
    });

    return editOffer;
  }

  createComment(offer, comment) {
    const newComment = {
      id: nanoid(MAX_ID_LENGTH),
      ...comment,
    };

    this._offers = this._offers.map((item) => {
      if (item.id === offer.id) {
        return {
          ...item,
          comments: [...item.comments, newComment],
        };
      }

      return item;
    });

    return newComment;
  }

  delete(id) {
    const offer = this._offers.find((item) => item.id === id);

    if (!offer) {
      return null;
    }

    this._offers = this._offers.filter((item) => item.id !== id);
    return offer;
  }

  update(id, offer) {
    const oldOffer = this._offers
      .find((item) => item.id === id);

    return Object.assign(oldOffer, offer);
  }


  createOffer(offer) {
    const newOffer = {
      id: nanoid(MAX_ID_LENGTH),
      comments: [],
      ...offer,
    };

    this._offers.push(newOffer);

    return newOffer;
  }
}

module.exports = OfferService;
