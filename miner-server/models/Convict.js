var mongoose = require('mongoose');

module.exports = mongoose.model('Convict', {
	username:	String,
	password:	String,
	email:		String,
	collar:		String,
	welcome:	Boolean
});