'use strict';

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const DEFAULT_PORT = 3000;
const MOCKS_FILE_NAME = `mocks.json`;
const MAX_ID_LENGTH = 6;
const API_PREFIX = `/api`;

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

const USER_ARGV_INDEX = 2;

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const DEFAULT_COMMAND = `--help`;

const ExitCode = {
  SUCCESS: 0,
  EXIT: 1,
};

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

module.exports = {
  PictureRestrict,
  SumRestrict,
  HttpCode,
  DEFAULT_PORT,
  MOCKS_FILE_NAME,
  USER_ARGV_INDEX,
  DEFAULT_COUNT,
  FILE_NAME,
  DEFAULT_COMMAND,
  API_PREFIX,
  MAX_ID_LENGTH,
  OfferType,
  Env,
  ExitCode,
};
