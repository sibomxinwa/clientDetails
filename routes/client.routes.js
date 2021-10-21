const fs = require('fs');
const express = require("express");

const router = express.Router();

const clientController = require('../controllers/clients.controller')

router.get('/add', clientController.addClientPage);
router.get('/edit/:id', clientController.editClientPage);
router.get('/delete/:id', clientController.deleteClient);

router.post('/add', clientController.addClient);
router.post('/edit/:id', clientController.editClient);

module.exports = router;
