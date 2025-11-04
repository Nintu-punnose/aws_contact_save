var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('view_product');
});


router.get('/add_product', function(req, res, next) {
  res.render('add_product');
});


module.exports = router;
