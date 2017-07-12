angular.module('selectDate.controllers', [])
	.controller('selectDateCtrl', function($scope,$rootScope,$stateParams,roomPrice) {
		$scope.changedate = [];
		if (roomPrice.data.success == true) {
			roomPrice.data.dataObject.forEach(function(month) {

				$scope.changedate.push(month);
			});

		}
		$scope.defaultPrice = $stateParams.data.defaultPrice
		console.log($stateParams);
		$scope.back = function(){
			$rootScope.$ionicGoBack();
		};
	});
