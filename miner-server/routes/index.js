var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
};

module.exports = function (self, passport) {
	self.routes = { };
	self.post = { };
		
	self.routes['/'] = function (req, res) {
		res.setHeader('Content-Type', 'text/html');
		self.rCache();
		res.send(self.cache_get('index.html') );
	};

	self.post['/login'] = passport.authenticate('login', {
		successRedirect: '/welcome',
		failureRedirect: '/failure',
		failureFlash: true
	});



	self.post['/signup'] = function (req, res, next) {
		passport.authenticate('signup', function (err, user, info) {
			console.log(err, user, info);
		})(req, res, next);
	};
};