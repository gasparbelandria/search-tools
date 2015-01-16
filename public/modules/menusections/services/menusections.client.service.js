'use strict';

//Menusections service used to communicate Menusections REST endpoints
angular.module('menusections').factory('Menusections', ['$resource',
	function($resource) {
		return $resource('menusections/:menusectionId', { menusectionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);