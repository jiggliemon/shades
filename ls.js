var fs = require('fs')
var path = require('path')

function extend () {
	var args = Array.prototype.slice.call(arguments,0)
	var self = this
	args.forEach(function (obj) {
		for ( var k in obj ) {
			if ( obj.hasOwnProperty(k) ) {
				self[k] = obj[k]
			}
		}
	})
	return this
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

		list = list.sort(ls.options.sort)
		if ( ls.options.filter ) {
			list = list.filter(ls.options.filter)
		}
		ret[path] = list

		return ret
	})	

	return extend.apply({},paths)
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
	return ['File','Directory','BlockDevice','CharacterDevice','SymbolicLink','FIFO','Socket'].filter(checkStat)[0]
}



function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}

var legalImgExtensions = ['png','tif','jpg','jpeg','svg','gif']

function filterImageExtensions (item) {
	return legalImgExtensions.indexOf(getExtension(item)) !== -1
}

function imgs () {
	ls.configure('filter', filterImageExtensions )
	return ls.apply(null,arguments)
}


ls.configure = function (key, val) {

}
ls.options = {
	sort: null,
	filter: null
}

ls.images = imgs

module.exports = ls 