const Sequelize = require("sequelize");

const database = new Sequelize(
  "todo_app-seq",
  "matthewvolny",
  "Ronweasley1@@@",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

module.exports = database;
