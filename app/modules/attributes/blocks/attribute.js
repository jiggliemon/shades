"use strict" 

var block = require('yayo/block')
var AttributeModel = require('../models/attribute')
var template = require('../tmpl/attribute')

var AttributeBlock = block.create({
  model: AttributeModel

  ,initialize: function (thing) {
    this.retrieveData()
  }
  
  ,shoot: function (times) {
    console.log("pew ".times(times))
  }

})

module.exports = AttributeBlock