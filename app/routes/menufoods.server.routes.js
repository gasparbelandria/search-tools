'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var menufoods = require('../../app/controllers/menufoods');

	// Menufoods Routes
	app.route('/menufoods')
		.get(menufoods.list)
		.post(users.requiresLogin, menufoods.create);

	app.route('/menufoods/:menufoodId')
		.get(menufoods.read)
		.put(users.requiresLogin, menufoods.hasAuthorization, menufoods.update)
		.delete(users.requiresLogin, menufoods.hasAuthorization, menufoods.delete);

	// Finish by binding the Menufood middleware
	app.param('menufoodId', menufoods.menufoodByID);
};