'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Craiglist = mongoose.model('Craiglist'),
	_ = require('lodash');


function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[i] = arr[i];
  return rv;
}

/**
 * Show the current Craiglist
 */
exports.list = function(req, res) {
	console.log('-------------- SCRAPING -----------------');
	var craigslist = require('node-craigslist');
	var city = req.param('city');
	var search = req.param('search');
	var client = craigslist({
	  city : city
	}),
	options = {};
	var listings = [];
	client.search(options, search, function (err, listings) {
		listings.forEach(function (listing) {
			listing.city = city;
			var url = listing.url;
			if (url.indexOf("http")===-1){
				listing.url = 'http://'+city+'.craigslist.com'+listing.url;
			}
			listings.push(listing);
		});  
		console.log(toObject(listings));
		res.jsonp(toObject(listings));
	});
};



/**
 * Connect with Craiglists
 */
exports.connect = function(req, res) { 
	console.log('backend');
};


/**
 * Craiglist middleware
 */
exports.craiglistByID = function(req, res, next, id) {};

/**
 * Craiglist authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.craiglist.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};