const fs = require('fs');

exports.addClientPage = (req, res) => {
    res.render('add-client.ejs', {
        title: "Address book with client details",
        message: ''
    });
};

exports.addClient = (req, res) => {
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    let message = '';
    let name = req.body.name;
    let position = req.body.position;
    let company = req.body.company;
    let address = req.body.address;
    let phone = req.body.phone;
    let email = req.body.email;
    let uploadedFile = req.files.image;
    let image_name = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split('/')[1];
    image = email + '.' + fileExtension;

    let emailQuery = "SELECT * FROM `clients` WHERE email = '" + email + "'";

    db.query(emailQuery, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        if (result.length > 0) {
            message = 'Email address already exists';
            res.render('add-player.ejs', {
                message,
                title: "Address book with client details"
            });
        } else {
            // check the filetype before uploading it
            if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                // upload the file to the /public/assets/img directory
                uploadedFile.mv(`public/assets/img/${image}`, (err ) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    // send the player's details to the database
                   let query = "INSERT INTO `clients` (name, position, company, address, phone, email, image) VALUES ('" + name + "', '" + position + "', '" + company + "', '" + address + "', '" + phone + "', '" + email + "', '" + image + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });
                });
            } else {
                message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                res.render('add-client.ejs', {
                    message,
                    title: "Address book with client details"
                });
            }
        }
    });
}

exports.editClientPage = (req, res) => {
    let clientId = req.params.id;
    let query = "SELECT * FROM `clients` WHERE id = '" + clientId + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('edit-client.ejs', {
            title: "Edit  Client",
            player: result[0],
            message: ''
        });
    });
}

exports.editClient = (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    let position = req.body.position;
    let company = req.body.company;
    let address = req.body.address;
    let phone = req.body.phone;

    let query = "UPDATE `clients` SET `name` = '" + name + "', `position` = '" + position + "', `company` = '" + company + "', `address` = '" + address + "', `phone` = '" + phone + "'  WHERE `clients`.`id` = '" + id + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.deleteClient = (req, res) => {
    let clientId = req.params.id;
    let getImageQuery = 'SELECT image from `clients` WHERE id = "' + clientId + '"';
    let deleteUserQuery = 'DELETE FROM clients WHERE id = "' + clientId + '"';

    db.query(getImageQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        let image = result[0].image;

        fs.unlink(`public/assets/img/${image}`, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(deleteUserQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
        });
    });
}
