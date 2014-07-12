var mongoose = require('mongoose');
var phone = require('./call');
var config = require('config');


module.exports = function(app, passport) {
  app.get('/', function(req,res){
    res.send('hello world');
  });
  
  app.post('/call', function(req, res) {
   phone.callSrcNum(req, res);
  });

  app.post('/xml-response', function(req, res) {
   phone.callDstNum(req, res);
  });

  app.post('/login', passport.authenticate('google', {
    failureRedirect: '/login',
    failureFlash: true
  }), function(req, res) {
    res.redirect('/');
  });

  app.get('/auth/google', passport.authenticate('google',{ scope: ['https://www.googleapis.com/auth/userinfo.profile',
                                            'https://www.googleapis.com/auth/userinfo.email']}));
  
  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect:'/',failureRedirect: '/login'}));
};
