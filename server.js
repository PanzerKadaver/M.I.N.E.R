#!/bin/env node
//  OpenShift sample Node application
var express			= require('express');
var expressSession	= require('express-session');
var fs				= require('fs');
var passport		= require('passport');
var passportLocal	= require('passport-local');
var mongoose		= require('mongoose');
var flash			= require('connect-flash');
var bodyParser		= require('body-parser');


/**
 *  Define the application.
 */
var MinerApp = function() {

	//  Scope.
	var self = this;


	/*  ================================================================  */
	/*  Helper functions.												 */
	/*  ================================================================  */

	/**
	 *  Set up server IP address and port # using env variables/defaults.
	 */
	self.setupVariables = function() {
		require('./miner-server/init/setupVariables')(self);
	};


	/**
	 *  Populate the cache.
	 */
	self.populateCache = function() {
		if (typeof self.zcache === "undefined") {
			self.zcache = { 'index.html': '' };
		}

		//  Local cache for static content.
		self.zcache['index.html'] = fs.readFileSync('./index.html');
	};

	/**
	 * DEV FUNCTION
	 */
	self.rCache = function() {
		self.populateCache();
	};


	/**
	 *  Retrieve entry (content) from cache.
	 *  @param {string} key  Key identifying content to retrieve from cache.
	 */
	self.cache_get = function(key) {
		return self.zcache[key];
	};


	/**
	 *  terminator === the termination handler
	 *  Terminate server on receipt of the specified signal.
	 *  @param {string} sig  Signal to terminate on.
	 */
	self.terminator = function(sig){
		if (typeof sig === "string") {
		   console.log('%s: Received %s - terminating M.I.N.E.R ...',
					   Date(Date.now()), sig);
		   process.exit(1);
		}
		console.log('%s: Node server stopped.', Date(Date.now()) );
	};


	/**
	 *  Setup termination handlers (for exit and a list of signals).
	 */
	self.setupTerminationHandlers = function(){
		//  Process on exit and signals.
		process.on('exit', function() { self.terminator(); });

		// Removed 'SIGPIPE' from the list - bugz 852598.
		['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
		 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
		].forEach(function(element, index, array) {
			process.on(element, function() { self.terminator(element); });
		});
	};


	/*  ================================================================  */
	/*  App server functions (main app logic here).					   */
	/*  ================================================================  */

	/**
	 *  Define statics folders
	 */
	 self.setupStatic = function() {
		require('./miner-server/init/setupStatic')(self);
	 };

	 self.setupMongo = function () {
		var options = {
			db: { native_parser: true },
			replset: {},
			server: { poolSize: 5 }
		};

	 	options.server.socketOptions = options.replset.socketOptions = { keepAlive: 1 };
	 	mongoose.connect(self.mongo.url, function (err) {
	 		if (err)
	 			throw err;
	 		else
	 			console.warn('Successfully connected to DB');
	 	});
	 };

	 self.setupPassport = function () {
	 	self.app.use(expressSession({
	 		resave: true,
	 		saveUninitialized: true,
	 		secret: self.secret
	 	}));
	 	self.app.use(flash());

	 	self.app.use(passport.initialize());
	 	self.app.use(passport.session());

	 	self.initPassport();
	 }

	 self.initPassport = function () {
	 	require("./miner-server/passport/init")(passport);
	 };

	/**
	 *  Create the routing table entries + handlers for the application.
	 */
	self.createRoutes = function() {
		require('./miner-server/routes')(self, passport);
	};


	/**
	 *  Initialize the server (express) and create the routes and register
	 *  the handlers.
	 */
	self.initializeServer = function() {
		self.app = express();

		self.app.use(bodyParser.urlencoded({ extended: true }));

		// Add statics folders
		self.setupStatic();

		// Engage connection to db
		self.setupMongo();

		// Init PassportJS
		self.setupPassport();

		// Create routes
		self.createRoutes();

		//  Add handlers for the app (from the routes).
		for (var r in self.routes) {
			self.app.get(r, self.routes[r]);
		}
		for (var r in self.post) {
			self.app.post(r, self.post[r]);
		}		
	};


	/**
	 *  Initializes the application.
	 */
	self.initialize = function() {
		self.setupVariables();
		self.populateCache();
		self.setupTerminationHandlers();

		// Create the express server and routes.
		self.initializeServer();
	};


	/**
	 *  Start the server (starts up the application).
	 */
	self.start = function() {
		//  Start the app on the specific interface (and port).
		self.app.listen(self.port, self.ipaddress, function() {
			console.log('%s: Node server started on %s:%d ...',
						Date(Date.now() ), self.ipaddress, self.port);
		});
	};

};   /*  Miner Application.  */



/**
 *  main():  Main code.
 */
var zapp = new MinerApp();
zapp.initialize();
zapp.start();

