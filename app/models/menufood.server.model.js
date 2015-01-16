'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Menufood Schema
 */
var MenufoodSchema = new Schema({
	restaurant: {
		type: Schema.ObjectId,
		required: 'Please select Restaurant name',		
		ref: 'Restaurant'
	},
	section: {
		type: Schema.ObjectId,
		required: 'Please select Section Menu name',		
		ref: 'Menufood'
	},
	name: {
		type: String,
		default: '',
		required: 'Please fill name',
		trim: true
	},
	item: {
		type: String,
		default: '',
		required: 'Please fill item',
		trim: true
	},
	price: {
		type: String,
		default: '',
		required: 'Please fill price',
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

mongoose.model('Menufood', MenufoodSchema);