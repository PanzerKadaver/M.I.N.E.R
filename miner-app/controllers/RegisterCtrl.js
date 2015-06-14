MinerControllers.controller('RegisterCtrl', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {
	$scope.newUser = {
		username: "",
		password: "",
		email: ""
	};
	$scope.status = 0;
	$scope.response = "";

	$scope.submitRegister = function () {
		if ($scope.newUser.username != "" && $scope.newUser.password != "" && $scope.newUser.email != "") {
			var promise = $http.post('/signup', $scope.newUser);

			promise.then(function (resolve) {
				console.log(resolve);
			}, function (reject) {
				console.log(reject);
			});
		}
	}
}]);