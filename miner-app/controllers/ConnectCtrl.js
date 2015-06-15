MinerControllers.controller('ConnectCtrl', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {
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
			console.log(resolve);
			var auth = $http.get('/auth');

			auth.then(function (resolve) {
				console.log('resolve: ', resolve);
			}, function (reject) {
				console.log('reject', reject);
			});
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