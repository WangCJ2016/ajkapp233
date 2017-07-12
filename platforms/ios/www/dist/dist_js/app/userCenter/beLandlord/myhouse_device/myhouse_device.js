angular.module('myHouseDevice-controller', [])
	.controller('myHouseDeviceCtrl', ['$scope', '$rootScope', '$stateParams', function($scope,$rootScope,$stateParams) {
		$scope.assorts = $stateParams.mess;
		$scope.assorts = $scope.assorts.split(',');
		$scope.back = function(){
			$rootScope.$ionicGoBack();
		};
	}]);
