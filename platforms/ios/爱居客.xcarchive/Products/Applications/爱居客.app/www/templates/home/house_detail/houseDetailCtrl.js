angular.module('houseDetail-controller', [])
  .controller('houseDetailCtrl', function($scope,$rootScope,$ionicHistory,AJKIp,DuplicateLogin,$ionicNativeTransitions,$location, $ionicScrollDelegate, $ionicGesture, $ionicViewSwitcher, $ionicLoading, $timeout, $ionicActionSheet, $stateParams, $ionicBackdrop, ApiService, $state, hotelPics, $ionicPopup, $timeout) {
	$ionicLoading.show({
		template: '<ion-spinner icon="ios"></ion-spinner>'
	});




	$scope.switch = true;
    //返回
	$scope.goHome = function() {
    //console.log($ionicHistory.viewHistory().backView.stateName);
    var views = $ionicHistory.viewHistory().views;

    var backView = ''
    for (var i in views) {
      console.log(views[i].stateName);
      if(views[i].stateName=='tab.home'||views[i].stateName=="myCollect"||views[i].stateName=='nearby'){
        backView = views[i].stateName;
      }
    }
    $ionicNativeTransitions.stateGo(backView, {}, {}, {
    "type": "slide",
    "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
});

	};

    //酒店详细信息

	ApiService.getHotelDetail({
		hotelId: $stateParams.id,
		customerId:localStorage.getItem('customerId')|| '-1'
	}).success(function(res) {
		console.log(res);
		if (res.success) {
			$ionicLoading.hide();
        //名字
			var hotelDetail = res.dataObject;
			$scope.name = hotelDetail.name;
        //图片数量
			$scope.picsLength = hotelDetail.pictures.length;
        //评价星星
			$scope.stars = [];
			$scope.stars.length = hotelDetail.stars||5;
			$scope.star_blank = [];
			$scope.star_blank.length = 5 - $scope.stars.length;
        //评价数量
			$scope.feedbackCount = hotelDetail.feedbackCount;
        //评价内容
			$scope.feedback = hotelDetail.feedback;
        //酒店地址
			$scope.detailAddress = hotelDetail.detailAddress;
			$scope.address = hotelDetail.address;
        //交易规则详情
			$scope.dealRule = hotelDetail.dealRule;
        //酒店简介
			$scope.profiles = hotelDetail.profiles;
			$scope.profiles = $scope.profiles.slice(0,150)+'...';
        //图片相册
        //是否收藏
			$scope.whetherCollect = hotelDetail.whetherCollect;
			hotelPics.pics = hotelDetail.pictures;
			$scope.pic = hotelDetail.pictures[0].pictures.split(',')[0];
      //酒店押金
      $scope.yajin = hotelDetail.price;
        //地图
			var map, geolocation;
        //加载地图，调用浏览器定位服务
			map = new AMap.Map('map', {
				resizeEnable: true,
				dragEnable: false
			});

			function geocoder() {
				var geocoder = new AMap.Geocoder({

				});
          //地理编码,返回地理编码结果

				geocoder.getLocation($scope.address, function(status, result) {
					if (status === 'complete' && result.info === 'OK') {

						geocoder_CallBack(result);
					}
				});
			}
			geocoder();
        //加入点标记
			function addMarker(i, d) {
        console.log(i,d);
				var marker = new AMap.Marker({
					map: map,
					position: [d.location.getLng(), d.location.getLat()]
				});
			}
        //地理编码返回结果展示
			function geocoder_CallBack(data) {
				var resultStr = "";
          //地理编码结果数组
				var geocode = data.geocodes;
				for (var i = 0; i < geocode.length; i++) {
            //拼接输出html
					resultStr += "<span style=\"font-size: 12px;padding:0px 0 4px 2px; border-bottom:1px solid #C1FFC1;\">" + "<b>地址</b>：" + geocode[i].formattedAddress + "" + "&nbsp;&nbsp;<b>的地理编码结果是:</b><b>&nbsp;&nbsp;&nbsp;&nbsp;坐标</b>：" + geocode[i].location.getLng() + ", " + geocode[i].location.getLat() + "" + "<b>&nbsp;&nbsp;&nbsp;&nbsp;匹配级别</b>：" + geocode[i].level + "</span>";
					addMarker(i, geocode[i]);
				}
				map.setFitView();
			}

        //酒店设施
			var assorts = hotelDetail.assorts;
			$scope.assorts = assorts.map(function(x) {
				index = x.indexOf('-');
				var name = x.slice(0, index);
				var src = x.slice(index + 1);
				return {
					'name':name,
					'src':src
				};
			});
			$scope.gohotelPics = function() {
				$state.go('hotelPics', {
					pics: hotelDetail.pictures,
					id: $stateParams.id
				});
				sessionStorage.setItem('currentId',$stateParams.id);
			};

        //微信风享
			$scope.share = function() {
				var hideSheet = $ionicActionSheet.show({
					buttons: [{
						text: '微信好友'
					}, {
						text: '朋友圈'
					}, ],
					cancelText: '取消',
					buttonClicked: function(index) {
						hideSheet();
						Wechat.share({
							message: {
								title: $scope.name,
								description: $scope.profiles,
								thumb: $scope.pic,
								media: {
									type: Wechat.Type.WEBPAGE,
									webpageUrl: AJKIp+$location.path()
								}
							},
							scene: index // share to Timeline
						}, function() {

						}, function(reason) {

						});

					}
				});
			};
        //跳转地图
			$scope.goMap = function(){
				$state.go('map',{destination:$scope.address});
			};
        //评价列表
			ApiService.getHotelFeedback({hotelId:$stateParams.id}).success(function(res){
				if(res.success){
					$scope.comment_if = res.result.length>0?true:false;
					$scope.comment_first = res.result[0];
          console.log(res.result[0]);
				}
			});
			$scope.goHotelFeedback = function() {
				$state.go('comment', {
					id: hotelDetail.id,
					stars: hotelDetail.stars
				});
				$ionicViewSwitcher.nextDirection("forward");
			};
        //酒店房间列表
			ApiService.getHotelHouses({
				hotelId: $stateParams.id
			}).success(function(res) {
        console.log(res);
        $scope.roomnum = res.result.length
				var rooms = res.result;
				var roomType = [],
					roomTypes = [];
				$scope.normalRoom = [];
				$scope.dachuangfangRoom = [];
				for (var i = 0; i < rooms.length; i++) {
					if (roomType.indexOf(rooms[i].houseTypex) == -1) {
						roomType.push(
                rooms[i].houseTypex
              );
					}
				}

				for (var i = 0; i < roomType.length; i++) {
					roomTypes[i] = {
						'houseTypex': roomType[i],
						rooms: []
					};
				}

				for (var i = 0; i < roomTypes.length; i++) {
					for (var j = 0; j < rooms.length; j++) {
						if (rooms[j].houseTypex == roomTypes[i].houseTypex) {
							roomTypes[i].rooms.push(rooms[j]);
						}
					}
				}

				$scope.roomType = roomTypes;
        console.log($scope.roomType);
          //进入房间详情
				$scope.goHouseIntr = function(id) {
					$state.go('house_intr', {
						id: id
					});
				};
          //进入房间简介
				$scope.seeAll = function() {
					var detail = {
						assorts: hotelDetail.assorts,
						services: hotelDetail.services,
						profiles: hotelDetail.profiles,
						num:hotelDetail.telephone,
            roomnum:$scope.roomnum
					};
					$state.go('hotelDetail', {
						hotelDetail: detail
					});
				};
          //进入房间设施
				$scope.seeAllService = function() {
					var detail = {
						assorts: hotelDetail.assorts,
						services: hotelDetail.services,
						profiles: hotelDetail.profiles
					};
					$state.go('hotelService', {
						hotelDetail: detail
					});
				};
          //收藏
				$scope.collect = function() {
					if(!localStorage.getItem('customerId')){
						$state.go('login');
						return;
					}
					$scope.whetherCollect = !!$scope.whetherCollect;
					if (!$scope.whetherCollect) {
						ApiService.addCustomerCollect({
							hotelId: hotelDetail.id,
							customerId: localStorage.getItem('customerId')
						}).success(function(res) {
							$scope.whetherCollect = !$scope.whetherCollect;
							if (res.success == true) {
								$ionicLoading.show({
									template: "收藏成功",
									noBackdrop: 'true',

								});
								$timeout(function() {
									$ionicLoading.hide();

								}, 2000);
							}else {
                if (res.msg==='非法请求') {
                  $ionicLoading.show({
                		template: DuplicateLogin
                	});
                  $timeout(function(){
                    $ionicLoading.hide();
                    $state.go('login')
                  },2000)
                }
							}
						});
					} else {
						ApiService.cancelCustomerCollect({
							collectId: hotelDetail.collectId,
							customerId: localStorage.getItem('customerId')
						}).success(function(res) {
							$scope.whetherCollect = !$scope.whetherCollect;
              if (res.success) {
                $ionicLoading.show({
  								template: "取消成功",
  								noBackdrop: 'true',

  							});
  							$timeout(function() {
  								$ionicLoading.hide();

  							}, 2000);
              }else{
                if (res.msg==='非法请求') {
                  $ionicLoading.show({
                		template: DuplicateLogin
                	});
                  $timeout(function(){
                    $ionicLoading.hide();
                    $state.go('login')
                  },2000)
                }
              }
						});
					}
				};
			});
		}else{
			$ionicLoading.hide();
		}
	});

    //滚动栏固定
	$scope.$on('getHeight', function() {

	});
	$scope.fixed = true;
	$scope.getPosition = function() {
		if ($ionicScrollDelegate.getScrollPosition().top >= $scope.offsetHeight) {
			$scope.fixed = false;
			$scope.$apply();
		} else {
			$scope.fixed = true;
			$scope.$apply();
		}
	};

    //视图切换
	$scope.switch = true;
	$scope.switchOn = function() {
		$scope.switch = true;
      //$scope.$apply()
	};
	$scope.switchOff = function() {
		$scope.switch = false;
      //$scope.$apply()
	};
});
