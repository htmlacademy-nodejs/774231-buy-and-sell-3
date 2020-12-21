'use strict';

const express = require(`express`);
const PORT = 8080;
const {loginRouter, registerRouter} = require(`./routes/auth`);
const {myRouter} = require(`./routes/my`);
const {searchRouter} = require(`./routes/search`);
const {offersRouter} = require(`./routes/offers`);

const app = express();

app.use(`/`, myRouter);
app.use(`/login`, loginRouter);
app.use(`/register`, registerRouter);
app.use(`/search`, searchRouter);
app.use(`/offers`, offersRouter);

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
