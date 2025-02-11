const app = require("express")();
const consign = require("consign");
const db = require("./config/db");

app.db = db;

consign()
  .then("./config/middlewares.js")
  .then("./api/validator.js")
  .then("./api")
  .then("./config/routes.js")
  .into(app);

const _port = 3000;

app.listen(_port, () => {
  console.log(`Backend executando na porta ${_port}`);
});
