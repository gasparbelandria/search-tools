'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var restaurants = require('../../app/controllers/restaurants');

	// Restaurants Routes
	app.route('/restaurants')
		.get(restaurants.list)
		.post(users.requiresLogin, restaurants.create);

	app.route('/restaurants/:restaurantId')
		.get(restaurants.read)
		.put(users.requiresLogin, restaurants.hasAuthorization, restaurants.update)
		.delete(users.requiresLogin, restaurants.hasAuthorization, restaurants.delete);

	// Finish by binding the Restaurant middleware
	app.param('restaurantId', restaurants.restaurantByID);
};