var express = require('express');
var router = express.Router();
const TITLE = 'To Do project';
const handleuser = require('../models/users/handleUser');
const handleTasks = require('../models/tasks/handleTask');
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

router.get('/userform', async function(req, res, next) {
  res.render('userform', {
    title: TITLE,
    subtitle: 'User form',
    authenticated: req.session && req.session.authenticated});
});

router.post('/userform', async function(req, res, next) {
  handleuser.postUsers(req, res, next);
  res.redirect('/');
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

//Tasks
router.get('/showtask', async function(req, res, next){
  let tasks = await handleTasks.getTask({}, {sort: {title: 1}});

  res.render('showtask', {
    title: TITLE,
    subtitle: 'Display Tasks',
    authenticated: req.session && req.session.authenticated,
    tasks});
});

router.post('/showtask', async function(req, res, next){
  let tasks = await handleTasks.getTask();
});

router.get('/taskform', async function(req, res, next){
  res.render('taskform', {
    title: TITLE, 
    subtitle: 'Tasks Entry Form',
    authenticated: req.session && req.session.authenticated});
});

router.post('/taskform', async function(req, res, next){
  await handleTasks.postTask(req, res, next);
  res.redirect('/showtask');
});

module.exports = router;