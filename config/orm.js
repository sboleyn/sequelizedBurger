var connection = require("./connection.js");

// ?? is used for table and column names, it escapes them with backticks. ? is for ordinary values.

function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM ??";
        connection.query(queryString, [tableInput], function(err, result) {
            if (err) {
                throw err;

            } else {
                cb(result)
            }
        });
    },
    insertOne: function(tableInput, vals, cb) {

        var queryString = "INSERT INTO ??(burger_name) VALUES (?)";
        connection.query(queryString, [tableInput, vals], function(err, result) {
            if (err) { throw err } else {
                cb(result)
            }
        });
    },
    updateOne: function(tableInput, objColVals, condition, cb) {
        var queryString = "UPDATE " + tableInput;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
        // console.log(objToSql(objColVals));
        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            } else {
                console.log(queryString);
                cb(result)
            }
        });
    }

}

module.exports = orm;