var Convict = require('../models/Convict');

module.exports = function (req, res, next) {
	Convict.findOne({ '_id' : req.user._id }, function (err, convict) {
		if (err)
			res.status(500).send({err: err});
		convict.welcome = true;
		convict.save(function (err) {
			if (err)
				res.status(500).send({err : err});
			res.status(200).send();
		});
	});
};