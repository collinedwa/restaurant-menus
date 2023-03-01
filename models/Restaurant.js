const db = require("../db.js");
const { Sequelize, Model } = require("sequelize");

let Restaurant = db.define("restaurants", {
    name: Sequelize.STRING,
    location: Sequelize.STRING,
    cuisine: Sequelize.STRING,
    rating: Sequelize.NUMBER
});

module.exports = Restaurant;