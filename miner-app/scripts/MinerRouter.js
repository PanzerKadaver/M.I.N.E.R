MinerApp.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/start');

	$stateProvider
		.state('start', {
			url: '/start',
			templateUrl: '/view/start.html',
			data: { auth: false }
		})
		.state('register', {
			url: '/register',
			templateUrl: '/view/register.html',
			controller: 'RegisterCtrl',
			data: { auth: false }
		})
		.state('connect', {
			url: '/connect',
			templateUrl: '/view/connect.html',
			controller: 'ConnectCtrl',
			data: { auth: false }
		})
		.state('game', {
			url: '/game',
			templateUrl: '/view/game.html',
			controller: 'GameCtrl',
			data: { auth: true }
		})
			.state('game.welcome', {
				url: '/welcome',
				templateUrl: '/view/game/welcome.html',
				data: {auth: true }
			})
			.state('game.main', {
				url: '/main',
				templateUrl: '/view/game/main.html',
				data: {auth: true }
			});
});