var LocalStrategy = require('passport-local').Strategy;
var Convict = require('../models/Convict');
var bCrypt = require('bcrypt-nodejs');

var createHash = function (password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

var createCollar = function () {
	var collar = "";
	var possibleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var possibleNumbers = "0123456789";
	var request;

	collar += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length));
	collar += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length));
	collar += possibleNumbers.charAt(Math.floor(Math.random() * possibleNumbers.length));
	collar += '—';
	collar += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length));
	collar += possibleNumbers.charAt(Math.floor(Math.random() * possibleNumbers.length));
	collar += possibleNumbers.charAt(Math.floor(Math.random() * possibleNumbers.length));

	return collar;
}

module.exports = function (passport) {

	passport.use('signup', new LocalStrategy({
		passReqToCallback: true
	}, function (req, username, password, done) {
		Convict.findOne({ $or: [ { 'username' : username }, { 'email' : req.param('email') } ] }, function (err, convict) {
			
			if (err) {
				console.log('Error in signup : <' + err + '>');
				return done(err, null, 101);
			}

			if (convict) {
				if (convict.username == username) {
					console.log('User <' + convict + '> already exist');
					return done(null, false, "User already exist");
				}
				else {
					console.log('Email address <' + req.param('email') + '> already used');
					return done(null, false, "Email address already used");
				}
			}
			else {
				var newConvict = new Convict();

				newConvict.username = username;
				newConvict.password = createHash(password);
				newConvict.email = req.param('email');
				newConvict.collar = createCollar();
				newConvict.welcome = false;

				newConvict.save(function (err) {
					if (err) {
						console.log('Unable to save new user <' + username + '> : ' + err);
						return done(err, null, 102);
					}

					console.log('Registration of user <' + username + '> was a success');
					return done(null, newConvict, "Registration was success. You can now login.");
				});
			}
		});
	}));
};