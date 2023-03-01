const sequelize = require("./db.js");
const Sequelize = require("sequelize");

const Menu = sequelize.define("menu", {
    title: Sequelize.STRING
});

module.exports = Menu;