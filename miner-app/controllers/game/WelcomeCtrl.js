MinerControllers.controller('WelcomeCtrl', ['$rootScope', '$scope', '$state', '$http', function ($rootScope, $scope, $state, $http) {

	$scope.discardWelcome = function () {
		$rootScope.rootPending = true;

		var promise = $http.get('/welcome');

		promise.then(function (resolve) {
			$rootScope.currentUser.welcome = true;
			$rootScope.rootPending = false;
			$state.go('game.main');
		}, function (reject) {
			$rootScope.currentUser.welcome = false;
			$rootScope.rootPending = false;
		});
	};
}]);