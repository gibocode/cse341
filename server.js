const express = require('express');
const bodyParser = require('body-parser');
const database = require('./data/database');
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));

// Initialize database and start server
database.initialize((err) => {
    if (err) {
        console.error(err);
    }
    else {
        const port = process.env.APP_PORT || 3000;
        app.listen(port, () => {
            console.log(`Database connected and server is running on port ${port}`);
        });
    }
});
