const router = require('express').Router();
const {
  badUrl,
} = require('../controllers/main');

router.use('/', badUrl);

module.exports.mainRouter = router;
