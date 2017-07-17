angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, $http, $ionicSlideBoxDelegate, $rootScope) {
    $http.post($rootScope.URLAdmin + "/Handler/OfflineCourseHandler.ashx?action=indexshow", "").success(function (result) {
      $scope.lunbodata = result.data.bannerList;
      $ionicSlideBoxDelegate.$getByHandle("slideimgs").update();
      $ionicSlideBoxDelegate.$getByHandle("slideimgs").loop("true");
      $scope.a = []
      $scope.temp = 0;
      for (var i = 0; i < result.data.goodList.length / 2; i++) {
        $scope.a[i] = [];
        for (var j = 0; j < 2; j++) {
          $scope.a[i][j] = result.data.goodList[$scope.temp];
          $scope.temp++;
        }
      }
      $scope.haopingbang = $scope.a;
      $scope.newlist = [[result.data.newList[0], result.data.newList[1]], [result.data.newList[2], result.data.newList[3]]];
      $scope.likelist = result.data.chooseList;
    })
    $rootScope.homeSearch = {
      searchText: ""
    }
    $scope.tzSearch = function () {
      if ($rootScope.homeSearch.searchText) {
        window.location = "#/tab/chats";
      }
    }
  })

  .controller('ChatsCtrl', function ($scope, $http, $rootScope) {
    $http.post($rootScope.URLAdmin + "/Handler/OfflineCourseHandler.ashx?action=getcategory", "").success(function (result) {
      $scope.courseListBtns = result.data;
    })
    $scope.priceBtns = [
      {id: 0, btnName: "全部"},
      {id: 1, btnName: "免费"},
      {id: 2, btnName: "收费"}
    ]
    $scope.clist = false;
    $scope.plist = false;
    $scope.pcolor = {color: "#333"};
    $scope.kcolor = {color: "#333"};
    $scope.showc = function () {
      $scope.clist = !$scope.clist;
      $scope.plist = false;
      $scope.pcolor = {color: "#333"};
      if ($scope.clist == true) {
        $scope.kcolor = {color: "#63aafc"};
      } else {
        $scope.kcolor = {color: "#333"};
      }
    }
    $scope.showp = function () {
      $scope.plist = !$scope.plist;
      $scope.clist = false;
      $scope.kcolor = {color: "#333"};
      if ($scope.plist == true) {
        $scope.pcolor = {color: "#63aafc"};
      } else {
        $scope.pcolor = {color: "#333"};
      }
    }
    // 获取课程列表数据
    $scope.lists = [];
    $scope.searchText = '';
    $scope.CategoryId = '';
    $scope.CpriceId = '';
    $scope.nowpage = 1;
    $scope.moredata = false;
    $scope.loadlist = function () {
      var coursel = {
        'pageStart': $scope.nowpage,
        'searchText': $scope.searchText,
        'CategoryTwo': $scope.CategoryId,
        'CpriceId': $scope.CpriceId
      }
      $http.post($rootScope.URLAdmin + "/Handler/OfflineCourseHandler.ashx?action=courseshow", coursel).success(function (ret) {
        $scope.lists = $scope.lists.concat(ret.data.list);
        $scope.page = Math.ceil(ret.data.count / ret.data.pageSize);
        $scope.nowpage = ret.data.pageStart;
        if (ret.data.pageStart < $scope.page) {
          $scope.moredata = true;
        }
      })
    }
    $scope.courseSerch = function (searchText, CategoryId, CpriceId) {
      console.log(CategoryId);
      $scope.searchText = searchText;
      $scope.CategoryId = CategoryId;
      $scope.CpriceId = CpriceId;
      $scope.nowpage = 0;
      $scope.lists = [];
      $scope.loadlist();
    }
    $scope.moredata = true;
    $scope.loadMore = function () {
      $scope.nowpage++;
      $scope.loadlist();
      console.log("666");
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }
    $scope.myKeyup = function (e) {
      var keycode = window.event ? e.keyCode : e.which;
      if (keycode == 0 || keycode == 13) {
        $scope.courseSerch($scope.searchInputText, '', '');
        $scope.searchInputText = '';
        console.log($scope.searchInputText);
      }
    }
    if ($rootScope.homeSearch.searchText) {
      $scope.courseSerch($rootScope.homeSearch.searchText, '', '');
      $rootScope.homeSearch.searchText = "";
    }
    $scope.loadlist();
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope, $http, $rootScope, $ionicPopup) {
    $scope.data = {
      showDelete: false
    };
    $scope.islogin = true;
    $http.post($rootScope.URLAdmin + "/Handler/UserHandler.ashx?action=isLogin", "").success(function (ret) {
      if (ret.success) {
        $scope.islogin = false;
        $scope.getcourse();
        $scope.shouchang();
      } else {
        $scope.islogin = true;
      }
    })
    $scope.getcourse = function () {
      $http.get($rootScope.URLAdmin + '/Handler/OnCourseHandler.ashx?action=mycourse').success(function (response) {
        $scope.buylist = response.data;
      })
    }

    $scope.shouchang = function () {
      $http.get($rootScope.URLAdmin + '/Handler/OnCourseHandler.ashx?action=mycollection').success(function (ret) {
        $scope.mylist = ret.data;
        console.log(ret.data);
      })
    }
    $scope.tz = function () {
      window.location = "#/tab/login";
      console.log("111");
    }
    $scope.onItemDelete = function (item) {
      var deldata = {
        courseId: item
      }
      $http.post($rootScope.URLAdmin + "/Handler/OnCourseHandler.ashx?action=deletecollection", deldata).success(function (result) {
        console.log(result);
        if (result.success) {
          $scope.mylist.splice($scope.mylist.indexOf(item), 1);
        } else {
          $ionicPopup.alert({
            title: '提示信息',
            template: result.err
          });
        }

      })
    }
    $scope.share = function(itemID) {
      window.plugins.socialsharing.share('给你分享一个很棒的课程', null, null,$rootScope.URLAdmin+'/www/index.html#/tab/lesslistStudy/'+itemID);
    };

    $scope.bdata = true;
    $scope.mdata = false;
    $scope.showb = function () {
      $scope.bdata = !$scope.bdata;
      $scope.mdata = false;
      console.log("666");
      $scope.mcolor = {color: "#333"};
      if ($scope.bdata == true) {
        $scope.bcolor = {color: "#63aafc"};
      } else {
        $scope.bcolor = {color: "#333"};
      }
    }
    $scope.showm = function () {
      $scope.mdata = !$scope.mdata;
      $scope.bdata = false;
      $scope.bcolor = {color: "#333"};
      if ($scope.mdata == true) {
        $scope.mcolor = {color: "#63aafc"};
      } else {
        $scope.mcolor = {color: "#333"};
      }
    }
  })
  .controller('PersonalCtrl', function ($scope, $http, $rootScope, $ionicPopup) {
    $rootScope.hideTabs=false;
    $http.post($rootScope.URLAdmin + "/Handler/OnCourseHandler.ashx?action=returnuserinfo", "").success(function (response) {
      $scope.perlist = response;
    })
    $scope.exitlogin = function () {
      $http.post($rootScope.URLAdmin + "/Handler/UserHandler.ashx?action=quit", "").success(function (ret) {
        if (ret.success) {
          window.location = "#/tab/login"
        } else {
          $ionicPopup.alert({
            title: '提示信息',
            template: ret.err
          });
        }
      })
    }
  })
  .controller('LoginCtrl', function ($scope, $http, $rootScope, $state, $ionicPopup) {
    $http.post($rootScope.URLAdmin + "/Handler/UserHandler.ashx?action=isLogin", "").success(function (ret) {
      if (ret.success) {
        window.location = "#/tab/personal";
      }
    })
    $scope.loginfn = function (logindata) {
      console.log(logindata);
      var loginda = {
        userName: logindata.uname,
        userPwd: logindata.pass
      }
      $http.post($rootScope.URLAdmin + "/Handler/UserHandler.ashx?action=login", loginda).success(function (response) {
        console.log(response);
        if (response.success) {
          $state.go("tab.personal");
        } else {
          $ionicPopup.alert({
            title: '提示信息',
            template: response.err
          });
        }
      })
    }

  })
  .controller('DetailCtrl', function ($scope, $rootScope, $ionicModal, $http, $stateParams, $ionicPopup) {
    $scope.sc="收藏";
    $scope.gm="购买";
    $scope.issActive=false;
    $scope.isgActive=false;
    $scope.isbbuy=false;
    $scope.url="video/mov_aaa.mp4";
    var settingId = {
      courseId: $stateParams.id
    }
    $scope.isshow = true;
    $scope.islogin = false;
    $http.post($rootScope.URLAdmin + "/Handler/UserHandler.ashx?action=isLogin", "").success(function (respone) {
      if (respone.success) {
        $scope.isshow = false;
        $scope.islogin = true;
        $scope.getcontenty();
      } else {
        $scope.isshow = true;
        $scope.islogin = false;
        console.log($scope.islogin);
        $scope.getcontentw();
      }
    })
    $scope.getcontenty = function () {
      $http.post($rootScope.URLAdmin + "/Handler/OnCourseHandler.ashx?action=learnshow", settingId).success(function (ret) {
        $scope.studydata = ret.data.CDlist;
        $scope.pingjia = ret.data.evaluate.list;
         $scope.iscollete=ret.data.ifColected;
         $scope.url=$rootScope.URLAdmin+$scope.studydata[0].Vlist[0].Vurl;
         console.log("进度为："+$scope.jingdu);
        if($scope.iscollete){
          $scope.issActive=true;
          $scope.sc="已收藏";
        }else {
          $scope.issActive=false;
          $scope.sc="收藏";
        }
        $scope.isbuy=ret.data.ifPay;
        if($scope.isbuy){
          $scope.isgActive=true;
          $scope.isbbuy=false;
          $scope.gm="已购买";
        }else {
          $scope.isgActive= false;
          $scope.isbbuy=true;
          $scope.gm="购买";
        }
      })
    }
    $scope.getcontentw = function () {
      $http.post($rootScope.URLAdmin + "/Handler/OfflineCourseHandler.ashx?action=learnshow", settingId).success(function (ret) {
        $scope.studydata = ret.data.CDlist;
        $scope.pingjia = ret.data.evaluate.list;
        $scope.iscollete=ret.data.ifColected;
        $scope.isbuy=ret.data.ifPay;
        // if(ret.data.CDlist.Vlist.isViewed){
        //   $scope.studycolor={color:"#5BDC82"}
        // }else {
        //   $scope.studycolor={color:"#000"}
        // }
      })
    }
    $scope.collect = function () {
      if ($scope.islogin) {
        $http.post($rootScope.URLAdmin + "/Handler/OnCourseHandler.ashx?action=collection", settingId).success(function (ret) {
          $ionicPopup.alert({
            title: '提示信息',
            template: ret.success
          });
        })
      } else {
        $ionicPopup.alert({
          title: '提示信息',
          template: '请登录后进行收藏！'
        });
      }

    }
    $scope.estimate = function () {
      if ($scope.islogin) {
        $scope.showwindow();
      } else {
        $ionicPopup.alert({
          title: '提示信息',
          template: '请登录后进行评价！'
        });
      }
    }
    $scope.finishe = function (pingjia) {
      var pingjia = {
        courseId: settingId.courseId,
        evaluate: pingjia.evaluates
      }
      console.log(pingjia);
      $http.post($rootScope.URLAdmin + "/Handler/OnCourseHandler.ashx?action=addcoursecomments", pingjia).success(function (ret) {
       if(ret.success){
         $ionicPopup.alert({
           title: '提示信息',
           template: ret.success
         });
       }else {
         $ionicPopup.alert({
           title: '错误信息',
           template: ret.err
         });
       }

      })
    }
    $scope.buycourse=function () {
      console.log("买东西啦")
      if($scope.islogin){
        if($scope.isbuy==true){
          $ionicPopup.alert({
            title: '提示信息',
            template: '课程已经购买成功，不要调皮额！'
          });
        }else {
          $http.post($rootScope.URLAdmin+"/Handler/OnCourseHandler.ashx?action=buy",settingId).success(function (retu) {
            if(retu.success){

              $ionicPopup.alert({
                title: '提示信息',
                template: '课程购买成功，欢迎观看！'
              });
            }else {
              $ionicPopup.alert({
                title: '错误信息',
                template:retu.err
              });
            }
          })
        }
      }else {
        $ionicPopup.alert({
          title: '提示信息',
          template: '请登录后进行购买！'
        });
      }
    }
    $scope.djsp=function (id) {
      for(var i=0;i<$scope.studydata.length;i++){
        for(var j=0;j<$scope.studydata[i].Vlist.length;j++){
          if($scope.studydata[i].Vlist[j].ID==id){
            $scope.url=$rootScope.URLAdmin+$scope.studydata[i].Vlist[j].Vurl;
          }
        }
      }

    }
    $scope.sdata = true;
    // $scope.studydata = $studyList.all();
    $scope.xdata = false;
    // $scope.pingjia = $pingjiaList.all();
    $scope.showwindow = function () {
      console.log("666")
      $ionicModal.fromTemplateUrl("model.html", {scope: $scope}).then(function (modal) {
        $scope.modal = modal;
        $scope.modal.show();
      })
    }
    $scope.qiekc = function () {
      $scope.sdata = !$scope.sdata;
      $scope.xdata = false;
      $scope.xcolor = {color: "#333"};
      if ($scope.sdata == true) {
        $scope.scolor = {color: "#63aafc"};
      } else {
        $scope.scolor = {color: "#333"};
      }
    }

    $scope.qiepj = function () {
      $scope.xdata = !$scope.xdata;
      $scope.sdata = false;
      $scope.scolor = {color: "#333"};
      if ($scope.xdata == true) {
        $scope.xcolor = {color: "#63aafc"};
      } else {
        $scope.xcolor = {color: "#333"};
      }
    }
    $scope.login = true;
    $scope.login_yz = function () {
      $scope.islogin=true;
      $scope.isshow=false;
    }
  })
  .controller('SignCtrl', function ($scope, $http, $rootScope, $ionicPopup) {
    // 注册页面
    $scope.infor = {
      uname: '',
      email: '',
      phone: '',
      password: '',
      apassword: ''
    };
    $scope.register = function (infor) {
      var email_yz = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      var photo_yz = /^1\d{10}$/;
      if (!!infor.uname && !!infor.email && !!infor.phone && !!infor.password && !!infor.apassword) {
        if (!email_yz.test(infor.email)) {
          $ionicPopup.alert({
            title: '提示信息',
            template: '邮箱格式不正确，请重新输入！'
          });
        } else if (!photo_yz.test(infor.phone)) {
          $ionicPopup.alert({
            title: '提示信息',
            template: '请输入正确手机号！'
          });
        } else if (infor.password != infor.apassword) {
          $ionicPopup.alert({
            title: '提示信息',
            template: '两次密码不相同，请重新输入！'
          });
        } else {
          var signdata = {
            userName: infor.uname,
            email: infor.email,
            phone: infor.phone,
            userPwd: infor.password,
            nickname: "小蔡",
            userpic: "img/person_touxiang.png"
          }
          $http.post($rootScope.URLAdmin + "/Handler/UserHandler.ashx?action=add", signdata).success(function (ret) {
            if (ret.success) {
              window.location = "#/tab/login"
            } else {
              $ionicPopup.alert({
                title: '注册失败',
                template: ret.err
              });
            }
          })
        }
      } else {
        $ionicPopup.alert({
          title: '提示信息',
          template: '请输入内容！'
        });
      }

    }
  })
  /*底部tabs隐藏显示的指令*/
  .directive('hideTabs', function ($rootScope) {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {
        scope.$on('$ionicView.beforeEnter', function () {
          $rootScope.hideTabs = attributes.hideTabs;
        });

        scope.$on('$ionicView.beforeLeave', function () {
          $rootScope.hideTabs = false;
        });
      }
    };
  });

