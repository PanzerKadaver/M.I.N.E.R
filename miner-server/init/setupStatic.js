var express = require('express');

/**
 *  Define statics folders
 */

module.exports = function (self) {
	self.app.use('/lib', express.static('miner-app/libraries'));
	self.app.use('/js', express.static('miner-app/scripts'));
	self.app.use('/ctrl', express.static('miner-app/controllers'));
	self.app.use('/svc', express.static('miner-app/services'));
	self.app.use('/css', express.static('miner-app/styles'));
	self.app.use('/img', express.static('miner-app/images'));
	self.app.use('/aud', express.static('miner-app/audio'));
	self.app.use('/view', express.static('miner-app/views'));	
};