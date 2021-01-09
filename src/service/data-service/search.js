'use strict';

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  getDataByQuery(query) {
    if (query === ``) {
      return [];
    }
    return this._offers.filter((offer) => offer.title.toUpperCase().includes(query.toUpperCase()));
  }
}

module.exports = SearchService;
