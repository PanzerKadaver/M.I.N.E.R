var mongoose = require('mongoose');

module.exports = mongoose.model('Convict', {
	username:	String,
	password:	String,
	email:		String,
	gender:		String,
	collar:		String
});