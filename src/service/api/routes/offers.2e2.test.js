'use strict';

const express = require(`express`);
const request = require(`supertest`);

const offers = require(`./offers`);
const {HttpCode} = require(`../../constants`);
const OfferService = require(`../../data-service/offer`);

const mockData =
[
  {
    "category": [`Животные`],
    "id": `NCWeJ8`,
    "description": `При покупке с меня бесплатная доставка в черте города. Даю недельную гарантию. Если найдёте дешевле — сброшу цену. Это настоящая находка для коллекционера!`,
    "picture": `item10.jpg`,
    "title": `Продам книги Стивена Кинга`,
    "type": `OFFER`,
    "sum": 52101,
    "comments": [
      {"text": `Почему в таком ужасном состоянии?`, "id": `ES_rKL`},
      {"text": `Вы что?! В магазине дешевле.`, "id": `e0t9ZA`},
      {"text": `Неплохо, но дорого.`, "id": `lQM2M4`},
      {"text": `Оплата наличными или перевод на карту?`, "id": `rBuxxU`},
      {"text": `Совсем немного...`, "id": `h3k_WX`},
      {"text": `С чем связана продажа? Почему так дешёво?`, "id": `UdqrHz`},
      {"text": `А где блок питания?`, "id": `sl4rEi`},
      {"text": `Продаю в связи с переездом. Отрываю от сердца.`, "id": `r3KaUO`}
    ]
  },
  {
    "category": [`Игры`],
    "id": `0oHven`,
    "description": `Таких предложений больше нет! Это настоящая находка для коллекционера! Пользовались бережно и только по большим праздникам. Бонусом отдам все аксессуары.`,
    "picture": `item02.jpg`,
    "title": `Продам отличную подборку фильмов на VHS`,
    "type": `OFFER`,
    "sum": 33116,
    "comments": [
      {"text": `Вы что?! В магазине дешевле.`, "id": `M0oy63`},
      {"text": `Совсем немного...`, "id": `v4C9P_`},
      {"text": `С чем связана продажа? Почему так дешёво?`, "id": `msPX40`},
      {"text": `А сколько игр в комплекте?`, "id": `IewMNH`},
      {"text": `А где блок питания?`, "id": `ZCIyi1`},
      {"text": `Продаю в связи с переездом. Отрываю от сердца.`, "id": `DSLQk3`},
      {"text": `Неплохо, но дорого.`, "id": `8hLEKt`},
      {"text": `Оплата наличными или перевод на карту?`, "id": `ZSL_zp`},
      {"text": `Почему в таком ужасном состоянии?`, "id": `D_IDMA`}
    ]
  },
  {
    "category": [`Книги`],
    "id": `-yDkbv`,
    "description": `Таких предложений больше нет! Бонусом отдам все аксессуары. Некоторый текст Товар в отличном состоянии.`,
    "picture": `item16.jpg`,
    "title": `Продам книги Стивена Кинга`,
    "type": `SALE`,
    "sum": 59097,
    "comments": [
      {"text": `Оплата наличными или перевод на карту?`, "id": `6lZ6pr`},
      {"text": `Неплохо, но дорого.`, "id": `xuPxeZ`},
      {"text": `Продаю в связи с переездом. Отрываю от сердца.`, "id": `4WYd9i`},
      {"text": `А сколько игр в комплекте?`, "id": `m1uhHm`},
      {"text": `Совсем немного...`, "id": `NiNL15`},
      {"text": `Почему в таком ужасном состоянии?`, "id": `nIajCt`}
    ]
  }
];

const createApi = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  offers(app, new OfferService(cloneData));
  return app;
};


describe(`API returns a list of all offers`, () => {
  const app = createApi();
  let response;

  beforeAll(async () => {
    response = await request(app)
    .get(`/offers`);
  });


  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 offers`, () => expect(response.body.length).toBe(3));

  test(`First offer's id equals "bUAlOA"`, () => expect(response.body[0].id).toBe(`NCWeJ8`));
});

describe(`API returns an offer with given id`, () => {

  const app = createApi();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers/NCWeJ8`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Куплю антиквариат"`, () => expect(response.body.title).toBe(`Продам книги Стивена Кинга`));
});

describe(`API creates an offer if data is valid`, () => {

  const newOffer = {
    category: [`Котики`],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };

  const app = createApi();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers`)
      .send(newOffer);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns offer created`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offers count is changed`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});

describe(`API refuses to create an offer if data is invalid`, () => {

  const newOffer = {
    category: [`Котики`],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  const app = createApi();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newOffer)) {
      const badOffer = {...newOffer};
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent offer`, () => {

  const newOffer = {
    category: [`Животные`],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  const app = createApi();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/offers/NCWeJ8`)
      .send(newOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed offer`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offer is really changed`, () => request(app)
    .get(`/offers/NCWeJ8`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );
});

test(`API returns status code 404 when trying to change non-existent offer`, () => {

  const app = createApi();

  const validOffer = {
    category: [`Это`],
    title: `валидный`,
    description: `объект`,
    picture: `объявления`,
    type: `однако`,
    sum: 404
  };

  return request(app)
    .put(`/offers/NOEXST`)
    .send(validOffer)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an offer with invalid data`, () => {

  const app = createApi();

  const invalidOffer = {
    category: [`Это`],
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`
  };

  return request(app)
    .put(`/offers/NCWeJ8`)
    .send(invalidOffer)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an offer`, () => {

  const app = createApi();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/offers/NCWeJ8`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted offer`, () => expect(response.body.id).toBe(`NCWeJ8`));

});

test(`API refuses to delete non-existent offer`, () => {

  const app = createApi();

  return request(app)
    .delete(`/offers/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, () => {

  const app = createApi();

  return request(app)
    .post(`/offers/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createApi();

  return request(app)
    .delete(`/offers/GxdTgz/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

test(`API return to delete comment`, () => {

  const app = createApi();

  return request(app)
    .delete(`/offers/-yDkbv/comments/4WYd9i`)
    .expect((res) => expect(res.body.deletedComment.id).toBe(`4WYd9i`));

});
