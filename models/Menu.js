const db = require("../db.js");
const { Sequelize, Model } = require('sequelize');

let Menu = db.define("menus", {
    title: Sequelize.STRING
});

module.exports = Menu;