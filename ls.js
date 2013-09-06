var fs = require('fs')
// Error Handling?
// lol.

var legalImgExtensions = ['png','tif','jpg','jpeg','svg','gif']
var statTypes = ['File','Directory','BlockDevice','CharacterDevice','SymbolicLink','FIFO','Socket']
var options = {sort: null,filter: null}

function extend (parent) {
  var args = Array.prototype.slice.call(arguments,1)
  args.forEach(function (obj) {
    for ( var k in obj ) {
      if ( obj.hasOwnProperty(k) ) {
        parent[k] = obj[k]
      }
    }
  })
  return parent
}

function ls () {
  var paths = Array.prototype.slice.call(arguments,0).map(function (path) {
    var stats = fs.lstatSync( path )
    var ret = {}

    var list = ls['read'+ is( stats )]( path ).map(function (item) {
      var stats = fs.lstatSync(item)
      if ( stats.isFile() ) {
        return item
      } else if ( stats.isDirectory() ) {
        return ls( item )
      }
    })

    list = list.sort(options.sort)
    
    if ( options.filter ) {
      list = list.filter(options.filter)
    }
    ret[path] = list

    return ret
  })  
  paths.unshift({})
  return extend.apply(null, paths)
}

ls.readDirectory = function ( path ) {
  return fs.readdirSync( path ).map( prependPath(path) )
}

ls.readSymbolicLink = function ( path ) {
}

function prependPath ( path ) { 
  path = path.replace(/\/?$/, '/')
  return function ( content ) {
    return [path,content].join('')
  } 
}

function is ( stats ) {
  function checkStat ( thing ) {
    return stats['is'+thing]()
  }
  return statTypes.filter(checkStat)[0]
}

function getExtension(filename) {
    var i = (typeof filename == 'string') ? filename.split('.'):[]
    return (i.length > 1)?i.pop():''
}

function filterImageExtensions (item) {
  return (legalImgExtensions.indexOf(getExtension(item)) !== -1) || (typeof item == 'object')
}

function imgs () {
  ls.configure('filter', filterImageExtensions )
  var imageList = ls.apply(null,arguments)
  // reset the filter son!
  ls.configure('filter', null)
  return imageList
}


ls.configure = function (key, val) {
  options[key] = val
}


ls.images = imgs

module.exports = ls 