'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Menufood = mongoose.model('Menufood'),
	_ = require('lodash');

/**
 * Create a Menufood
 */
exports.create = function(req, res) {
	var menufood = new Menufood(req.body);
	menufood.user = req.user;

	menufood.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(menufood);
		}
	});
};

/**
 * Show the current Menufood
 */
exports.read = function(req, res) {
	res.jsonp(req.menufood);
};

/**
 * Update a Menufood
 */
exports.update = function(req, res) {
	var menufood = req.menufood ;

	menufood = _.extend(menufood , req.body);

	menufood.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(menufood);
		}
	});
};

/**
 * Delete an Menufood
 */
exports.delete = function(req, res) {
	var menufood = req.menufood ;

	menufood.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(menufood);
		}
	});
};

/**
 * List of Menufoods
 */
exports.list = function(req, res) { Menufood.find().sort('-created').populate('user', 'displayName').exec(function(err, menufoods) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(menufoods);
		}
	});
};

/**
 * Menufood middleware
 */
exports.menufoodByID = function(req, res, next, id) { Menufood.findById(id).populate('user', 'displayName').exec(function(err, menufood) {
		if (err) return next(err);
		if (! menufood) return next(new Error('Failed to load Menufood ' + id));
		req.menufood = menufood ;
		next();
	});
};

/**
 * Menufood authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.menufood.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};