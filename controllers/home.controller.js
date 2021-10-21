const fs = require('fs');

exports.getHomePage = (req, res) => {
    let query = "SELECT * FROM `clients` ORDER BY id ASC"; // query database to get all the clients

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }

        res.render('index.ejs', {
            title: "Welcome to address book with client details",
            players: result
        });
    });
};
