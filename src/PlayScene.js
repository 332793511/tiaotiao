var PlayLayer = cc.Layer.extend({

    ctor:function () {

        this._super();

        var controller = {
          needPause: true
        };

        this.addChild(new BgSprite(), 0);

        var yoyoSprite = new YoyoSprite();

        // yoyoNode.setPosition(CCX, CCY + 312);
        // yoyoNode.setContentSize(cc.p(106, 146));

        // yoyoNode.runMyAction();

        this.addChild(yoyoSprite, 2);

        var earthSprite = new EarthSprite();

        // earthSprite.runMyAction();

        this.addChild(earthSprite, 1);

        var angle    = 0,
            fixed_angle = 70,
            r_angle  = angle + fixed_angle,
            radian1   = Math.PI * r_angle / 180,
            scale1 = 1;
            // fixed_angle = angle + 40 + (Math.random() - 0.5) * 2 * 10;

        var stone1 = new StoneSprite(0);

        stone1.setPosition(CCX + Math.sin(radian1)*231, CCY + Math.cos(radian1)*231);
        stone1.setRotation(r_angle);

        this.addChild(stone1, 1);

        var distanceYandS1,
            yoyoHitDot,
            stone1HitDot;

        var sprite_button_start = new cc.Sprite(res.Sprite, cc.rect(1102,0, 380, 96));

        var startItem = new cc.MenuItemSprite(sprite_button_start, null, function () {

          cc.log("Menu is clicked!");

          menu.removeFromParent();

          earthSprite.bindingClick(function(yoyo, controller){
              if(controller.needPause){
                  controller.needPause = false;
                  cc.director.resume();
              }
              yoyo.yJump();
          }, yoyoSprite, controller);

          this.scheduleOnce(function(){
              if(controller.needPause) cc.director.pause();
          }, .7);

          yoyoSprite.runMyAction();

          // var dot1 = new cc.DrawNode();
          // dot1.drawDot(yoyoHitDot, 5, cc.color(0,0,0,255));
          // this.addChild(dot1, 5);
          //
          // var dot2 = new cc.DrawNode();
          // dot2.drawDot(cc.p(0,0), 5, cc.color(255,255,255,255));
          // this.addChild(dot2, 5);


          this.schedule(function(){



              //地球旋转
              earthSprite.setRotation(angle);

              //石头运动
              r_angle = angle + fixed_angle;
              radian1 = Math.PI * r_angle / 180;
              scale1 = stone1.getScale();
              if(scale1 >= 0 && r_angle % 360 <= -20){
                stone1.setScale(scale1 - 0.012);
              }
              if(scale1 <= 1 && r_angle % 360 <= -118){
                stone1.setScale(scale1 + 0.0065);
              }

              stone1.setPosition(CCX + Math.sin(radian1)*231, CCY + Math.cos(radian1)*231);
              stone1.setRotation(r_angle);

              //碰撞检测

              stone1HitDot = {x: CCX + Math.sin(radian1)*265, y: CCY + Math.cos(radian1)*265}
              yoyoHitDot = yoyoSprite.getPosition();
              distanceYandS1 = cc.pDistance(yoyoHitDot, stone1HitDot);
              if(distanceYandS1 < 45 + 45){
                cc.log("Hit!");
                yoyoSprite.runBlinkAction();
              }


              angle -= 0.956;
              // cc.log(99);
          });

        }, this);

        startItem.attr({
          x: CCX,
          y: 187,
          anchorX: 0.5,
          anchorY: 0.5,
        });

        var menu = new cc.Menu(startItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 4);

        return true;
    }
});

var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});
