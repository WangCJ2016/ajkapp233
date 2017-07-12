angular.module('tv-controller', [])
.controller('tvCtrl',['$scope', 'ApiService', '$rootScope', '$stateParams', function($scope,ApiService,$rootScope,$stateParams){
	$scope.goback = function(){
	  $rootScope.$ionicGoBack();
	}
	// var data = {
	// 	ip : sessionStorage.getItem('ip'),
	// 	deviceType : 'VIRTUAL_TV_DVD_REMOTE'
	// };
	// ApiService.ctrlHostDeviceByType(data).success(function(res){
	// 	$scope.tvBox = res.dataObject.filter(function(data){
	// 		return data.name.indexOf('机顶盒')>-1;
	// 	});
	// 	$scope.tv = res.dataObject.filter(function(data){
	// 		return data.name.indexOf('电视机')>-1;
	// 	});
  //   //电视机开
	// 	$scope.tvOn = function(){
	// 		setOrder('ON',$scope.tv[0].deviceId);
	// 		var data = {
	// 			ip : sessionStorage.getItem('ip'),
	// 			deviceType : 'SOCKET'
	// 		};
  //     // ApiService.ctrlHostDeviceByType(data).success(function(res){
  //     //   var socket = res.dataObject.filter(function(data){
  //     //     return data.name.indexOf('电视插座')>-1
  //     //   })
  //     //
  //     // })
	// 	};
  //   //电视机关
	// 	$scope.tvOff = function(){
	// 		setOrder('OFF',$scope.tv[0].deviceId);
	// 	};
  //     //电视加
	// 	$scope.tvAdd = function(){
	// 		setOrder('VOL_PLUS', $scope.tv[0].deviceId);
	// 	};
  //      //电视减
	// 	$scope.tvMunis = function(){
	// 		setOrder('VOL_SUB', $scope.tv[0].deviceId);
	// 	};
  //      //机顶盒开
	// 	$scope.tvBoxOn = function(){
	// 		setOrder('ON',$scope.tvBox[0].deviceId);
	// 	};
  //      //机顶盒关
	// 	$scope.tvBoxOff = function(){
	// 		setOrder('OFF',$scope.tvBox[0].deviceId);
	// 	};
  //      //机顶盒静音
	// 	$scope.tvBoxMute = function(){
	// 		setOrder('MUTE',$scope.tvBox[0].deviceId);
	// 	};
  //      //机顶盒返回
	// 	$scope.tvBoxReturn = function(){
	// 		setOrder('RETURN',$scope.tvBox[0].deviceId);
	// 	};
  //      //机顶盒up
	// 	$scope.tvBoxUp = function(){
	// 		setOrder('UP',$scope.tvBox[0].deviceId);
	// 	};
  //      //机顶盒down
	// 	$scope.tvBoxDown = function(){
	// 		setOrder('DOWN',$scope.tvBox[0].deviceId);
	// 	};
  //      //机顶盒left
	// 	$scope.tvBoxLeft = function(){
	// 		setOrder('LEFT',$scope.tvBox[0].deviceId);
	// 	};
  //      //机顶盒right
	// 	$scope.tvBoxRight = function(){
	// 		setOrder('RIGHT',$scope.tvBox[0].deviceId);
	// 	};
  //      //机顶盒ok
	// 	$scope.tvBoxOk = function(){
	// 		setOrder('OK',$scope.tvBox[0].deviceId);
	// 	};
  //      //机顶盒right
	// 	$scope.tvBoxRight = function(){
	// 		setOrder('RIGHT',$scope.tvBox[0].deviceId);
	// 	};
  //      //机顶盒num
	// 	$scope.tvBoxNum = function(num){
	// 		setOrder(num,$scope.tvBox[0].deviceId);
	// 	};
	// 	function setOrder(key, deviceId) {
  // 				var data = {
  // 					houseId : sessionStorage.getItem('houseId'),
  // 					deviceType : 'VIRTUAL_TV_DVD_REMOTE',
  // 					deviceId : deviceId,
  // 					key : key,
	// 				port:sessionStorage.getItem('port'),
	// 				serverId:sessionStorage.getItem('serverId')
  // 				};
	// 		ApiService.smartHostControl(data).success(function(res){});
  // 			}
	// });
	var data = {
		ip : sessionStorage.getItem('ip'),
		deviceType : 'VIRTUAL_TV_DVD_REMOTE'
	};
	ApiService.ctrlHostDeviceByType(data).success(function(res){
		console.log(res);
		$scope.tvBox = res.dataObject.filter(function(data){
			return data.name.indexOf('机顶盒')>-1;
		});
		$scope.tv = res.dataObject.filter(function(data){
			return data.name.indexOf('电视机')>-1;
		});
			$scope.tvswitch = false;
		//电视机开
		$scope.tvon = function(){
			$scope.tvswitch = !$scope.tvswitch;
			if ($scope.tvswitch) {
				setOrder('ON',$scope.tv[0].deviceId);
			}else{
				setOrder('OFF',$scope.tv[0].deviceId);
			}

			var data = {
				ip : sessionStorage.getItem('ip'),
				deviceType : 'SOCKET'
			};
			// ApiService.ctrlHostDeviceByType(data).success(function(res){
			//   var socket = res.dataObject.filter(function(data){
			//     return data.name.indexOf('电视插座')>-1
			//   })
			//
			// })
		};

			//电视加
		$scope.tvAdd = function(){
			setOrder('VOL_PLUS', $scope.tv[0].deviceId);
		};
			 //电视减
		$scope.tvMunis = function(){
			setOrder('VOL_SUB', $scope.tv[0].deviceId);
		};
			 //机顶盒开
		$scope.tvboxswitch = false;
		$scope.tvBoxOn = function(){
			$scope.tvboxswitch = !$scope.tvboxswitch;
			console.log($scope.tvboxswitch);
			if($scope.tvboxswitch){
			setOrder('ON',$scope.tvBox[0].deviceId)
		}else{
			setOrder('OFF',$scope.tvBox[0].deviceId);
		}
		};

			 //机顶盒静音
		$scope.tvBoxMute = function(){
			setOrder('MUTE',$scope.tvBox[0].deviceId);
		};
			 //机顶盒返回
		$scope.tvBoxReturn = function(){
			setOrder('RETURN',$scope.tvBox[0].deviceId);
		};
			 //机顶盒up
		$scope.tvBoxUp = function(){
			setOrder('UP',$scope.tvBox[0].deviceId);
		};
			 //机顶盒down
		$scope.tvBoxDown = function(){
			setOrder('DOWN',$scope.tvBox[0].deviceId);
		};
			 //机顶盒left
		$scope.tvBoxLeft = function(){
			setOrder('LEFT',$scope.tvBox[0].deviceId);
		};
			 //机顶盒right
		$scope.tvBoxRight = function(){
			setOrder('RIGHT',$scope.tvBox[0].deviceId);
		};
			 //机顶盒ok
		$scope.tvBoxOk = function(){
			setOrder('OK',$scope.tvBox[0].deviceId);
		};
			 //机顶盒right
		$scope.tvBoxRight = function(){
			setOrder('RIGHT',$scope.tvBox[0].deviceId);
		};
			 //机顶盒num
		$scope.tvBoxNum = function(num){
			setOrder(num,$scope.tvBox[0].deviceId);
		};
		function setOrder(key, deviceId) {
					var data = {
						houseId : sessionStorage.getItem('houseId'),
						deviceType : 'VIRTUAL_TV_DVD_REMOTE',
						deviceId : deviceId,
						key : key,
					port:sessionStorage.getItem('port'),
					serverId:sessionStorage.getItem('serverId')
					};
			ApiService.smartHostControl(data).success(function(res){console.log(res);});
				}
	});

	$scope.tvon = function(){
		$scope.tvswitch = !$scope.tvswitch;
	}
}]);
