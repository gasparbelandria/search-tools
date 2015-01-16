'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Twitter = mongoose.model('Twitter'),
	_ = require('lodash');

/**
 * Create a Twitter
 */
exports.create = function(req, res) {
	var twitter = new Twitter(req.body);
	twitter.user = req.user;

	twitter.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(twitter);
		}
	});
};

/**
 * Show the current Twitter
 */
exports.read = function(req, res) {
	res.jsonp(req.twitter);
};

/**
 * Update a Twitter
 */
exports.update = function(req, res) {
	var twitter = req.twitter ;

	twitter = _.extend(twitter , req.body);

	twitter.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(twitter);
		}
	});
};

/**
 * Delete an Twitter
 */
exports.delete = function(req, res) {
	var twitter = req.twitter ;

	twitter.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(twitter);
		}
	});
};

/**
 * List of Twitters
 */
exports.list = function(req, res) { Twitter.find().sort('-created').populate('user', 'displayName').exec(function(err, twitters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(twitters);
		}
	});
};

/**
 * Twitter middleware
 */
exports.twitterByID = function(req, res, next, id) { Twitter.findById(id).populate('user', 'displayName').exec(function(err, twitter) {
		if (err) return next(err);
		if (! twitter) return next(new Error('Failed to load Twitter ' + id));
		req.twitter = twitter ;
		next();
	});
};

/**
 * Twitter authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.twitter.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};