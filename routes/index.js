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
                authenticated: req.session && req.session.authenticated,
                admin: req.session.role == "admin" ? true : false //Tjekker efter admin role. Gentages på alle sider.
              });
});
//godkendelse af brugere
router.get('/approveuser', async function(req, res, next){
  let users = await handleuser.getUsers({}, {sort: {title: 1}});

  res.render('approveuser', {
    title: TITLE,
    subtitle: 'Display user for approvement',
    authenticated: req.session && req.session.authenticated,
    users,
    admin: req.session.role == "admin" ? true : false});
});

router.post('/approveuser', async function(req, res, next) {
  handleuser.postApproveUsers(req, res, next);
  res.redirect('/approveuser');
});

// verify user
router.get('/verify/:email', async function(req, res, next){
  handleuser.verifyUser(req); //Email bruges som parameter til at slette bruger
  res.redirect('/');
});

// verify admin
router.get('/admin/:email', async function(req, res, next){
  handleuser.adminUser(req); //Email bruges som parameter til at slette bruger. Params = URL
  res.redirect('/');
});

// slet bruger
router.get('/delete/:email', async function(req, res, next){
  
  handleuser.deleteUser(req); //Email bruges som parameter til at slette bruger
  res.redirect('/');
});

//registrering af brugere

router.get('/userform', async function(req, res, next) {
  res.render('userform', {
    title: TITLE,
    subtitle: 'User form',
    authenticated: req.session && req.session.authenticated,
    admin: req.session.role == "admin" ? true : false});
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
      authenticated: req.session && req.session.authenticated,
      admin: req.session.role == "admin" ? true : false});
});

router.post('/', async function(req, res, next) {
await login.getLogin(req)
  .then( function (rc) {
    if (!rc)
      res.render('index', { title: 'Login', tf: "Login failed", returnCode: rc });// tf hvis bruger ikke findes
    else  
      res.render('index', { title: 'Login', tf: "Logged in successfully", 
      authenticated: req.session && req.session.authenticated, returnCode: rc, 
      admin: req.session.role == "admin" ? true : false });
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
    tasks,
    admin: req.session.role == "admin" ? true : false});
});

router.post('/showtask', async function(req, res, next){
  let tasks = await handleTasks.getTask();
});

router.get('/taskform', async function(req, res, next){
  res.render('taskform', {
    title: TITLE, 
    subtitle: 'Tasks Entry Form',
    authenticated: req.session && req.session.authenticated,
    admin: req.session.role == "admin" ? true : false,
    userid: req.session._id
    });
});

router.post('/taskform', async function(req, res, next){
  await handleTasks.postTask(req, res, next);
  res.redirect('/showtask');
});

module.exports = router;