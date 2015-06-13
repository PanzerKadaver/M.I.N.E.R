var mongoose = require('mongoose');

module.export = mongoose.model('Convicts', {
	username:	String,
	password:	String,
	email:		String,
	gender:		String,
	collar:		String
});