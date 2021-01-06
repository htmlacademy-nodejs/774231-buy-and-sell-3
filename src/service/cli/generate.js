'use strict';

const fs = require(`fs`);
const util = require(`util`);
const chalk = require(`chalk`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const writeFilePromise = util.promisify(fs.writeFile);

const {
  OfferType,
  SumRestrict,
  DEFAULT_COUNT,
  PictureRestrict,
  FILE_NAME,
  MAX_ID_LENGTH,
  ExitCode} = require(`../constants`);
const {getRandomInt,
  getPictureFileName,
  getData,
  shuffle} = require(`../utils`);


const generateOffers = async (count) => {
  const TITLES = await getData(path.join(`data`, `titles.txt`));
  const SENTENCES = await getData(path.join(`data`, `sentences.txt`));
  const CATEGORIES = await getData(path.join(`data`, `categories.txt`));
  const COMMENTS = await getData(path.join(`data`, `comments.txt`));

  return Array(count).fill({}).map(() => ({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    id: nanoid(MAX_ID_LENGTH),
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    comments: shuffle(COMMENTS).slice(getRandomInt(0, 2), getRandomInt(3, 10)).map((text) => {
      return {
        text,
        id: nanoid(MAX_ID_LENGTH),
      };
    }),
  }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > 1000) {
      console.log(chalk.red(`Не больше 1000 объявлений.`));
      process.exit(ExitCode.EXIT);
    }

    try {
      const content = JSON.stringify(await generateOffers(countOffer));

      await writeFilePromise(FILE_NAME, content);

      console.log(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.SUCCESS);
    } catch (err) {
      console.log(chalk.red(`Can't write data to file...`, err.message));
      process.exit(ExitCode.EXIT);
    }
  }
};
