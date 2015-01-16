'use strict';

// Twitters controller
angular.module('twitters').controller('TwittersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Twitters',
	function($scope, $stateParams, $location, Authentication, Twitters ) {
		$scope.authentication = Authentication;

		// Create new Twitter
		$scope.create = function() {
			// Create new Twitter object
			var twitter = new Twitters ({
				name: this.name
			});

			// Redirect after save
			twitter.$save(function(response) {
				$location.path('twitters/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Twitter
		$scope.remove = function( twitter ) {
			if ( twitter ) { twitter.$remove();

				for (var i in $scope.twitters ) {
					if ($scope.twitters [i] === twitter ) {
						$scope.twitters.splice(i, 1);
					}
				}
			} else {
				$scope.twitter.$remove(function() {
					$location.path('twitters');
				});
			}
		};

		// Update existing Twitter
		$scope.update = function() {
			var twitter = $scope.twitter ;

			twitter.$update(function() {
				$location.path('twitters/' + twitter._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Twitters
		$scope.find = function() {
			$scope.twitters = Twitters.query();
		};

		// Find existing Twitter
		$scope.findOne = function() {
			$scope.twitter = Twitters.get({ 
				twitterId: $stateParams.twitterId
			});
		};
	}
]);