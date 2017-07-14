angular.module('curtain-controller', [])
.controller('curtainCtrl',function($scope,ApiService,$rootScope,$stateParams){
	$scope.goback = function() {
		$rootScope.$ionicGoBack();
	};
	$scope.brightness = {
		value1 :50,
		value2:50
	};
	var data = {
		ip: sessionStorage.getItem('ip'),
		deviceType: 'CURTAIN'
	};
	ApiService.ctrlHostDeviceByType(data).success(function(res){
		if(res.success){
			$scope.devices = res.dataObject;
			$scope.curtain = function(actionType){
				var wayId = $scope.devices[0].ways[0].wayId;
				var data = {
					houseId:sessionStorage.getItem('houseId'),
					deviceType:'CURTAIN',
					port:sessionStorage.getItem('port'),
					serverId:sessionStorage.getItem('serverId'),
					actionType:actionType,
					wayId:wayId,
					brightness:100
				};
				ApiService.smartHostControl(data).success(function(res){
				});
			};
			$scope.change = function(value,actionType){

			};
			$scope.changeSubmit = function(brightness){
				var wayId = $scope.devices[0].ways[0].wayId;
				var data = {
					houseId:sessionStorage.getItem('houseId'),
					deviceType:'CURTAIN',
					port:sessionStorage.getItem('port'),
					serverId:sessionStorage.getItem('serverId'),
					actionType:'OPEN',
					wayId:wayId,
					brightness:brightness
				};
				ApiService.smartHostControl(data).success(function(res){

				});
			};
		}
	});
});
