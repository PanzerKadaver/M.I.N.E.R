var login = require('./login');
var signup = require('./signup');

var Convict = require('../models/Convict');

module.exports = function (passport) {

	passport.serializeUser(function (convict, done) {
		console.log('serializing user : ' + convict);
		done(null, convict._id);
	});

	passport.deserializeUser(function (id, done) {
		Convict.findById(id, function (err, convict) {
			console.log('deserializing user : ' + convict);
			done(err, convict);
		});
	});

	login(passport);
	signup(passport);
};