MinerControllers.controller('ConnectCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$state', function ($rootScope, $scope, $http, $timeout, $state) {
	$scope.connectUser = {
		username: "",
		password: ""
	};
	$scope.status = 0;
	$scope.response = "";

	$scope.submitConnect = function () {
		$scope.status = 1;
		$scope.response = "";

		var promise = $http.post('/connect', $scope.connectUser);

		promise.then(function (resolve) {
			$scope.status = 2;
			$scope.response = "Authentification successfull";
			$rootScope.currentUser = resolve.data.currentUser;

			$timeout(function ($state) {
				$state.go('game');
			}, 500, true, $state);
		}, function (reject) {
			$scope.status = 3;
			if (reject.status == 401)
				$scope.response = "Password incorrect";
			if (reject.status == 404)
				$scope.response = "User doesn't exist";
			if (reject.status == 500)
				$scope.response = reject.data.message + reject.data.err;
		});
	};
}]);