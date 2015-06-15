var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.status(401).send();
};

module.exports = function (self, passport) {
	self.routes = { };
	self.post = { };
		
	self.routes['/'] = function (req, res) {
		res.setHeader('Content-Type', 'text/html');
		self.rCache();
		res.send(self.cache_get('index.html') );
	};

	self.app.post('/auth', isAuthenticated, function (req, res, next) {
		if (req.user._id == req.param('id'))
			res.status(200).send();
		else
			res.status(401).send();
	});

	self.post['/connect'] = function (req, res, next) {
		passport.authenticate('login', function (err, user, info) {
			if (err)
				res.status(500).send({err: info, message: "Database error, please contact administrator with the following code : "});
			else if (user == false)
				res.status(info).send();
			else {
				req.login(user, function (err) {
					if (err) {
						console.log(err);
						res.status(500).send({err: 202, message: "Connection error, please contact administrator with the following code : "})
					}
					var currentUser = user;

					currentUser.password = null;
					currentUser.email = null;

					res.status(200).send({currentUser: currentUser });
				});
			}
		})(req, res, next);
	};

	self.post['/signup'] = function (req, res, next) {
		passport.authenticate('signup', function (err, user, info) {
			if (err)
				res.status(500).send({err: info, message: "Database error, please contact administrator with the following code : "});
			else if (user == false)
				res.status(401).send({message: info});
			else
				res.status(200).send({message: info});
		})(req, res, next);
	};
};