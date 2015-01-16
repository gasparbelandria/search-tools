'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Menusection = mongoose.model('Menusection'),
	_ = require('lodash');

/**
 * Create a Menusection
 */
exports.create = function(req, res) {
	var menusection = new Menusection(req.body);
	menusection.user = req.user;

	menusection.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(menusection);
		}
	});
};

/**
 * Show the current Menusection
 */
exports.read = function(req, res) {
	res.jsonp(req.menusection);
};

/**
 * Update a Menusection
 */
exports.update = function(req, res) {
	var menusection = req.menusection ;

	menusection = _.extend(menusection , req.body);

	menusection.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(menusection);
		}
	});
};

/**
 * Delete an Menusection
 */
exports.delete = function(req, res) {
	var menusection = req.menusection ;

	menusection.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(menusection);
		}
	});
};

/**
 * List of Menusections
 */
exports.list = function(req, res) { Menusection.find().sort('-created').populate('user', 'displayName').exec(function(err, menusections) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(menusections);
		}
	});
};

/**
 * Menusection middleware
 */
exports.menusectionByID = function(req, res, next, id) { Menusection.findById(id).populate('user', 'displayName').exec(function(err, menusection) {
		if (err) return next(err);
		if (! menusection) return next(new Error('Failed to load Menusection ' + id));
		req.menusection = menusection ;
		next();
	});
};

/**
 * Menusection authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.menusection.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};