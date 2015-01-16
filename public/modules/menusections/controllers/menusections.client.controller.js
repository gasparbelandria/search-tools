'use strict';

// Menusections controller
angular.module('menusections').controller('MenusectionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Menusections',
	function($scope, $stateParams, $location, Authentication, Menusections ) {
		$scope.authentication = Authentication;

		// Create new Menusection
		$scope.create = function() {
			// Create new Menusection object
			var menusection = new Menusections ({
				name: this.name
			});

			// Redirect after save
			menusection.$save(function(response) {
				$location.path('menusections/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Menusection
		$scope.remove = function( menusection ) {
			if ( menusection ) { menusection.$remove();

				for (var i in $scope.menusections ) {
					if ($scope.menusections [i] === menusection ) {
						$scope.menusections.splice(i, 1);
					}
				}
			} else {
				$scope.menusection.$remove(function() {
					$location.path('menusections');
				});
			}
		};

		// Update existing Menusection
		$scope.update = function() {
			var menusection = $scope.menusection ;

			menusection.$update(function() {
				$location.path('menusections/' + menusection._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Menusections
		$scope.find = function() {
			$scope.menusections = Menusections.query();
		};

		// Find existing Menusection
		$scope.findOne = function() {
			$scope.menusection = Menusections.get({ 
				menusectionId: $stateParams.menusectionId
			});
		};
	}
]);