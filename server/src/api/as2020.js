/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
const monk = require('monk');
// const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI);
db.then(() => {
  console.log('Connected correctly to server');
});
const REPO3 = db.get('REPO3');

const router = express.Router();

//get list of parties
router.get('/listofparties', async (req, res, next) => {
  try {
    const items = await REPO3.find(
      {},
      { partyName: true },
    );
    res.json(items);
  } catch (error) {
    next(error);
  }
});

module.exports = router;