'use strict';

// Menufoods controller
angular.module('menufoods').controller('MenufoodsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Menufoods', 'Restaurants', 'Menusections',
	function($scope, $stateParams, $location, Authentication, Menufoods, Restaurants, Menusections ) {
		$scope.authentication = Authentication;

		// Create new Menufood
		$scope.create = function() {
			// Create new Menufood object
			var menufood = new Menufoods ({
				restaurant: document.getElementById('restaurant').value,
				section: document.getElementById('section').value,
				name: this.name,
				item: this.item,
				price: this.price
			});

			console.log(menufood);

			// Redirect after save
			menufood.$save(function(response) {
				$location.path('menufoods/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Menufood
		$scope.remove = function( menufood ) {
			if ( menufood ) { menufood.$remove();

				for (var i in $scope.menufoods ) {
					if ($scope.menufoods [i] === menufood ) {
						$scope.menufoods.splice(i, 1);
					}
				}
			} else {
				$scope.menufood.$remove(function() {
					$location.path('menufoods');
				});
			}
		};

		// Update existing Menufood
		$scope.update = function() {
			var menufood = $scope.menufood ;

			menufood.$update(function() {
				$location.path('menufoods/' + menufood._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Menufoods
		$scope.find = function() {
			$scope.menufoods = Menufoods.query();
		};

		// Find existing Menufood
		$scope.findOne = function() {
			$scope.menufood = Menufoods.get({ 
				menufoodId: $stateParams.menufoodId
			});
		};

		// Find a list of Restaurants
		$scope.findRestaurants = function() {
			// #gb Create a Restaurant object
			$scope.menufoods = Restaurants.query();
		};

		// Find a list of Menu Sections
		$scope.findSections = function() {
			// #gb Create a Sections object
			$scope.menufoods = Menusections.query();
		};


	}
]);