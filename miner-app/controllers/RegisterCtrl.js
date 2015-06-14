MinerControllers.controller('RegisterCtrl', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {
	$scope.newUser = {
		username: "",
		password: "",
		email: ""
	};
	$scope.status = 0;
	$scope.response = "";

	$scope.submitRegister = function () {
		$scope.status = 1;
		$scope.response = "";
		if ($scope.newUser.username != "" && $scope.newUser.password != "" && $scope.newUser.email != "") {
			var promise = $http.post('/signup', $scope.newUser);

			promise.then(function (resolve) {
				$scope.status = 2;
				$scope.response = resolve.data.message;
			}, function (reject) {
				$scope.status = 3;
				$scope.response = reject.data.message;
				if (reject.status == 500)
					$scope.response += reject.data.err;
			});
		}
	}
}]);