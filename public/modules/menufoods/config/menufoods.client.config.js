'use strict';

// Configuring the Articles module
angular.module('menufoods').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Menus', 'menufoods', 'dropdown', '/menufoods(/create)?');
		Menus.addSubMenuItem('topbar', 'menufoods', 'List Menufoods', 'menufoods');
		Menus.addSubMenuItem('topbar', 'menufoods', 'New Menufood', 'menufoods/create');
	}
]);