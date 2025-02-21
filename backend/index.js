const app = require("express")();
const consign = require("consign");
const db = require("./config/db");
const mongoose = require("mongoose");

require("./config/mongodb");

app.db = db;
app.mongoose = mongoose;

consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then("./api/validator.js")
  .then("./api")
  .then("./schedule/statsSchedule.js")
  .then("./config/routes.js")
  .into(app);

const _port = 3000;

app.listen(_port, () => {
  console.log(`Backend executando na porta ${_port}`);
});
