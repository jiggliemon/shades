"use strict" 

var block = require('yayo/block')
var AttributeModel = require('../models/attribute')
var template = require('../tmpl/attribute')

var AppBlock = block.create({
   model: AttributeModel
  ,tag: "x-app-header"
  ,initialize: function (thing) {

  }
  
  ,shoot: function (times) {

  }

})

module.exports = AttributeBlock