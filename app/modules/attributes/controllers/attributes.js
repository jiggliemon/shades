"use scrict"

module.exports = {
   index : function (req, res, app) {
    var layout = app.getLayout()
    var attributesList = layout.refrence('attributes.list')
    

    res.end(layout.toHtml())
  }
  
  ,show: function (req, res, app) {
    // No blocks exist
    var layout = app.getLayout()
    // All blocks deined in the layout document exist

    var ref = layout.refrence('attribute.view')

    // ALl blocks are still flexable

    res.end(layout.toHtml())
    delete layout
  }
  
  ,update: function (req, res, app) {
  
  }
  
  ,create: function (req, res, app) {
    var layout = app.getLayout('attributes_create')
    res.send(layout.toHtml())
  }
  
  ,destroy: function (req, res, app) {
  
  }
}