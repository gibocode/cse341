const database = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all contacts
const getAll = async (req, res) => {
    // #swagger.tags = ['Contacts']
    const result = await database.getDatabase().db().collection('contacts').find().toArray();
    res.json(result);
};

// Get a single contact by ID
const getSingle = async (req, res) => {
    // #swagger.tags = ['Contacts']
    try {
        const result = await database.getDatabase().db().collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(null);
    }
};

// Create a new contact
const createContact = async (req, res) => {
    // #swagger.tags = ['Contacts']
    const data = req.body;
    console.log(data);
    const contact = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        favoriteColor: data.favoriteColor,
        birthday: data.birthday
    };
    const result = await database.getDatabase().db().collection('contacts').insertOne(contact);
    if (result.insertedId) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Could not create contact.');
    }
};

// Update an existing contact by ID
const updateContact = async (req, res) => {
    // #swagger.tags = ['Contacts']
    const contactId = new ObjectId(req.params.id);
    const data = req.body;
    const contact = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        favoriteColor: data.favoriteColor,
        birthday: data.birthday
    };
    // Replace the entire contact document instead of updating specific fields
    const result = await database.getDatabase().db().collection('contacts').replaceOne({ _id: contactId }, contact);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Could not update contact.');
    }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
    // #swagger.tags = ['Contacts']
    const contactId = new ObjectId(req.params.id);
    const result = await database.getDatabase().db().collection('contacts').deleteOne({ _id: contactId });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Could not delete contact.');
    }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
