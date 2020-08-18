/* eslint-disable linebreak-style */
const express = require('express');

const emojis = require('./emojis');
const faqs = require('./faqs');
const as2020 = require('./as2020');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/faqs', faqs);
router.use('/as2020', as2020);

module.exports = router;
