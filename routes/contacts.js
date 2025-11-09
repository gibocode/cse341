const router = require('express').Router();
const contactsController = require('../controllers/contacts');

// Get all contacts
router.get('/', contactsController.getAll);

// Get a single contact by ID
router.get('/:id', contactsController.getSingle);

// Create a new contact
router.post('/', contactsController.createContact);

// Update an existing contact by ID
router.put('/:id', contactsController.updateContact);

// Delete a contact by ID
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
