'use strict';

//Setting up route
angular.module('craiglists').config(['$stateProvider',
	function($stateProvider) {
		// Craiglists state routing
		$stateProvider.
		state('listCraiglists', {
			url: '/craiglists',
			templateUrl: 'modules/craiglists/views/list-craiglists.client.view.html'
		}).
		state('createCraiglist', {
			url: '/craiglists/create',
			templateUrl: 'modules/craiglists/views/create-craiglist.client.view.html'
		}).
		state('viewCraiglist', {
			url: '/craiglists/:craiglistId',
			templateUrl: 'modules/craiglists/views/view-craiglist.client.view.html'
		}).
		state('editCraiglist', {
			url: '/craiglists/:craiglistId/edit',
			templateUrl: 'modules/craiglists/views/edit-craiglist.client.view.html'
		}).
		state('scrapCraiglist', {
			url: '/craiglists/:city/:section/:query',
			templateUrl: 'modules/craiglists/views/scrap-craiglists.client.view.html'
		});
	}
]);