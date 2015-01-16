'use strict';

//Setting up route
angular.module('menufoods').config(['$stateProvider',
	function($stateProvider) {
		// Menufoods state routing
		$stateProvider.
		state('listMenufoods', {
			url: '/menufoods',
			templateUrl: 'modules/menufoods/views/list-menufoods.client.view.html'
		}).
		state('createMenufood', {
			url: '/menufoods/create',
			templateUrl: 'modules/menufoods/views/create-menufood.client.view.html'
		}).
		state('viewMenufood', {
			url: '/menufoods/:menufoodId',
			templateUrl: 'modules/menufoods/views/view-menufood.client.view.html'
		}).
		state('editMenufood', {
			url: '/menufoods/:menufoodId/edit',
			templateUrl: 'modules/menufoods/views/edit-menufood.client.view.html'
		});
	}
]);