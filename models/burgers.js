// Dependencies
// =============================================================

// Sequelize(capital) references the standard library
var Sequelize = require("sequelize");
// sequelize(lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Book" model that matches up with DB
// var Burger = sequelize.define("burger", {
//     burger_name: Sequelize.STRING,
//     devoured: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }

// });

// Syncs with DB
// Burger.sync();

// Makes the Book Model available for other files (will also create a table)
// module.exports = Burger;

module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        burger_name: Sequelize.STRING,
        devoured: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }

    });
    return Burger;
};