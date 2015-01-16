'use strict';

//Setting up route
angular.module('twitters').config(['$stateProvider',
	function($stateProvider) {
		// Twitters state routing
		$stateProvider.
		state('listTwitters', {
			url: '/twitters',
			templateUrl: 'modules/twitters/views/list-twitters.client.view.html'
		}).
		state('createTwitter', {
			url: '/twitters/create',
			templateUrl: 'modules/twitters/views/create-twitter.client.view.html'
		}).
		state('viewTwitter', {
			url: '/twitters/:twitterId',
			templateUrl: 'modules/twitters/views/view-twitter.client.view.html'
		}).
		state('editTwitter', {
			url: '/twitters/:twitterId/edit',
			templateUrl: 'modules/twitters/views/edit-twitter.client.view.html'
		});
	}
]);