'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Restaurant Schema
 */
var RestaurantSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Restaurant name',
		trim: true
	},
	address: {
		type: String,
		default: '',
		required: 'Please fill Restaurant address',
		trim: true
	},
	street: {
		type: String,
		default: '',
		required: 'Please fill Restaurant street',
		trim: true
	},
	zipcode: {
		type: String,
		default: '',
		required: 'Please fill Restaurant zipcode',
		trim: true
	},
	phone: {
		type: String,
		default: '',
		required: 'Please fill Restaurant phone',
		trim: true
	},
	email: {
		type: String,
		default: '',
		required: 'Please fill Restaurant email',
		trim: true
	},
	cusine: {
		type: String,
		default: '',
		required: 'Please select Restaurant cusine',
		trim: true
	},
	open: {
		type: String,
		default: '',
		required: 'Please fill when Restaurant is opened',
		trim: true
	},
	close: {
		type: String,
		default: '',
		required: 'Please fill when Restaurant is closed',
		trim: true
	},
	picture_url: {
		type: String,
		default: '',
		required: 'Please fill Restaurant picture',
		trim: true
	},
	website: {
		type: String,
		default: '',
		required: 'Please fill Restaurant website',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Restaurant', RestaurantSchema);