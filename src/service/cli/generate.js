'use strict';

const fs = require(`fs`);
const util = require(`util`);
const chalk = require(`chalk`);

const writeFilePromise = util.promisify(fs.writeFile);

const {CATEGORIES,
  SENTENCES,
  TITLES,
  OfferType,
  SumRestrict,
  DEFAULT_COUNT,
  PictureRestrict,
  FILE_NAME,
  ExitCode} = require(`../constants`);
const {getRandomInt,
  getPictureFileName,
  shuffle} = require(`../utils`);

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > 1000) {
      console.log(chalk.red(`Не больше 1000 объявлений.`));
      process.exit(ExitCode.EXIT);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    try {
      await writeFilePromise(FILE_NAME, content);

      console.log(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.SUCCESS);
    } catch (err) {
      console.log(chalk.red(`Can't write data to file...`, err.message));
      process.exit(ExitCode.EXIT);
    }
  }
};
