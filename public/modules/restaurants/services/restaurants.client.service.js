'use strict';

//Restaurants service used to communicate Restaurants REST endpoints
angular.module('restaurants').factory('Restaurants', ['$resource',
	function($resource) {
		return $resource('restaurants/:restaurantId', { restaurantId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);