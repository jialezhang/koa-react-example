"use strict";
var Router = require("koa-router");

var countController = require("../src/controllers/count");
var indexController = require("../src/controllers/index");
var authController = require("../src/controllers/auth");
var applicantController = require ("../src/controllers/applicant");
var eventsController = require ("../src/controllers/events");

var secured = function *(next) {
  if (this.isAuthenticated()) {
    yield next;
  } else {
    this.status = 401;
  }
};

module.exports = function(app, passport) {
  // register functions
  var router = new Router();

  router.use(function *(next) {
    this.type = "json";
    yield next;
  });

  router.get("/", function *() {
    this.type = "html";
    yield indexController.index.apply(this);
  });

  router.get("/auth", authController.getCurrentUser);
  router.post("/auth", authController.signIn);

  router.all("/signout", authController.signOut);
  router.post("/signup", authController.createUser);

  router.get('/profile', authController.profile);

  /* router.get('/events/index', function *() {
     this.type = "html";
     yield eventsController.month.apply(this);
     }); */
  router.get('/events/index', eventsController.index );
  router.get('/events/month', secured, eventsController.month );
  /* invitationcode */

  router.get("/generatecode", applicantController.getCode);
  router.post("/generatecode", applicantController.createCode);

  // secured routes
  router.get("/value", secured, countController.getCount);
  router.get("/inc", secured, countController.increment);
  router.get("/dec", secured, countController.decrement);
  app.use(router.routes());
};
