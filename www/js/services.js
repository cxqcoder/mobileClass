angular.module('starter.services', [])
//轮播图
  .factory('$lunbopic', function() {
    var lunbopics = [{
      "id" : 0,
      "imgsrc" : "slideimage01.png"
    },
      {
        "id" : 1,
        "imgsrc" : "slideimage02.png"
      },
      {
        "id" : 2,
        "imgsrc" : "slideimage03.png"
      }
    ]

    return {
      all: function() {
        return lunbopics;
      }
    }
  })


  //好评榜
  .factory("$HomeGoodlistRow", function () {
    var homeGoodlistRows =
      [
        [
          {
            "id": 0, "title": "javaScript 课程", "main": "good,good,非常棒！","imgsrc":"shouye_02.png"
          },
          {
            "id": 1, "title": "UI/UE", "main": "UI,非常棒！","imgsrc":"shouye_02.png"
          }
        ],
        [
          {
            "id":2,"title":"HTML5+CSS3", "main":"bangbangda,非常棒！","imgsrc":"shouye_02.png"
          },
          {
            "id": 3, "title":"jQuery", "main":"wuli jQuery,非常棒！","imgsrc":"shouye_02.png"
          }
        ]
      ]
    return {
      all: function () {
        return homeGoodlistRows;
      }
    };

  })

  //最新课程
  .factory("$HomeNewLists", function () {
    var homeNewListRow = [
      [{"id": 0, "title": "javaScript 课程", "main": "good,good,非常棒！", "imgsrc": "shouye_03.png"},
        {"id": 1, "title": "UI/UE", "main": "UI,非常棒！", "imgsrc": "shouye_03.png"}],
      [{"id": 2, "title": "HTML5+CSS3", "main": "bangbangda,非常棒！", "imgsrc": "shouye_03.png"},
        {"id": 3, "title": "jQuery", "main": "wuli jQuery,非常棒！", "imgsrc": "shouye_03.png"}]
    ];
    return {
      all: function () {
        return homeNewListRow;
      }
    };
  })
  //猜你喜欢
  .factory("$youlike", function () {
    var youlikecourse = [
      {"id": 0, "title": "javaScript 课程", "main": "good,good,非常棒！", "imgsrc": "shouye_03.png"},
        {"id": 1, "title": "UI/UE", "main": "UI,非常棒！", "imgsrc": "shouye_03.png"},
      {"id": 2, "title": "HTML5+CSS3", "main": "bangbangda,非常棒！", "imgsrc": "shouye_03.png"},
        {"id": 3, "title": "jQuery", "main": "wuli jQuery,非常棒！", "imgsrc": "shouye_03.png"}
    ];
    return {
      all: function () {
        return youlikecourse;
      }
    };
  })
  // 课程列表
  .factory('$courseLists',function() {
    var clist = [{
      id: 0,
      titleEn: '0Ben Sparrow',
      price: 'You on your way?',
      imgsrc: 'img/ben.png'
    },{
      id: 1,
      titleEn: '1Ben Sparrow',
      price: 'You on your way?',
      imgsrc: 'img/ben.png'
    },{
      id: 2,
      titleEn: '2Ben Sparrow',
      price: 'You on your way?',
      imgsrc: 'img/ben.png'
    },{
      id: 3,
      titleEn: '3Ben Sparrow',
      price: 'You on your way?',
      imgsrc: 'img/ben.png'
    },{
      id: 4,
      titleEn: '4Ben Sparrow',
      price: 'You on your way?',
      imgsrc: 'img/ben.png'
    },{
      id: 5,
      titleEn: '5Ben Sparrow',
      price: 'You on your way?',
      imgsrc: 'img/ben.png'
    },{
      id: 6,
      titleEn: '6Ben Sparrow',
      price: 'You on your way?',
      imgsrc: 'img/ben.png'
    },{
      id: 7,
      titleEn: '7Ben Sparrow',
      price: 'You on your way?',
      imgsrc: 'img/ben.png'
    },{
      id: 8,
      titleEn: '8Ben Sparrow',
      price: 'You on your way?',
      imgsrc: 'img/ben.png'
    },{
      id: 9,
      titleEn: '9Ben Sparrow',
      price: 'You on your way?',
      imgsrc: 'img/ben.png'
    },{
      id: 10,
      titleEn: '10Ben Sparrow',
      price: 'You on your way?',
      imgsrc: 'img/ben.png'
    },{
      id: 11,
      titleEn: '11Ben Sparrow',
      price: 'You on your way?',
      imgsrc: 'img/ben.png'
    },{
      id: 12,
      titleEn: '12Ben Sparrow',
      price: 'You on your way?',
      imgsrc: 'img/ben.png'
    },{
      id: 13,
      titleEn: '13Ben Sparrow',
      price: 'You on your way?',
      imgsrc: 'img/ben.png'
    },{
      id: 14,
      titleEn: '14Ben Sparrow',
      price: 'You on your way?',
      imgsrc: 'img/ben.png'
    },{
      id: 15,
      titleEn: '15Ben Sparrow',
      price: 'You on your way?',
      imgsrc: 'img/ben.png'
    }
    ];
    return {
      all:function(){
        return clist;
      },
      page:function (pge) {
        return clist.splice((pge-1)*5,(pge-1)*5+5);
      },
      csearch:function (stxt) {
        return clist.splice(0,2);
      }
    }
  })
  .factory("$courseFirst",function() {
    var itemFir = [
      {
        id: 0,
        imgsrc:"img/ben.png",
        title: "标题 1",
        num: "3 节",
        nums: "15 节"
      },
      {
        id: 1,
        imgsrc:"img/ben.png",
        title: "标题 2",
        num: "3 节",
        nums: "15 节"
      },
      {
        id: 2,
        imgsrc:"img/ben.png",
        title: "标题 3",
        num: "3 节",
        nums: "15 节"
      },
      {
        id: 3,
        imgsrc:"img/ben.png",
        title: "标题 4",
        num: "3 节",
        nums: "15 节"
      },
      {
        id: 4,
        imgsrc:"img/ben.png",
        title: "标题 5",
        num: "3 节",
        nums: "15 节"
      },

      {
        id: 5,
        imgsrc:"img/ben.png",
        title: "标题 6",
        num: "3 节",
        nums: "15 节"
      }
    ];
    return {
      all:function(){
        return itemFir;
      }
    };
  })
  .factory("$courseSecond",function() {
    var itemFir = [
      {
        id: 0,
        imgsrc:"img/ben.png",
        title: "收藏课程标题 1",
        num: "3 节",
        nums: "15 节"
      },
      {
        id: 1,
        imgsrc:"img/ben.png",
        title: "收藏课程标题 2",
        num: "3 节",
        nums: "15 节"
      },
      {
        id: 2,
        imgsrc:"img/ben.png",
        title: "收藏课程标题 3",
        num: "3 节",
        nums: "15 节"
      },
      {
        id: 3,
        imgsrc:"img/ben.png",
        title: "收藏课程标题 4",
        num: "3 节",
        nums: "15 节"
      },
      {
        id: 4,
        imgsrc:"img/ben.png",
        title: "收藏课程标题 5",
        num: "3 节",
        nums: "15 节"
      },

      {
        id: 5,
        imgsrc:"img/ben.png",
        title: "收藏课程标题 6",
        num: "3 节",
        nums: "15 节"
      }
    ];
    return {
      all:function(){
        return itemFir;
      }
    };
  })
  // 课程详细内容
  .factory('$studyList',function() {
    var studymulu = [{
      title:"1-1photoshop 修图效果效果制作",
      time:"15 分钟"
    },
      {
        title:"1-2photoshop 修图效果效果制作",
        time:"15 分钟"
      },
      {
        title:"1-3photoshop 修图效果效果制作",
        time:"15 分钟"
      },
      {
        title:"1-4photoshop 修图效果效果制作",
        time:"15 分钟"
      },
      {
        title:"1-5photoshop 修图效果效果制作",
        time:"15 分钟"
      } ,
      {
        title:"1-6photoshop 修图效果效果制作",
        time:"15 分钟"
      }]
    return{
      all:function(){
        return studymulu;
      }
    }
  })
  //评价详情
  .factory('$pingjiaList', function () {
    var assesslist = [{
      pic: "img/study_tx.jpg",
      name: "李晓丽",
      title: "10 分钟前",
      cont: "多谢大神指点",
    },
      {
        pic: "img/study_tx.jpg",
        name: "李晓丽",
        title: "10 分钟前",
        cont: "多谢大神指点",
      },
      {
        pic: "img/study_tx.jpg",
        name: "李晓丽",
        title: "8 分钟前",
        cont: "多谢大神指点",
      },
      {
        pic: "img/study_tx.jpg",
        name: "李晓丽",
        title: "刚刚",
        cont: "多谢大神指点",
      }]
    return {
      all: function () {
        return assesslist
      }
    }
  })

  .factory('Chats', function() {
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
