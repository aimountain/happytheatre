const screenWidth = $(window).width();
const screenHeight = $(window).height();

function Background(){
  this.translateZMin  = -725;
  this.translateZMax  = 600;
  this.html  = "";
  this.count = 200;
  this.$Circle = "";
  this.$Container = $("#container");
};

Background.prototype.r = function r(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Background.prototype.init = function(){
  for(var i=0; i< this.count; i++){
    this.html += "<div class='circle'></div>";
  }
  this.$Circle = $(this.html);
  this.$Circle.appendTo(this.$Container);
};

Background.prototype.setContainerDefaultStyle = function(){
  this.$Container
    .css("perspective-origin", screenWidth/2 + "px " + screenHeight/2 + "px")
    .velocity(
      {
        perspective: [ 215, 50 ],
        opacity: [ 0.90, 0.55 ]
      }, {
        duration: 800,
        delay: 3000
      });

};
Background.prototype.setCircleDefaultStyle = function(){
  self = this;
  this.$Circle
    .velocity({
      opacity: [
        function() { return Math.random() },
        function() { return Math.random() + 0.1 }
      ],
      translateX: [
        function() { return "+=" + self.r(-screenWidth/2.75, screenWidth/2.75) },
        function() { return self.r(0, screenWidth) }
      ],
      translateY: [
        function() { return "+=" + self.r(-screenHeight/2.75, screenHeight/2.75) },
        function() { return self.r(0, screenHeight) }
      ],
      translateZ: [
        function() { return "+=" + self.r(self.translateZMin, self.translateZMax) },
        function() { return self.r(self.translateZMin, self.translateZMax) }
      ]
    }, { duration: 10000 })
    .velocity("reverse",{duration: 10000, loop: true});
};

Background.prototype.defaultStyle = function(){
  this.setContainerDefaultStyle();
  this.setCircleDefaultStyle();
};

Background.prototype.start = function() {
  this.init();
  this.defaultStyle();
};


function Star(){
  this.count = 4;
  this.data = [["static/media/heminghan.mp4","static/image/heminghan.jpg"],
                ["static/media/huke.mp4","static/image/huke.jpg"],
                ["static/media/guojingfei.mp4", "static/image/guojingfei.jpg"],
                ["static/media/yandanchen.mp4","static/image/yandanchen.jpg"]
  ];
  this.angle = 0,
  this.step = 360/(this.data.length);
  this.html = "";
  this.$Star = "";
  this.$Container = $("body");
}

Star.prototype.init = function(){
  for(var i = 0; i< this.count; i++){
    this.html += "<div class='star'></div>"
  }
  this.$Star = $(this.html);
  self = this;
  this.$Star.each(function(index, element) {
    $(element).css("background-image", "url(" + self.data[index][1] + ")");
  });
  this.$Star.appendTo(this.$Container);
  this.addStarClickEvent();
}

Star.prototype.coordinate = function(angle){
    var  centerX = screenWidth/2,
      centerY = screenHeight/2.5,
      radius  = 200,
      radian = angle * Math.PI / 180,
      coordinateX = centerX + Math.sin(radian)*radius - 60,
      coordinateY = centerY + Math.cos(radian)*radius;
    return [coordinateX, coordinateY];
};

Star.prototype.addStarClickEvent = function () {
  self = this;
  this.$Star.each(function(index, element){
    $(this).click(function(){
      $(this).css("opacity",1);
      $("video").remove();
      var videoHtml = "<video></video>";
      $video = $(videoHtml);
      $video.appendTo($("body"));
      $video.attr("src",self.data[index][0]);
      $video.attr("width","600px");
      $video.attr("height","400px");
      $('video').bind('ended',function () {
        $("video")
          .velocity({
              opacity: 0.9
            },
            {
              duration: 1000,
              complete: function(){
                $("video").remove();
                self.circleRotateStyle();
              }
            });
      });
      $video.trigger('play');
      self.horizontalStyle();
      $video.velocity({
        translateX:  function() { return screenWidth/2  - 300},
        translateY: function()  { return screenHeight/2 - 230}
      },{
        duration: 1000
      });
    });
  });
}

Star.prototype.horizontalStyle = function(){
  xcoordinate = (screenWidth - this.data.length*150) /2  ;
  this.$Star.each(function(){
  $(this)
    .velocity("stop")
    .velocity({
      translateX: xcoordinate,
      translateY: 30
    }, {
      duration: 2000
    })
    .velocity({
      width: 120,
      height: 120
    },{duration: 800});

    xcoordinate += 150;
  });
}

Star.prototype.circleStyle = function () {
  self = this;
  this.$Star.each(function(){
    point = self.coordinate(self.angle);
    $(this)
      .velocity({
        translateX:  [ function() { return  point[0]} ] ,
        translateY:  [ function() { return  point[1]} ],
      },{duration: 3000 });

    self.angle += self.step;
  });
  this.$Star
    .velocity({
      width: "+=20",
      height: "+=20"
    },{duration: 3000 })
    .velocity("reverse",{duration: 3000, loop: true});
}

Star.prototype.circleRotateStyle = function(){
  self = this;
  self.angle += self.step;
  this.$Star.each(function(){
    point = self.coordinate(self.angle);
    $(this)
      .velocity("stop")
      .velocity({
        translateX:  [ function() { return  point[0]} ] ,
        translateY:  [ function() { return  point[1]} ],
      },{duration: 3000 })
      .velocity({
        width: 120,
        height: 120
      },{duration: 800})
      .velocity({
        width: "+=20",
        height: "+=20"
      },{duration: 3000})
      .velocity("reverse",{loop: true});

    self.angle += self.step;
    self.angle = self.angle % 360;
  });

}

Star.prototype.start = function(){
  this.init();
  this.circleStyle();
}


function Flame(){
  this.count = 50;
  this.html  = "";
  this.$Flame = "";
  this.$Container = $("#container");
}

Flame.prototype.init = function () {
  for(var i = 0; i < this.count; i++){
    this.html += "<div class='flame'></div>"
  }
  this.$Flame = $(this.html);
  this.$Flame.appendTo(this.$Container);
  console.log(this.$Flame);
}

Flame.prototype.r = function r(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Flame.prototype.defaultStyle = function () {
  self = this;
  this.$Flame
    .velocity({
      width: [230, 235, 240, 245 ],
      height: [230, 235, 240, 245 ],
      translateX:  [ 230, 235, 240, 245 ],
      translateY:  [ 100, 105, 110, 115 ],
      translateZ: [function(){ return "+=" +self.r(-10, -20)},
        function(){ return  self.r(0, 20)}]


    }, { duration: 3000, loop: true });

}

Flame.prototype.start = function () {
  this.init();
  this.defaultStyle();
}

function HappyTheatre(){
  this.background = new Background();
  this.star  = new Star();
  this.flame = new Flame();
}

HappyTheatre.prototype.start = function() {
  this.background.start();
  this.star.start();
  //this.flame.start();
}

happyTheatre = new HappyTheatre();
happyTheatre.start();












