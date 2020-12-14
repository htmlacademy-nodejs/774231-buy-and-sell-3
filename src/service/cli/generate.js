'use strict';

const fs = require('fs');
const { CATEGORIES,
        SENTENCES,
        TITLES,
        OfferType,
        SumRestrict,
        DEFAULT_COUNT,
        PictureRestrict,
        FILE_NAME,
        ExitCode, } = require('../constants');
const { getRandomInt,
        getPictureFileName,
        shuffle } = require(`../utils`);

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
    run(args) {
        const [count] = args;
        const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

        if (countOffer > 1000) {
          console.error('Не больше 1000 объявлений.');
          return process.exit(ExitCode.EXIT);
        }

        const content = JSON.stringify(generateOffers(countOffer));

        fs.writeFile(FILE_NAME, content, err => {
            if (err) {
                console.error(`Can't write data to file...`);
                process.exit(ExitCode.EXIT);
            }

            console.info(`Operation success. File created.`);
            process.exit(ExitCode.SUCCESS);
        })
    }
}
