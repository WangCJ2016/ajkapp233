angular.module('airCondition-controller', [])
  .controller('airCtrl', ['$scope', 'ApiService', '$rootScope', '$stateParams', function($scope, ApiService,$rootScope,$stateParams) {
    $scope.goback = function() {
      $rootScope.$ionicGoBack();
    };
  var data = {
		ip: sessionStorage.getItem('ip'),
		deviceType: 'VIRTUAL_AIR_REMOTE'
	};
	ApiService.ctrlHostDeviceByType(data).success(function(res){
		if(res.success){
			var deviceId = res.dataObject[0].deviceId;
			var ways = res.dataObject[0].ways;
			var allKey = [],
				coolKey = [],
				warmKey = [],
				coolName, warmName;
			angular.forEach(ways, function(value) {
				allKey.push(value.remoteKey);
			});

			function numberOrder(a, b) {
				return a - b;
			}
			angular.forEach(allKey, function(value) {
				if (value.indexOf('COOL') != -1) {
					coolKey.push(+value.slice(-2));
					coolName = value.slice(0, -2);
				}
			});
			coolKey.sort(numberOrder);
			angular.forEach(allKey, function(value) {
				if (value.indexOf('WARM') != -1) {
					warmKey.push(+value.slice(-2));
					warmName = value.slice(0, -2);
				}
			});
			warmKey.sort(numberOrder);
			var modelKey = 'cool';
			$scope.model = '制冷';
			var arr = coolKey;
			var name = coolName;
			var index = 0;
           //改变模式
			$scope.changeModel = function() {
				if (modelKey == 'cool') {
					$scope.model = '制热';
					modelKey = 'warm';
					index = 0;
				} else {
					$scope.model = '制冷';
					modelKey = 'cool';
					index = 0;
				}
				arr = modelKey == 'cool' ? coolKey : warmKey;
				name = modelKey == 'cool' ? coolName : warmName;
				$scope.temp = arr[0];
			};
			$scope.temp = arr[0];
           //温度加
			$scope.tempAdd = function(){
				if (arr.length > 0) {
					if (index <= arr.length - 2) {
						index++;
						var data = {
							deviceId: deviceId,
							houseId: sessionStorage.getItem('houseId'),
							deviceType: 'VIRTUAL_AIR_REMOTE',
							port:sessionStorage.getItem('port'),
							serverId: sessionStorage.getItem('serverId'),
							key: name + arr[index]
						};
						var s = arr[index];
                       //$('.temp').html(s + "℃")
						$scope.temp = s;
						ApiService.smartHostControl(data);
					}
				}
			};
           //温度减
			$scope.tempReduce = function(){
				if (index <= arr.length && index >= 1) {
					index--;
					var data = {
						deviceId: deviceId,
						houseId: sessionStorage.getItem('houseId'),
						deviceType: 'VIRTUAL_AIR_REMOTE',
						port:sessionStorage.getItem('port'),
						serverId: sessionStorage.getItem('serverId'),
						key: name + arr[index]
					};
					var s = arr[index];
					$scope.temp = s;
					ApiService.smartHostControl(data);
				}
			};
               //关闭空调
			$scope.off = function() {
				var data = {
					deviceId: deviceId,
					houseId: sessionStorage.getItem('houseId'),
					deviceType: 'VIRTUAL_AIR_REMOTE',
					port:sessionStorage.getItem('port'),
					serverId: sessionStorage.getItem('serverId'),
					key: 'OFF'
				};
				ApiService.smartHostControl(data);
			};
		}else{
      $timeout(function() {
        $ionicLoading.hide();
      }, 1000);
    }
	});

}]);
