'use strict';

// Craiglists controller
angular.module('craiglists').controller('CraiglistsController', ['$element', '$resource', '$http', '$scope', '$stateParams', '$location', 'Authentication', 'Craiglists',
	function($element, $resource, $http, $scope, $stateParams, $location, Authentication, Craiglists ) {
		$scope.authentication = Authentication;

		$scope.scrap = function() {
			var craiglists = new Craiglists ({
				city: this.city,
				search: this.search
			});
			$scope.craiglists = Craiglists.get(craiglists);
		};
	}
]);