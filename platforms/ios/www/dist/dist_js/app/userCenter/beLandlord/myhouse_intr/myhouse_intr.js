angular.module('myHouseIntr-controller', [])
	.controller('myhouseIntrCtrl', ['$scope', 'ApiService', 'house', '$state', '$stateParams', function($scope, ApiService, house, $state, $stateParams) {

		$scope.house = house.data.dataObject;
		$scope.myhouseDevice = function() {
			$state.go('myhouseDevice', {
				mess: $scope.house.assort
			});
		};
		$scope.goback = function() {
			$state.go('myhouseDetail', {
				id: sessionStorage.getItem('hotelId')
			});
		};
	}]);
