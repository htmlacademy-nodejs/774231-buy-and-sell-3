'use strict';

class CategoryService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll() {
    const categories = this._offers.reduce((acc, offer) => {
      return {...acc, ...offer.category.reduce((acc1, category) => ({...acc1, [category]: category}), {})};
    }, {});
    return Object.keys(categories);
  }
}

module.exports = CategoryService;
