'use strict';

const generate = require(`./generate`);
const help = require(`./help`);
const version = require(`./version`);

const Cli = {
  [generate.name]: generate,
  [version.name]: version,
  [help.name]: help,
};

module.exports = {
  Cli,
};
