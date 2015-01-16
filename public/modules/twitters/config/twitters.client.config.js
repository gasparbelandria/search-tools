'use strict';

// Configuring the Articles module
angular.module('twitters').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Twitters', 'twitters', 'dropdown', '/twitters(/create)?');
		Menus.addSubMenuItem('topbar', 'twitters', 'List Twitters', 'twitters');
		Menus.addSubMenuItem('topbar', 'twitters', 'New Twitter', 'twitters/create');
	}
]);