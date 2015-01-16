'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var craiglists = require('../../app/controllers/craiglists');

	// Craiglists Routes
	app.route('/craiglists')
		.get(craiglists.list);

	// Finish by binding the Craiglist middleware
	app.param('craiglistId', craiglists.craiglistByID);
};