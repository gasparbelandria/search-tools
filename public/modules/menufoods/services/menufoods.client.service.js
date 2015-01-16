'use strict';

//Menufoods service used to communicate Menufoods REST endpoints
angular.module('menufoods').factory('Menufoods', ['$resource',
	function($resource) {
		return $resource('menufoods/:menufoodId', { menufoodId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);