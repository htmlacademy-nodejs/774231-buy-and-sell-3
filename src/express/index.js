'use strict';

const express = require(`express`);
const path = require(`path`);
const {loginRouter, registerRouter} = require(`./routes/auth`);
const {myRouter} = require(`./routes/my`);
const {searchRouter} = require(`./routes/search`);
const {offersRouter} = require(`./routes/offers`);
const notFoundMiddleware = require(`./middleware/not-found-middleware`);

const app = express();

const PUBLIC_DIR = `public`;
const UPLOAD_DIR = `upload`;
const PORT = 8080;

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(`/`, myRouter);
app.use(`/login`, loginRouter);
app.use(`/register`, registerRouter);
app.use(`/search`, searchRouter);
app.use(`/offers`, offersRouter);

app.use(notFoundMiddleware);

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
