MinerApp.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/start');

	$stateProvider
		.state('start', {
			url: '/start',
			templateUrl: '/view/start.html'
		})
		.state('register', {
			url: '/register',
			templateUrl: '/view/register.html',
			controller: 'RegisterCtrl'
		});
});