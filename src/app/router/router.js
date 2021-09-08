/**
 * angular 路由器
 **/
module.exports = [
	'$stateProvider',
	'$urlRouterProvider',
	'$httpProvider',
	'$locationProvider',
	function(
		$stateProvider,
		$urlRouterProvider,
		$httpProvider,
		$locationProvider
	) {
		var homeState = {
			name: 'home',
			url:'/home',
			//params : {a:'11', b:'88'},
			component: 'home'
		};

		var aboutState = {
			name: 'about',
			url: '/about',
			template: '<h3>Its the UI-Router hello world app!</h3>'
		};

		$stateProvider.state(homeState);
		$stateProvider.state(aboutState);
		$urlRouterProvider.otherwise('/');
     	$httpProvider.interceptors.push('factoryInterceptor');
	}
];
