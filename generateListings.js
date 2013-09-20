/**
 *  This program is used to generate the listing.json files
 *  inside the root sunglass directory. It creates a file 
 *  for every subdirectory
 */
"use strict" // for fun and for profit.

var ls = require('./ls')
var fs = require('fs')
var root = './public/images/shades'
var shades = fs.readdirSync(root).map(ls.prependPath(root))
var imageListing = ls.images.apply(null, shades)


var args = process.argv.slice(2)



function writeListingFile ( dirObject ) {
	var keys = Object.keys(dirObject)
	keys.forEach(function (path) {
		var files = dirObject[path]
		var fileName = path + '/listing.json'
		
		// Delete the old listing file if it exists.
		if (fs.existsSync(fileName)) {
			var stats = fs.statSync(fileName)
			if ( stats.isFile() ) {
				fs.unlinkSync(fileName)
			}
		}
		var find = new RegExp(root, 'g')

		var str = JSON.stringify(files).replace(find,'{{ root }}')
		fs.writeFile(fileName, str, function (err) {
			if (err) console.log(fileName+": didn't write")
		})

		// Look for subdirectories
		// and write to them too
		files.filter(function filterObjects (item) { 
			return typeof item == 'object'
		}).forEach(function (dirObject) {
			writeListingFile(dirObject)
		})
	})
	
}

writeListingFile(imageListing)
