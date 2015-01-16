'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var menusections = require('../../app/controllers/menusections');

	// Menusections Routes
	app.route('/menusections')
		.get(menusections.list)
		.post(users.requiresLogin, menusections.create);

	app.route('/menusections/:menusectionId')
		.get(menusections.read)
		.put(users.requiresLogin, menusections.hasAuthorization, menusections.update)
		.delete(users.requiresLogin, menusections.hasAuthorization, menusections.delete);

	// Finish by binding the Menusection middleware
	app.param('menusectionId', menusections.menusectionByID);
};