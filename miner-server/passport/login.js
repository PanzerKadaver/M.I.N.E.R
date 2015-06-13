var LocalStrategy = require('passport-local').Strategy;
var Convict = require('../models/Convicts');
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
				return done(err);

			if (!convict) {
				console.log('User not found with username <' + convict + '>');
				return done(null, false, req.flash('message', 'Convict not found'));
			}

			if (!isValidPassword(convict, password)) {
				console.log('Invalid password for user <' + convict + '>');
				return done(null, false, req.flash('message', 'Invalid password'))
			}

			return done(null, convict);
		})
	}));
};