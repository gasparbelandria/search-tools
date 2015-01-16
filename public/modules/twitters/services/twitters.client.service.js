'use strict';

//Twitters service used to communicate Twitters REST endpoints
angular.module('twitters').factory('Twitters', ['$resource',
	function($resource) {
		return $resource('twitters/:twitterId', { twitterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);