MinerControllers.controller('RootCtrl', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {
	$scope.version = "0.0.4";
	$scope.ghostSwitch = false;
	$scope.currentUser = {};

	$scope.switchSound = function() {
		var audio = document.getElementById('switchSound');
		audio.volume = 0.5;
		audio.play();
	}

	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		//console.log(event, toState, toParams, fromState, fromParams, $scope.ghostSwitch);
		if (toState.name != "start" && $scope.ghostSwitch == false) {
			event.preventDefault();
			$state.go('start');
		}
	});
}]);