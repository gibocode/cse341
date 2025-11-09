const router = require('express').Router();

router.use('/', require('./swagger.js'));

router.get('/', (req, res) => {
    // #swagger.tags = ['Test']
    res.send('Hello World!');
});

router.use('/contacts', require('./contacts'));

module.exports = router;
