'use strict';

// Configuring the Articles module
angular.module('craiglists').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Craiglists', 'craiglists', 'dropdown', '/craiglists(/create)?');
		Menus.addSubMenuItem('topbar', 'craiglists', 'List Craiglists', 'craiglists');
	}
]);