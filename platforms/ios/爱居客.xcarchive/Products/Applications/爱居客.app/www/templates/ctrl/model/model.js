angular.module('model-controller', [])
.controller('modelCtrl',function($scope,$rootScope,$stateParams,ApiService){
	$scope.goback = function(){
	  $rootScope.$ionicGoBack();
	}
  $scope.modelArray = ['morning','sleep','read','checkout','movie','meeting'];
	ApiService.queryHostScenes({serverId:sessionStorage.getItem('serverId')}).success(function(res){
		if(res.success){
			var models = res.dataObject;
			$scope.modelCtrl = function(type,index){
				$scope.index=index;
				var model = models.filter(function(model,index){
					return model.name == type;
				});
				var data = {
					houseId:sessionStorage.getItem('houseId'),
					deviceType:'SCENE',
					port:sessionStorage.getItem('port'),
					serverId:sessionStorage.getItem('serverId'),
					sceneId:model[0].sceneId
				};
				ApiService.smartHostControl(data).success(function(res){
				});
			};
		}
	});
});
