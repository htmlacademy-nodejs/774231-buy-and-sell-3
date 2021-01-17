'use strict';

const axios = require(`axios`);
const API_PORT = process.env.API_PORT || 3000;
const API_PREFIX = `api`;
const BASE_URL = `http://localhost:${API_PORT}/${API_PREFIX}`;

class HttpApi {
  constructor(baseURL, timeout = 600000) {
    this._http = axios.create({
      baseURL,
      timeout,
    });
  }

  async _request(url, options = {}) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }

  get(url, options = {}) {
    return this._request(url, {method: `GET`, ...options});
  }

  post(url, options = {}) {
    return this._request(url, {method: `POST`, ...options});
  }

  put(url, options = {}) {
    return this._request(url, {method: `PUT`, ...options});
  }

  delete(url, options = {}) {
    return this._request(url, {method: `DELETE`, ...options});
  }
}

class ServiceRequest extends HttpApi {
  constructor(baseURL, timeout = 600000) {
    super(baseURL, timeout);
  }

  getListOffers() {
    return this.get(`/offers`);
  }

  getOneOffer(id) {
    return this.get(`/offers/${id}`);
  }

  search(query = ``) {
    return this.get(`/search`, {params: {query}});
  }

  getCategories() {
    return this.get(`/categories`);
  }

  createOffer(data) {
    return this.post(`/offers`, {data});
  }

  getComment(offerId) {
    return this.get(`/offers/${offerId}/comments`);
  }
}

module.exports = {
  ServiceRequestAPI: new ServiceRequest(BASE_URL),
  API: ServiceRequest,
};
