const express = require("express"),
  router = express.Router(),
  //create instance of sequelize library
  { Sequelize, DataTypes, Op } = require("sequelize"),
  database = require("../../config/database.js"),
  models = require("../../models/index.js");

//check the connection with the database
database
  .authenticate()
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log("error: " + error);
  });

router.get("/", async (req, res) => {
  //selects all rows from database
  try {
    await database.sync({ force: true });
    const tasksToDo = await models.Task.findAll({
      where: { completed: "false" },
    });
    const completedTasks = await models.Task.findAll({
      where: { completed: "true" },
    });

    res.render("home", {
      tasksToDo: tasksToDo,
      completedTasks: completedTasks,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    await database.sync({ force: true });
    //adds new task to the database
    await models.Task.create({ task: req.body.task });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete", async (req, res) => {
  //selects all rows from database
  try {
    await database.sync({ force: true });
    await models.Task.destroy({
      where: { id: req.body.id },
    });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.post("/update", async (req, res) => {
  //selects all rows from database
  try {
    await database.sync({ force: true });
    await models.Task.update(
      { completed: "true" },
      { where: { id: req.body.id } }
    );
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.post("/return", async (req, res) => {
  //selects all rows from database
  try {
    await database.sync({ force: true });
    await models.Task.update(
      { completed: "false" },
      { where: { id: req.body.id } }
    );
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
