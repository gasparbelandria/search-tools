'use strict';

(function() {
	// Menufoods Controller Spec
	describe('Menufoods Controller Tests', function() {
		// Initialize global variables
		var MenufoodsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Menufoods controller.
			MenufoodsController = $controller('MenufoodsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Menufood object fetched from XHR', inject(function(Menufoods) {
			// Create sample Menufood using the Menufoods service
			var sampleMenufood = new Menufoods({
				name: 'New Menufood'
			});

			// Create a sample Menufoods array that includes the new Menufood
			var sampleMenufoods = [sampleMenufood];

			// Set GET response
			$httpBackend.expectGET('menufoods').respond(sampleMenufoods);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.menufoods).toEqualData(sampleMenufoods);
		}));

		it('$scope.findOne() should create an array with one Menufood object fetched from XHR using a menufoodId URL parameter', inject(function(Menufoods) {
			// Define a sample Menufood object
			var sampleMenufood = new Menufoods({
				name: 'New Menufood'
			});

			// Set the URL parameter
			$stateParams.menufoodId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/menufoods\/([0-9a-fA-F]{24})$/).respond(sampleMenufood);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.menufood).toEqualData(sampleMenufood);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Menufoods) {
			// Create a sample Menufood object
			var sampleMenufoodPostData = new Menufoods({
				name: 'New Menufood'
			});

			// Create a sample Menufood response
			var sampleMenufoodResponse = new Menufoods({
				_id: '525cf20451979dea2c000001',
				name: 'New Menufood'
			});

			// Fixture mock form input values
			scope.name = 'New Menufood';

			// Set POST response
			$httpBackend.expectPOST('menufoods', sampleMenufoodPostData).respond(sampleMenufoodResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Menufood was created
			expect($location.path()).toBe('/menufoods/' + sampleMenufoodResponse._id);
		}));

		it('$scope.update() should update a valid Menufood', inject(function(Menufoods) {
			// Define a sample Menufood put data
			var sampleMenufoodPutData = new Menufoods({
				_id: '525cf20451979dea2c000001',
				name: 'New Menufood'
			});

			// Mock Menufood in scope
			scope.menufood = sampleMenufoodPutData;

			// Set PUT response
			$httpBackend.expectPUT(/menufoods\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/menufoods/' + sampleMenufoodPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid menufoodId and remove the Menufood from the scope', inject(function(Menufoods) {
			// Create new Menufood object
			var sampleMenufood = new Menufoods({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Menufoods array and include the Menufood
			scope.menufoods = [sampleMenufood];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/menufoods\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMenufood);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.menufoods.length).toBe(0);
		}));
	});
}());