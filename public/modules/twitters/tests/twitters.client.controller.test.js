'use strict';

(function() {
	// Twitters Controller Spec
	describe('Twitters Controller Tests', function() {
		// Initialize global variables
		var TwittersController,
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

			// Initialize the Twitters controller.
			TwittersController = $controller('TwittersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Twitter object fetched from XHR', inject(function(Twitters) {
			// Create sample Twitter using the Twitters service
			var sampleTwitter = new Twitters({
				name: 'New Twitter'
			});

			// Create a sample Twitters array that includes the new Twitter
			var sampleTwitters = [sampleTwitter];

			// Set GET response
			$httpBackend.expectGET('twitters').respond(sampleTwitters);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.twitters).toEqualData(sampleTwitters);
		}));

		it('$scope.findOne() should create an array with one Twitter object fetched from XHR using a twitterId URL parameter', inject(function(Twitters) {
			// Define a sample Twitter object
			var sampleTwitter = new Twitters({
				name: 'New Twitter'
			});

			// Set the URL parameter
			$stateParams.twitterId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/twitters\/([0-9a-fA-F]{24})$/).respond(sampleTwitter);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.twitter).toEqualData(sampleTwitter);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Twitters) {
			// Create a sample Twitter object
			var sampleTwitterPostData = new Twitters({
				name: 'New Twitter'
			});

			// Create a sample Twitter response
			var sampleTwitterResponse = new Twitters({
				_id: '525cf20451979dea2c000001',
				name: 'New Twitter'
			});

			// Fixture mock form input values
			scope.name = 'New Twitter';

			// Set POST response
			$httpBackend.expectPOST('twitters', sampleTwitterPostData).respond(sampleTwitterResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Twitter was created
			expect($location.path()).toBe('/twitters/' + sampleTwitterResponse._id);
		}));

		it('$scope.update() should update a valid Twitter', inject(function(Twitters) {
			// Define a sample Twitter put data
			var sampleTwitterPutData = new Twitters({
				_id: '525cf20451979dea2c000001',
				name: 'New Twitter'
			});

			// Mock Twitter in scope
			scope.twitter = sampleTwitterPutData;

			// Set PUT response
			$httpBackend.expectPUT(/twitters\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/twitters/' + sampleTwitterPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid twitterId and remove the Twitter from the scope', inject(function(Twitters) {
			// Create new Twitter object
			var sampleTwitter = new Twitters({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Twitters array and include the Twitter
			scope.twitters = [sampleTwitter];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/twitters\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTwitter);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.twitters.length).toBe(0);
		}));
	});
}());