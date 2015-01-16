'use strict';

//Setting up route
angular.module('restaurants').config(['$stateProvider',
	function($stateProvider) {
		// Restaurants state routing
		$stateProvider.
		state('listRestaurants', {
			url: '/restaurants',
			templateUrl: 'modules/restaurants/views/list-restaurants.client.view.html'
		}).
		state('createRestaurant', {
			url: '/restaurants/create',
			templateUrl: 'modules/restaurants/views/create-restaurant.client.view.html'
		}).
		state('viewRestaurant', {
			url: '/restaurants/:restaurantId',
			templateUrl: 'modules/restaurants/views/view-restaurant.client.view.html'
		}).
		state('editRestaurant', {
			url: '/restaurants/:restaurantId/edit',
			templateUrl: 'modules/restaurants/views/edit-restaurant.client.view.html'
		});
	}
]);