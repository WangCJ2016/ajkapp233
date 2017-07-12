angular.module('light-controller', [])
.controller('lightCtrl',function($scope,$rootScope,$stateParams,$rootScope,ApiService,$state,$timeout){
$scope.goback = function(){
  $rootScope.$ionicGoBack();
}
  //跳转彩灯
	$scope.goColorLight = function(){
		$state.go('colorPicker');
	};
   //获取情景模式
	ApiService.queryHostScenes({serverId:sessionStorage.getItem('serverId')}).success(function(res){
		$scope.models = res.dataObject;
		$scope.models.map(function(model){
			model.bgSelect = false;
		});
	});
	var data = {
		deviceType:'SWITCH',
		ip:sessionStorage.getItem('ip')
	};
   //获取主机路线
   function getways(){
     ApiService.ctrlHostDeviceByType(data)
      .success(function(res){
        console.log(res);
     if(res.success){
       $scope.lights=[];
       for(var i=0;i<res.dataObject.length;i++){
         $scope.lights = $scope.lights.concat(res.dataObject[i].ways);
       }
       $scope.lights = $scope.lights.filter(function(light,index){
         return light.name.indexOf('灯')>-1;
       });
     }
   })
   }
   getways();
       //灯控制
		$scope.lightCtrl = function(light){
			console.log(light);
			var status = light.status=='ON'?"CLOSE":'OPEN';
			light.status=light.status=='ON'?"OFF":'ON';
			var data = {
				houseId:sessionStorage.getItem('houseId'),
				port:sessionStorage.getItem('port'),
				deviceType:'SWITCH',
				serverId:sessionStorage.getItem('serverId'),
				actionType:status,
				wayId:light.wayId,
				brightness:90
			};
			console.log(data);
			ApiService.smartHostControl(data).success(function(res){});
		};
       //模式控制
		$scope.modelCtrl = function(type){
			var model = $scope.models.filter(function(model){
				return  model.name == type;
			});
			var ds='';
			switch(type){
			case 'homeon':
				ds='yellow';
				$scope.red=false;
				break;
			case 'homeoff':
				ds = 'red';
				$scope.yellow=false;
				break;
			case 'ledon':
				ds = 'blue';
				$scope.green=false;
				break;
			case 'ledoff':
				ds = 'green';
				$scope.blue=false;
				break;
			}
			console.log(ds,type,model);
			var data = {
				houseId:sessionStorage.getItem('houseId'),
				deviceType:'SCENE',
				port:sessionStorage.getItem('port'),
				serverId:sessionStorage.getItem('serverId'),
				sceneId:model[0].sceneId
			};
			console.log(data);
			ApiService.smartHostControl(data).success(function(res){
				$scope[ds] = !$scope[ds];
        $timeout(function(){
          alert('msg');
          getways()
        },10000)
			});
		};

});
