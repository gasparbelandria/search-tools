'use strict';

//Setting up route
angular.module('menusections').config(['$stateProvider',
	function($stateProvider) {
		// Menusections state routing
		$stateProvider.
		state('listMenusections', {
			url: '/menusections',
			templateUrl: 'modules/menusections/views/list-menusections.client.view.html'
		}).
		state('createMenusection', {
			url: '/menusections/create',
			templateUrl: 'modules/menusections/views/create-menusection.client.view.html'
		}).
		state('viewMenusection', {
			url: '/menusections/:menusectionId',
			templateUrl: 'modules/menusections/views/view-menusection.client.view.html'
		}).
		state('editMenusection', {
			url: '/menusections/:menusectionId/edit',
			templateUrl: 'modules/menusections/views/edit-menusection.client.view.html'
		});
	}
]);