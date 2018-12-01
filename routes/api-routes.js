var express = require("express");

var router = express.Router();

var db = require("../models");
// get Burger from this

router.get("/index", function(req, res) {
    db.Burger.findAll({ attributes: ['id', 'burger_name', 'devoured'] }).then(function(dbBurger) {
        // res.json(dbBurger);
        burgerObj = { burger: [] };
        // dbBurger.foreach(Burger => {
        //         console.log(Burger.dataValues)
        //     })
        // It's an object
        // console.log(typeof(dbBurger));
        dbBurger.forEach(element => {
            console.log(element.dataValues);
            burgerObj.burger.push(element.dataValues);

        });
        console.log("Burger Obj!!" + JSON.stringify(burgerObj))
        res.render("index", burgerObj);

    });

})

router.post("/burgers", function(req, res) {

    db.Burger.create({
        burger_name: req.body.burger_name,
    }).then(function(dbBurger) {
        res.json(dbBurger);
    });
})

router.put("/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    db.Burger.update({
        devoured: req.body.devoured
    }, {
        where: {
            id: req.params.id
        }
    }).then(function(dbBurger) {
        res.json(dbBurger)
    })

})

module.exports = router;