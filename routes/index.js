var express = require('express');
var router = express.Router();
const TITLE = 'To Do project';
const handleuser = require('../models/users/handleUser');
const login = require('../models/users/login');
const session = require('express-session');

//Get home page
router.get('/', function(req, res, next){
  res.render('index', {
                title: TITLE, 
                subtitle: 'Front Page',
                authenticated: req.session && req.session.authenticated});
});

//registrering af brugere

router.get('/userform', function(req, res, next) {
  res.render('userform', {
    title: TITLE,
    subtitle: 'User form',
    authenticated: req.session && req.session.authenticated });
});

router.post('/userform', function(req, res, next) {
  handleuser.postUsers(req, res, next);
  res.redirect('/showuser');
});

// Login
router.get('/', function(req, res, next){
  res.render('login', {
      title: TITLE,
      subtitle: 'Login',
      authenticated: req.session && req.session.authenticated});
});

router.post('/', async function(req, res, next) {
await login.getLogin(req)
  .then( function (rc) {
    if (!rc)
      res.render('index', { title: 'Login', tf: "Login failed", returnCode: rc });// tf hvis bruger ikke findes
    else	
      res.render('index', { title: 'Login', tf: "Logged in successfully", 
      authenticated: req.session && req.session.authenticated, returnCode: rc });
      });
});

//Logud
router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.render('logout');
});

module.exports = router;
