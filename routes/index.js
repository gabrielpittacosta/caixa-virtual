const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(201);
    res.json({ message:'Caixa Virtual' });
});

router.use('/caixa', require('./caixa'));

module.exports = router;