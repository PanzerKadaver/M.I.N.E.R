MinerControllers.controller('RootCtrl', ['$rootScope', '$scope', '$state', '$http', '$timeout', function ($rootScope, $scope, $state, $http, $timeout) {
	$scope.version = "0.0.6";
	$scope.ghostSwitch = false;
	
	$rootScope.rootPending = false;
	$rootScope.currentUser = null;
	$rootScope.lastAuth = false;

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
		else if (toState.data.auth == true) {
			if ($rootScope.currentUser == null) {
				event.preventDefault();
				$state.go('connect');
			}
			else if ($rootScope.lastAuth == false) {
				console.log($rootScope.currentUser);
				event.preventDefault();
				$rootScope.rootPending = true;

				var promise = $http.post('/auth', {id: $rootScope.currentUser._id });

				promise.then(function (resolve) {
					$rootScope.lastAuth = true;
					$timeout(function ($scope, $state) {
						$rootScope.rootPending = false;
						$state.go(toState.name);
					}, 200, true, $scope, $state);
				}, function (reject) {
					$state.go(connect);
					$rootScope.rootPending = false;
				});
			}
			else {
				$rootScope.lastAuth = false;
			}
		}
	});
}]);