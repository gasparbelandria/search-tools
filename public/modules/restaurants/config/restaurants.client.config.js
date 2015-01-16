'use strict';

// Configuring the Articles module
angular.module('restaurants').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Restaurants', 'restaurants', 'dropdown', '/restaurants(/create)?');
		Menus.addSubMenuItem('topbar', 'restaurants', 'List Restaurants', 'restaurants');
		Menus.addSubMenuItem('topbar', 'restaurants', 'New Restaurant', 'restaurants/create');
	}
]);