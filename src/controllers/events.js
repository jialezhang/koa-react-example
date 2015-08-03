"use strict";
var passport = require("koa-passport");
var fs = require("fs");

exports.index = function *() {
  this.status = 200;
}

exports.month = function *() {
  this.body = { user: 'jiale' };
  this.status = 200;
};
