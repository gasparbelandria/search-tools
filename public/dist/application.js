'use strict';
// Init the application configuration module for AngularJS application
var ApplicationConfiguration = function () {
    // Init module configuration options
    var applicationModuleName = 'restaurant';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ngCookies',
        'ngAnimate',
        'ngTouch',
        'ngSanitize',
        'ui.router',
        'ui.bootstrap',
        'ui.utils'
      ];
    // Add a new vertical module
    var registerModule = function (moduleName, dependencies) {
      // Create angular module
      angular.module(moduleName, dependencies || []);
      // Add the module to the AngularJS configuration file
      angular.module(applicationModuleName).requires.push(moduleName);
    };
    return {
      applicationModuleName: applicationModuleName,
      applicationModuleVendorDependencies: applicationModuleVendorDependencies,
      registerModule: registerModule
    };
  }();'use strict';
//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_')
    window.location.hash = '#!';
  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('craiglists');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('menufoods');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('menusections');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('restaurants');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');'use strict';
// Setting up route
angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    // Home state routing
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'modules/core/views/home.client.view.html'
    });
  }
]);'use strict';
angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  function ($scope, Authentication, Menus) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);'use strict';
angular.module('core').controller('HomeController', [
  '$scope',
  'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }
]);'use strict';
//Menu service used for managing  menus
angular.module('core').service('Menus', [function () {
    // Define a set of default roles
    this.defaultRoles = ['*'];
    // Define the menus object
    this.menus = {};
    // A private function for rendering decision 
    var shouldRender = function (user) {
      if (user) {
        if (!!~this.roles.indexOf('*')) {
          return true;
        } else {
          for (var userRoleIndex in user.roles) {
            for (var roleIndex in this.roles) {
              if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
                return true;
              }
            }
          }
        }
      } else {
        return this.isPublic;
      }
      return false;
    };
    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exists');
        }
      } else {
        throw new Error('MenuId was not provided');
      }
      return false;
    };
    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      return this.menus[menuId];
    };
    // Add new menu object by menu id
    this.addMenu = function (menuId, isPublic, roles) {
      // Create the new menu
      this.menus[menuId] = {
        isPublic: isPublic || false,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      };
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      delete this.menus[menuId];
    };
    // Add menu item object
    this.addMenuItem = function (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Push new menu item
      this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || '/' + menuItemURL,
        isPublic: isPublic === null || typeof isPublic === 'undefined' ? this.menus[menuId].isPublic : isPublic,
        roles: roles === null || typeof roles === 'undefined' ? this.menus[menuId].roles : roles,
        position: position || 0,
        items: [],
        shouldRender: shouldRender
      });
      // Return the menu object
      return this.menus[menuId];
    };
    // Add submenu item object
    this.addSubMenuItem = function (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: menuItemTitle,
            link: menuItemURL,
            uiRoute: menuItemUIRoute || '/' + menuItemURL,
            isPublic: isPublic === null || typeof isPublic === 'undefined' ? this.menus[menuId].items[itemIndex].isPublic : isPublic,
            roles: roles === null || typeof roles === 'undefined' ? this.menus[menuId].items[itemIndex].roles : roles,
            position: position || 0,
            shouldRender: shouldRender
          });
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    //Adding the topbar menu
    this.addMenu('topbar');
  }]);'use strict';
// Configuring the Articles module
angular.module('craiglists').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Craiglists', 'craiglists', 'dropdown', '/craiglists(/create)?');
    Menus.addSubMenuItem('topbar', 'craiglists', 'List Craiglists', 'craiglists');
  }
]);'use strict';
//Setting up route
angular.module('craiglists').config([
  '$stateProvider',
  function ($stateProvider) {
    // Craiglists state routing
    $stateProvider.state('listCraiglists', {
      url: '/craiglists',
      templateUrl: 'modules/craiglists/views/list-craiglists.client.view.html'
    }).state('createCraiglist', {
      url: '/craiglists/create',
      templateUrl: 'modules/craiglists/views/create-craiglist.client.view.html'
    }).state('viewCraiglist', {
      url: '/craiglists/:craiglistId',
      templateUrl: 'modules/craiglists/views/view-craiglist.client.view.html'
    }).state('editCraiglist', {
      url: '/craiglists/:craiglistId/edit',
      templateUrl: 'modules/craiglists/views/edit-craiglist.client.view.html'
    }).state('scrapCraiglist', {
      url: '/craiglists/:city/:section/:query',
      templateUrl: 'modules/craiglists/views/scrap-craiglists.client.view.html'
    });
  }
]);'use strict';
// Craiglists controller
angular.module('craiglists').controller('CraiglistsController', [
  '$element',
  '$resource',
  '$http',
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Craiglists',
  function ($element, $resource, $http, $scope, $stateParams, $location, Authentication, Craiglists) {
    $scope.authentication = Authentication;
    // Find a list of Craiglists
    $scope.find = function () {
    };
    $scope.scrap = function () {
      var craiglists = new Craiglists({
          city: this.name,
          search: this.address
        });
      console.log(craiglists);  /*
			console.clear();
			var city = $stateParams.city;
			var section = $stateParams.section;
			var query = $stateParams.query;
			var craigs = 'http://'+city+'.craigslist.org/search/'+section+'?sort=rel&query='+query;
			var craigsUrl = encodeURIComponent(craigs);
			var _YQL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'"+craigsUrl+"'%20and%20xpath%3D'*'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
			var listings = [];
			$http({method: 'GET', url: _YQL}).
			  success(function(data, status, headers, config) {
			  	console.log(status);
			  	if (status===200){
			  		if (data.query.results){
			  			console.log(data.query.results);
					  	var dom = data.query.results.html.body.div;
					  	dom.forEach(function(e){
					  		if (e.id==='toc_rows'){
					  			var div = e.div;
					  			div.forEach(function(el){
					  				console.log()
					  				if (el.class==='content'){
					  					var p = el.p;
					  					p.forEach(function(elem){
											var listing = {};
					  						var span = elem.span.span;
					  						listing.date = span[0].span.content;
					  						listing.title = span[0].a.content;
					  						listing.url = 'http://'+city+'.craigslist.org'+span[0].a.href;
					  						if (span[1].span){
						  						listing.location = span[1].span.small;
					  						}else{
					  							listing.location = '';
					  						}
											listings.push(listing);
					  						//console.log(angular.element(elem.span).find('span.l2 a.gc').text());
					  					});
					  				}
					  			});
					  		}
					  	});
			  		}else{
			  			$scope.error = 'Sorry, no results came back...';
			  		}
			  		console.log(listings);
			  		$scope.craiglists = listings;
			  	}else{
			  		$scope.error = 'Unsuccessful response from (YQL) server....';
			  	}
			  }).
			  error(function(data, status, headers, config) {
			  	console.log(status);
			});
			*/
    };
  }
]);'use strict';
// Craiglists controller
angular.module('craiglists').controller('CraiglistsController', [
  '$element',
  '$resource',
  '$http',
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Craiglists',
  function ($element, $resource, $http, $scope, $stateParams, $location, Authentication, Craiglists) {
    $scope.authentication = Authentication;
    $scope.scrap = function () {
      var craiglists = new Craiglists({
          city: this.city,
          search: this.search
        });
      $scope.craiglists = Craiglists.get(craiglists);
    };
  }
]);'use strict';
//Craiglists service used to communicate Craiglists REST endpoints
angular.module('craiglists').factory('Craiglists', [
  '$resource',
  function ($resource) {
    return $resource('craiglists/:craiglistId', { craiglistId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Configuring the Articles module
angular.module('menufoods').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Menus', 'menufoods', 'dropdown', '/menufoods(/create)?');
    Menus.addSubMenuItem('topbar', 'menufoods', 'List Menufoods', 'menufoods');
    Menus.addSubMenuItem('topbar', 'menufoods', 'New Menufood', 'menufoods/create');
  }
]);'use strict';
//Setting up route
angular.module('menufoods').config([
  '$stateProvider',
  function ($stateProvider) {
    // Menufoods state routing
    $stateProvider.state('listMenufoods', {
      url: '/menufoods',
      templateUrl: 'modules/menufoods/views/list-menufoods.client.view.html'
    }).state('createMenufood', {
      url: '/menufoods/create',
      templateUrl: 'modules/menufoods/views/create-menufood.client.view.html'
    }).state('viewMenufood', {
      url: '/menufoods/:menufoodId',
      templateUrl: 'modules/menufoods/views/view-menufood.client.view.html'
    }).state('editMenufood', {
      url: '/menufoods/:menufoodId/edit',
      templateUrl: 'modules/menufoods/views/edit-menufood.client.view.html'
    });
  }
]);'use strict';
// Menufoods controller
angular.module('menufoods').controller('MenufoodsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Menufoods',
  'Restaurants',
  'Menusections',
  function ($scope, $stateParams, $location, Authentication, Menufoods, Restaurants, Menusections) {
    $scope.authentication = Authentication;
    // Create new Menufood
    $scope.create = function () {
      // Create new Menufood object
      var menufood = new Menufoods({
          restaurant: document.getElementById('restaurant').value,
          section: document.getElementById('section').value,
          name: this.name,
          item: this.item,
          price: this.price
        });
      console.log(menufood);
      // Redirect after save
      menufood.$save(function (response) {
        $location.path('menufoods/' + response._id);
        // Clear form fields
        $scope.name = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Remove existing Menufood
    $scope.remove = function (menufood) {
      if (menufood) {
        menufood.$remove();
        for (var i in $scope.menufoods) {
          if ($scope.menufoods[i] === menufood) {
            $scope.menufoods.splice(i, 1);
          }
        }
      } else {
        $scope.menufood.$remove(function () {
          $location.path('menufoods');
        });
      }
    };
    // Update existing Menufood
    $scope.update = function () {
      var menufood = $scope.menufood;
      menufood.$update(function () {
        $location.path('menufoods/' + menufood._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Menufoods
    $scope.find = function () {
      $scope.menufoods = Menufoods.query();
    };
    // Find existing Menufood
    $scope.findOne = function () {
      $scope.menufood = Menufoods.get({ menufoodId: $stateParams.menufoodId });
    };
    // Find a list of Restaurants
    $scope.findRestaurants = function () {
      // #gb Create a Restaurant object
      $scope.menufoods = Restaurants.query();
    };
    // Find a list of Menu Sections
    $scope.findSections = function () {
      // #gb Create a Sections object
      $scope.menufoods = Menusections.query();
    };
  }
]);'use strict';
//Menufoods service used to communicate Menufoods REST endpoints
angular.module('menufoods').factory('Menufoods', [
  '$resource',
  function ($resource) {
    return $resource('menufoods/:menufoodId', { menufoodId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Configuring the Articles module
angular.module('menusections').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Menu Sections', 'menusections', 'dropdown', '/menusections(/create)?');
    Menus.addSubMenuItem('topbar', 'menusections', 'List Menusections', 'menusections');
    Menus.addSubMenuItem('topbar', 'menusections', 'New Menusection', 'menusections/create');
  }
]);'use strict';
//Setting up route
angular.module('menusections').config([
  '$stateProvider',
  function ($stateProvider) {
    // Menusections state routing
    $stateProvider.state('listMenusections', {
      url: '/menusections',
      templateUrl: 'modules/menusections/views/list-menusections.client.view.html'
    }).state('createMenusection', {
      url: '/menusections/create',
      templateUrl: 'modules/menusections/views/create-menusection.client.view.html'
    }).state('viewMenusection', {
      url: '/menusections/:menusectionId',
      templateUrl: 'modules/menusections/views/view-menusection.client.view.html'
    }).state('editMenusection', {
      url: '/menusections/:menusectionId/edit',
      templateUrl: 'modules/menusections/views/edit-menusection.client.view.html'
    });
  }
]);'use strict';
// Menusections controller
angular.module('menusections').controller('MenusectionsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Menusections',
  function ($scope, $stateParams, $location, Authentication, Menusections) {
    $scope.authentication = Authentication;
    // Create new Menusection
    $scope.create = function () {
      // Create new Menusection object
      var menusection = new Menusections({ name: this.name });
      // Redirect after save
      menusection.$save(function (response) {
        $location.path('menusections/' + response._id);
        // Clear form fields
        $scope.name = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Remove existing Menusection
    $scope.remove = function (menusection) {
      if (menusection) {
        menusection.$remove();
        for (var i in $scope.menusections) {
          if ($scope.menusections[i] === menusection) {
            $scope.menusections.splice(i, 1);
          }
        }
      } else {
        $scope.menusection.$remove(function () {
          $location.path('menusections');
        });
      }
    };
    // Update existing Menusection
    $scope.update = function () {
      var menusection = $scope.menusection;
      menusection.$update(function () {
        $location.path('menusections/' + menusection._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Menusections
    $scope.find = function () {
      $scope.menusections = Menusections.query();
    };
    // Find existing Menusection
    $scope.findOne = function () {
      $scope.menusection = Menusections.get({ menusectionId: $stateParams.menusectionId });
    };
  }
]);'use strict';
//Menusections service used to communicate Menusections REST endpoints
angular.module('menusections').factory('Menusections', [
  '$resource',
  function ($resource) {
    return $resource('menusections/:menusectionId', { menusectionId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Configuring the Articles module
angular.module('restaurants').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Restaurants', 'restaurants', 'dropdown', '/restaurants(/create)?');
    Menus.addSubMenuItem('topbar', 'restaurants', 'List Restaurants', 'restaurants');
    Menus.addSubMenuItem('topbar', 'restaurants', 'New Restaurant', 'restaurants/create');
  }
]);'use strict';
//Setting up route
angular.module('restaurants').config([
  '$stateProvider',
  function ($stateProvider) {
    // Restaurants state routing
    $stateProvider.state('listRestaurants', {
      url: '/restaurants',
      templateUrl: 'modules/restaurants/views/list-restaurants.client.view.html'
    }).state('createRestaurant', {
      url: '/restaurants/create',
      templateUrl: 'modules/restaurants/views/create-restaurant.client.view.html'
    }).state('viewRestaurant', {
      url: '/restaurants/:restaurantId',
      templateUrl: 'modules/restaurants/views/view-restaurant.client.view.html'
    }).state('editRestaurant', {
      url: '/restaurants/:restaurantId/edit',
      templateUrl: 'modules/restaurants/views/edit-restaurant.client.view.html'
    });
  }
]);'use strict';
// Restaurants controller
angular.module('restaurants').controller('RestaurantsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Restaurants',
  function ($scope, $stateParams, $location, Authentication, Restaurants) {
    $scope.authentication = Authentication;
    // Create new Restaurant
    $scope.create = function () {
      // Create new Restaurant object
      var restaurant = new Restaurants({
          name: this.name,
          address: this.address,
          street: this.street,
          zipcode: this.zipcode,
          phone: this.phone,
          email: this.email,
          cusine: this.cusine,
          open: this.open,
          close: this.close,
          picture_url: this.picture_url,
          website: this.website
        });
      // Redirect after save
      restaurant.$save(function (response) {
        $location.path('restaurants/' + response._id);
        // Clear form fields
        $scope.name = '';
        $scope.address = '';
        $scope.street = '';
        $scope.zipcode = '';
        $scope.phone = '';
        $scope.email = '';
        $scope.cusine = '';
        $scope.open = '';
        $scope.close = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Remove existing Restaurant
    $scope.remove = function (restaurant) {
      if (restaurant) {
        restaurant.$remove();
        for (var i in $scope.restaurants) {
          if ($scope.restaurants[i] === restaurant) {
            $scope.restaurants.splice(i, 1);
          }
        }
      } else {
        $scope.restaurant.$remove(function () {
          $location.path('restaurants');
        });
      }
    };
    // Update existing Restaurant
    $scope.update = function () {
      var restaurant = $scope.restaurant;
      restaurant.$update(function () {
        $location.path('restaurants/' + restaurant._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Restaurants
    $scope.find = function () {
      $scope.restaurants = Restaurants.query();
    };
    // Find existing Restaurant
    $scope.findOne = function () {
      $scope.restaurant = Restaurants.get({ restaurantId: $stateParams.restaurantId });
    };
  }
]);'use strict';
//Restaurants service used to communicate Restaurants REST endpoints
angular.module('restaurants').factory('Restaurants', [
  '$resource',
  function ($resource) {
    return $resource('restaurants/:restaurantId', { restaurantId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Config HTTP Error Handling
angular.module('users').config([
  '$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              // Deauthenticate the global user
              Authentication.user = null;
              // Redirect to signin page
              $location.path('signin');
              break;
            case 403:
              // Add unauthorized behaviour 
              break;
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);'use strict';
// Setting up route
angular.module('users').config([
  '$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider.state('profile', {
      url: '/settings/profile',
      templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
    }).state('password', {
      url: '/settings/password',
      templateUrl: 'modules/users/views/settings/change-password.client.view.html'
    }).state('accounts', {
      url: '/settings/accounts',
      templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
    }).state('signup', {
      url: '/signup',
      templateUrl: 'modules/users/views/authentication/signup.client.view.html'
    }).state('signin', {
      url: '/signin',
      templateUrl: 'modules/users/views/authentication/signin.client.view.html'
    }).state('forgot', {
      url: '/password/forgot',
      templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
    }).state('reset-invlaid', {
      url: '/password/reset/invalid',
      templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
    }).state('reset-success', {
      url: '/password/reset/success',
      templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
    }).state('reset', {
      url: '/password/reset/:token',
      templateUrl: 'modules/users/views/password/reset-password.client.view.html'
    });
  }
]);'use strict';
angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    // If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    $scope.signup = function () {
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        // And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        // And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('PasswordController', [
  '$scope',
  '$stateParams',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $stateParams, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    //If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    // Submit forgotten password account id
    $scope.askForPasswordReset = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/forgot', $scope.credentials).success(function (response) {
        // Show user success message and clear form
        $scope.credentials = null;
        $scope.success = response.message;
      }).error(function (response) {
        // Show user error message and clear form
        $scope.credentials = null;
        $scope.error = response.message;
      });
    };
    // Change user password
    $scope.resetUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.passwordDetails = null;
        // Attach user profile
        Authentication.user = response;
        // And redirect to the index page
        $location.path('/password/reset/success');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('SettingsController', [
  '$scope',
  '$http',
  '$location',
  'Users',
  'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/');
    // Check if there are additional accounts 
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }
      return false;
    };
    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
    };
    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;
      $http.delete('/users/accounts', { params: { provider: provider } }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      if (isValid) {
        $scope.success = $scope.error = null;
        var user = new Users($scope.user);
        user.$update(function (response) {
          $scope.success = true;
          Authentication.user = response;
        }, function (response) {
          $scope.error = response.data.message;
        });
      } else {
        $scope.submitted = true;
      }
    };
    // Change user password
    $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
// Authentication service for user variables
angular.module('users').factory('Authentication', [function () {
    var _this = this;
    _this._data = { user: window.user };
    return _this._data;
  }]);'use strict';
// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('users', {}, { update: { method: 'PUT' } });
  }
]);