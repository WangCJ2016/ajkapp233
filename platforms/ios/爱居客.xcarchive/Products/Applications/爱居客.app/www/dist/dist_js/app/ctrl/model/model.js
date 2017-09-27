angular.module('model-controller', [])
.controller('modelCtrl',['$scope', '$rootScope', '$stateParams', 'ApiService', function($scope,$rootScope,$stateParams,ApiService){
	$scope.goback = function(){
	  $rootScope.$ionicGoBack();
	}
  $scope.modelArray = ['起床','睡眠','阅读','外出','影视','迎宾'];
	ApiService.queryHostScenes({serverId:sessionStorage.getItem('serverId')}).success(function(res){
		if(res.success){
			console.log(res)
			var models = res.dataObject
			$scope.modelCtrl = function(type,index){
				$scope.index=index;
				var model = models.filter(function(model,index){
					return   model.name == '情景' + type;
				});
				console.log(model)
				var data = {
					houseId:sessionStorage.getItem('houseId'),
					deviceType:'SCENE',
					port:sessionStorage.getItem('port'),
					serverId:sessionStorage.getItem('serverId'),
					sceneId:model[0].sceneId
				};
				ApiService.smartHostControl(data).success(function(res){
					console.log(res)
				});
			};
		}
	});
}]);
