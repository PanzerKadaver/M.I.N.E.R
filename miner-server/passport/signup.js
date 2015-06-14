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
		Convict.findOne({ 'username' : username }, function (err, convict) {
			
			if (err) {
				console.log('Error in signup : <' + err + '>');
				return done(err);
			}

			if (convict) {
				console.log('User <' + convict + '> already exist');
				return done(null, false, "Already exist");
			}
			else {
				var newConvict = new Convict();

				newConvict.username = username;
				newConvict.password = createHash(password);
				newConvict.email = req.param('email');
				newConvict.gender = req.param('gender');
				newConvict.collar = createCollar();

				newConvict.save(function (err) {
					if (err) {
						console.log('Unable to save new user <' + username + '> : ' + err);
						return done(err);
					}

					console.log('Registration of user <' + username + '> was a success');
					return done(null, newConvict);
				});
			}
		});
	}));
};