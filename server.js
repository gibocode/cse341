const express = require('express');
const contacts = require('./routes/contacts');
const app = express();

app.use('/', require('./routes'));

// Initialize database and start server
contacts.initialize((err) => {
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
