const router = require('express').Router();
const contactsController = require('../controllers/contacts');

// Get all contacts
router.get('/', contactsController.getAll);

// Get a single contact by ID
router.get('/:id', contactsController.getSingle);

module.exports = router;
