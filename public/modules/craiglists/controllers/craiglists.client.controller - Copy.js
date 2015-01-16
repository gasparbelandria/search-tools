'use strict';

// Craiglists controller
angular.module('craiglists').controller('CraiglistsController', ['$element', '$resource', '$http', '$scope', '$stateParams', '$location', 'Authentication', 'Craiglists',
	function($element, $resource, $http, $scope, $stateParams, $location, Authentication, Craiglists ) {
		$scope.authentication = Authentication;

		// Find a list of Craiglists
		$scope.find = function() {
			/*
			$http.jsonp('http://opentable.herokuapp.com/api/restaurants', {
				method:'JSONP',
				headers: {
	                'Access-Control-Allow-Origin': 'http://localhost:3000',
	                'Access-Control-Allow-Methods': 'GET',
	                'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
				},
				params: { 
					city: 'boston',
					callback : 'JSON_CALLBACK'
				}
			}).success(function(data) { 
				$scope.craiglists = data.restaurants;
			}).error(function(d){ 
				console.log( 'nope' ); 
			});
			//
			$http.jsonp('http://opentable.herokuapp.com/api/cities', {
				method:'JSONP',
				headers: {
	                'Access-Control-Allow-Origin': 'http://localhost:3000',
	                'Access-Control-Allow-Methods': 'GET',
	                'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
				},
				params: { 
					callback : 'JSON_CALLBACK'
				}				
			}).success(function(data) { 
				$scope.cities = data.cities;
			}).error(function(d){ 
				console.log( 'nope' ); 
			});
			*/
		};

		$scope.scrap = function() {
			var craiglists = new Craiglists ({
				city: this.name,
				search: this.address
			});

			console.log(craiglists);

			/*
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
]);