const Restaurant = require('./Restaurant')
const Menu = require('./Menu')
const Item = require('./Item')

Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);

Menu.belongsToMany(Item, {through: "menus_items"});
Item.belongsToMany(Menu, {through: "menus_items"});

module.exports = { Restaurant, Menu, Item };
