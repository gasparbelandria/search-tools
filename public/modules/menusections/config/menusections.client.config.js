'use strict';

// Configuring the Articles module
angular.module('menusections').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Menu Sections', 'menusections', 'dropdown', '/menusections(/create)?');
		Menus.addSubMenuItem('topbar', 'menusections', 'List Menusections', 'menusections');
		Menus.addSubMenuItem('topbar', 'menusections', 'New Menusection', 'menusections/create');
	}
]);