var express = require("express");

var router = express.Router();

var db = require("../models");
// get Burger from this

router.get("/index", function(req, res) {
    db.Burger.findAll({}).then(function(dbBurger) {
        res.json(dbBurger);
    });

})

router.post("/burgers", function(req, res) {
    // burger.insertOne([req.body.burger_name],
    //     function(result) {
    //         res.json({ id: result.insertId });
    //     }
    // )

    db.Burger.create({
        burger_name: req.body.burger_name,
    }).then(function(dbBurger) {

        // We have access to the new todo as an argument inside of the callback function
        res.json(dbBurger);
    });
})

router.put("/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    // burger.updateOne({ devoured: req.body.devoured }, condition,
    //     function(result) {
    //         if (result.changedRows == 0) {
    //             return res.status(404).end();
    //         } else {
    //             res.status(200).end();
    //         }
    //     }
    // )
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

// route to index