'use strict';

const express = require(`express`);
const request = require(`supertest`);

const categories = require(`./categories`);
const {HttpCode} = require(`../../constants`);
const CategoryService = require(`../../data-service/category`);

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

const app = express();
app.use(express.json());
categories(app, new CategoryService(mockData));

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 3 categories`, () => expect(response.body.length).toBe(3));

  test(`Category names are "Животные", "Игры", "Книги"`,
      () => expect(response.body).toEqual(
          expect.arrayContaining([`Животные`, `Игры`, `Книги`])
      )
  );
});
