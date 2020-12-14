'use strict';

const PictureRestrict = {
   MIN: 1,
   MAX: 16,
};

const SumRestrict = {
    MIN: 1000,
    MAX: 100000,
}

const USER_ARGV_INDEX = 2;

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const DEFAULT_COMMAND = '--help';

const ExitCode = {
    SUCCESS: 0,
    EXIT: 1,
};

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

module.exports = {
    PictureRestrict,
    SumRestrict,
    USER_ARGV_INDEX,
    DEFAULT_COUNT,
    FILE_NAME,
    TITLES,
    DEFAULT_COMMAND,
    SENTENCES,
    CATEGORIES,
    OfferType,
    ExitCode,
};
