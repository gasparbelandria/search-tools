'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	http = require('http'),
	mongoose = require('mongoose');

var util = require('util'),
    twitter = require('twitter');
var twit = new twitter({
    consumer_key: 'pi8xEgc4qp9WFZQFWF4gg',
    consumer_secret: 'NhghLa5q3QB3coYVLiOwwXP2onZxitJuzY4tyhD8A',
    access_token_key: '48748677-z0tOAcOgOrwoaYYq7DY6IyV9k8MzAzhEvN1kMiv2Y',
    access_token_secret: 'rmH7DNLhFqu93FdJBanzpyT96BXqeZYff1JnFvNU'
});

/*
twit.stream('statuses/sample', function(stream) {
    stream.on('data', function(data) {
        console.log(util.inspect(data));
    });
});
*/

/*
var count = 0;
twit.stream('filter', {track:'angularjs'}, function(stream) {
//twit.stream('statuses/sample', {track:'angularjs'}, function(stream) {
    stream.on('data', function(data) {
        console.log(util.inspect(data));
        //console.log('\n\n' + data);
        //stream.destroy();
        //process.exit(0);
    });
});
*/


/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error('\x1b[31m', 'Could not connect to MongoDB!');
		console.log(err);
	}
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);





/*

-- LANGUAGES

var url = 'http://api.feedzilla.com/v1/cultures.json';
http.get(url, function(res) {
    var body = '';
    res.on('data', function(chunk) {
        body += chunk;
    });
    res.on('end', function() {
        var fbResponse = JSON.parse(body);
        //console.log(fbResponse);
    });
}).on('error', function(e) {
      //console.log('Got error: ' + e);
});
*/