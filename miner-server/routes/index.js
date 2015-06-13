
var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = function (self, passport) {
	self.routes = { };
		
	self.routes['/'] = function(req, res) {
		res.setHeader('Content-Type', 'text/html');
		self.rCache();
		res.send(self.cache_get('index.html') );
	};
}