'use strict';

(function() {
	// Menusections Controller Spec
	describe('Menusections Controller Tests', function() {
		// Initialize global variables
		var MenusectionsController,
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

			// Initialize the Menusections controller.
			MenusectionsController = $controller('MenusectionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Menusection object fetched from XHR', inject(function(Menusections) {
			// Create sample Menusection using the Menusections service
			var sampleMenusection = new Menusections({
				name: 'New Menusection'
			});

			// Create a sample Menusections array that includes the new Menusection
			var sampleMenusections = [sampleMenusection];

			// Set GET response
			$httpBackend.expectGET('menusections').respond(sampleMenusections);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.menusections).toEqualData(sampleMenusections);
		}));

		it('$scope.findOne() should create an array with one Menusection object fetched from XHR using a menusectionId URL parameter', inject(function(Menusections) {
			// Define a sample Menusection object
			var sampleMenusection = new Menusections({
				name: 'New Menusection'
			});

			// Set the URL parameter
			$stateParams.menusectionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/menusections\/([0-9a-fA-F]{24})$/).respond(sampleMenusection);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.menusection).toEqualData(sampleMenusection);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Menusections) {
			// Create a sample Menusection object
			var sampleMenusectionPostData = new Menusections({
				name: 'New Menusection'
			});

			// Create a sample Menusection response
			var sampleMenusectionResponse = new Menusections({
				_id: '525cf20451979dea2c000001',
				name: 'New Menusection'
			});

			// Fixture mock form input values
			scope.name = 'New Menusection';

			// Set POST response
			$httpBackend.expectPOST('menusections', sampleMenusectionPostData).respond(sampleMenusectionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Menusection was created
			expect($location.path()).toBe('/menusections/' + sampleMenusectionResponse._id);
		}));

		it('$scope.update() should update a valid Menusection', inject(function(Menusections) {
			// Define a sample Menusection put data
			var sampleMenusectionPutData = new Menusections({
				_id: '525cf20451979dea2c000001',
				name: 'New Menusection'
			});

			// Mock Menusection in scope
			scope.menusection = sampleMenusectionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/menusections\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/menusections/' + sampleMenusectionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid menusectionId and remove the Menusection from the scope', inject(function(Menusections) {
			// Create new Menusection object
			var sampleMenusection = new Menusections({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Menusections array and include the Menusection
			scope.menusections = [sampleMenusection];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/menusections\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMenusection);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.menusections.length).toBe(0);
		}));
	});
}());