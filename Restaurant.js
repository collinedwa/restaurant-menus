const sequelize = require("./db.js");
const Sequelize = require("sequelize");

const Restaurant = sequelize.define("restaurant", {
    name: Sequelize.STRING,
    location: Sequelize.STRING,
    cuisine: Sequelize.STRING
});

module.exports = Restaurant;