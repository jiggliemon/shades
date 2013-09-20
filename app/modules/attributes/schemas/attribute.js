"use strict"
// This may well be moved to  the model.

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AttributeSchema = new Schema({
   type: String
  ,name: String
})

module.exports = AttributeSchema