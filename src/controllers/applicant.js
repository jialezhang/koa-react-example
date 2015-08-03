"use strict";
var mongoose = require("mongoose");
var Applicant = mongoose.model("Applicant");
var randomstring = require("randomstring");

exports.getApplicants = function *() {
  var count = yield Applicant.find().exec();
  if (!count) {
    this.body = { message: '没有申请人'};
  } else {
    this.body = { applicant: applicant.email }
  }
};

exports.addApplicant = function *() {
  var count = yield Count.findOne().exec();
  if (!count) {
    count = new Count();
  }
  ++count.value;

  yield count.save();
  this.body = { count: count.value };
};

exports.createCode = function *() {
  let code = randomstring.generate(6);
  this.body = { code: code };
}

exports.getCode = function *() {
  console.log(this.request.body);
}
