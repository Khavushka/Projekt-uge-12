var express = require('express');
var router = express.Router();
const login = require('..//login');

//Get home page
router.get('/', function(req, res, next){
  res.render('index', {
                title: TITLE, 
                subtitle: 'Front Page',
                authenticated: req.session && req.session.authenticated});
});



module.exports = router;
