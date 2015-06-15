var LocalStrategy = require('passport-local').Strategy;
var Convict = require('../models/Convict');
var bCrypt = require('bcrypt-nodejs');

var isValidPassword = function (user, password) {
	return bCrypt.compareSync(password, user.password);
}

module.exports = function (passport) {

	passport.use('login', new LocalStrategy({
		passReqToCallback : true
	}, function (req, username, password, done) {

		Convict.findOne({ 'username' : username }, function (err, convict) {
			if (err)
				return done(err, false, 201);

			if (!convict) {
				console.log('User not found with username <' + username + '>');
				return done(null, false, "404");
			}

			if (!isValidPassword(convict, password)) {
				console.log('Invalid password for user <' + username + '>');
				return done(null, false, "401");
			}

			return done(null, convict, "200");
		});
	}));
};