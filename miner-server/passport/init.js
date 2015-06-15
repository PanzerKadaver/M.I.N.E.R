var login = require('./login');
var signup = require('./signup');

var Convict = require('../models/Convict');

module.exports = function (passport) {

	passport.serializeUser(function (convict, done) {
		done(null, convict._id);
	});

	passport.deserializeUser(function (id, done) {
		Convict.findById(id, function (err, convict) {
			done(err, convict);
		});
	});

	login(passport);
	signup(passport);
};