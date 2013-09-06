var ls = require('../ls')
var assert = require('assert')

function filterStrings (arr) {
	return arr.filter(function ( item ) {
		return typeof item == 'string'
	})
}

function contains () {
	var args = Array.prototype.slice.call(arguments,0)
	var self = this
	return args.every(function (el) {
		return self.indexOf(el) !== -1
	})
}

function filterObjects (item) { 
	return typeof item == 'object'
}

var dir1 = './test/some-dir'
var dir2 = './test/another-dir'

describe('#ls', function () {
	var listing = ls(dir1)

	it ('should list the content of a directory in an array', function () {
		assert.ok( Array.isArray(listing[dir1]) )
	})

	it('should list the files as strings', function () {
		var fileList = ['./test/some-dir/hello.txt','./test/some-dir/there.txt']
		assert.ok( contains.apply( filterStrings(listing[dir1]) ), fileList)
	})

	it('should take multiple arguments for multiple directories to search', function () {
		var listing = ls(dir1,dir2)
		assert.equal(2, Object.keys(listing).length)
	})

	it('should list sub-directories as objects in the contents list', function () {
		function filterObjects (item) { return typeof item == 'object'}
		var subs1 = listing[dir1].filter(filterObjects)
		var subs2 = ls(dir2)[dir2].filter(filterObjects)
		assert.equal(1, subs1.length)
		assert.equal(2, subs2.length)
	})

	// Listing only images and sub directories
	describe('ls#images', function (	) {
		it('should only list images and subdirectories', function () {
			var directoryImages = ls.images(dir1)[dir1]
			var imageList = ['./test/some-dir/smajlik1.gif','./test/some-dir/smajlik2.gif']
			// console.log(imageList)
			// console.log(ls.images(dir1)[dir1])
			// console.log()
			assert.ok(contains.apply(filterStrings(directoryImages, imageList)))
			assert.equal(1, directoryImages.filter(filterObjects).length)
		})
	})

})