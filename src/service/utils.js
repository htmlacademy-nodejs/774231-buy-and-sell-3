'use strict';

const util = require(`util`);
const fs = require(`fs`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const readFilePromise = util.promisify((path, dataFormatter = (data) => data, cb) => {
  fs.readFile(path, `utf8`, (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(null, dataFormatter(data));
    }
  });
});

const dataFormatter = (data) => {
  return data.split(`\n`);
};

const getData = async (path) => {
  const data = await readFilePromise(path, dataFormatter);
  return data;
};

const getPictureFileName = (number) => {
  return `item${number < 10 ? `0` + number : number}.jpg`;
};

module.exports = {
  getRandomInt,
  shuffle,
  getPictureFileName,
  getData,
  readFilePromise,
};
