/**
 *  Set up server IP address and port # using env variables/defaults.
 */
 
module.exports = function (self) {
	//  Set the environment variables we need.
	self.ipaddress	= process.env.OPENSHIFT_NODEJS_IP;
	self.port		= process.env.OPENSHIFT_NODEJS_PORT;
	self.mongo		= {
		user:	process.env.OPENSHIFT_MONGODB_DB_USERNAME,
		pass:	process.env.OPENSHIFT_MONGODB_DB_PASSWORD,
		host:	process.env.OPENSHIFT_MONGODB_DB_HOST,
		port:	process.env.OPENSHIFT_MONGODB_DB_PORT,
		db:		process.env.OPENSHIFT_MONGODB_DB_NAME,
		url:	""
	};

	if (typeof self.ipaddress === "undefined") {
		console.warn('No OPENSHIFT_NODEJS_PORT var, using 3300');
		self.port = 3300;
	}

	if (typeof self.ipaddress === "undefined") {
		//  Log errors on OpenShift but continue w/ 127.0.0.1 - this
		//  allows us to run/test the app locally.
		console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
		self.ipaddress = "127.0.0.1";
	}

	if (typeof self.mongo.user === "undefined") {
		console.warn('No OPENSHIFT_MONGODB_DB_USERNAME var, using admin-local');
		self.mongo.user = "admin-local";
	}

	if (typeof self.mongo.pass === "undefined") {
		console.warn('No OPENSHIFT_MONGODB_DB_PASSWORD var, using azertyu*1');
		self.mongo.pass = "azertyu*1";
	}

	if (typeof self.mongo.host === "undefined") {
		console.warn('No OPENSHIFT_MONGODB_DB_HOST var, using 127.0.0.1');
		self.mongo.host = "127.0.0.1";
	}

	if (typeof self.mongo.port === "undefined") {
		console.warn('No OPENSHIFT_MONGODB_DB_PORT var, using 27017');
		self.mongo.port = 27017;
	}

	if (typeof self.mongo.db === "undefined") {
		console.warn('No OPENSHIFT_MONGODB_DB_NAME var, using miner-local');
		self.mongo.db = "miner-local";
	}

	self.mongo.url = "mongo://" + self.mongo.user + ":" + self.mongo.pass + "@" + self.mongo.host + ":" + self.mongo.port + "/" + self.mongo.db;
};