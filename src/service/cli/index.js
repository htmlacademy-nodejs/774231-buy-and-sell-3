'use strict';

const generate = require(`./generate`);
const help = require(`./help`);
const version = require(`./version`);
const server = require(`./server`);

const Cli = {
  [generate.name]: generate,
  [version.name]: version,
  [help.name]: help,
  [server.name]: server,
};

module.exports = {
  Cli,
};
