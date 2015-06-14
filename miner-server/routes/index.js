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
			if (err)
				res.status(500).send({err: info, message: "Database error, please contact administrator with the following code : "});
			else if (user == false)
				res.status(401).send({message: info});
			else
				res.status(200).send(({message: info}));
		})(req, res, next);
	};
};