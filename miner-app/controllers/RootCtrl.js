MinerControllers.controller('RootCtrl', ['$scope', function ($scope) {
	$scope.version = "0.0.3";

	$scope.switchSound = function() {
		var audio = document.getElementById('switchSound');
		audio.volume = 0.5;
		audio.play();
	}
}]);