'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var twitters = require('../../app/controllers/twitters');

	// Twitters Routes
	app.route('/twitters')
		.get(twitters.list)
		.post(users.requiresLogin, twitters.create);

	app.route('/twitters/:twitterId')
		.get(twitters.read)
		.put(users.requiresLogin, twitters.hasAuthorization, twitters.update)
		.delete(users.requiresLogin, twitters.hasAuthorization, twitters.delete);

	// Finish by binding the Twitter middleware
	app.param('twitterId', twitters.twitterByID);
};