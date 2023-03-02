const db = require("../db.js");
const { Sequelize, Model } = require("sequelize");

let Item = db.define("items", {
    name: Sequelize.STRING,
    image: Sequelize.STRING,
    price: Sequelize.NUMBER,
    vegetarian: Sequelize.BOOLEAN
});

module.exports = Item;