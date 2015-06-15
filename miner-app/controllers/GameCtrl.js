MinerControllers.controller('GameCtrl', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {
	if (!$rootScope.currentUser.welcome)
		$state.go('game.welcome');
	else
		$state.go('game.main');
}]);