'use strict';

const fs = require(`fs`).promises;

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

const readFilePromise = async (path, dataFormatter = (data) => data) => {
  return dataFormatter(await fs.readFile(path, `utf8`));
};

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
