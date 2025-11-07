const database = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all contacts
const getAll = async(req, res) => {
    const result = await database.getDatabase().db().collection('contacts').find().toArray();
    res.json(result);
};

// Get a single contact by ID
const getSingle = async(req, res) => {
    try {
        const result = await database.getDatabase().db().collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.json(null);
    }
};

module.exports = { getAll, getSingle };
