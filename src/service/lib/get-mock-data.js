'use strict';

const fs = require(`fs`).promises;
const {MOCKS_FILE_NAME} = require(`../constants`);

let fileData = null;

const getMockData = async () => {
  if (fileData !== null) {
    return fileData;
  }

  try {
    const readFileData = await fs.readFile(MOCKS_FILE_NAME, `utf-8`);
    fileData = JSON.parse(readFileData);
  } catch (err) {
    console.error(`getMockData: `, err);
    Promise.reject(err);
  }

  return fileData;
};

module.exports = getMockData;
