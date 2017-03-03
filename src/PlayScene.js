var PlayLayer = cc.Layer.extend({

    ctor:function () {

        this._super();

        var controller = {
          needPause: true
        };

        this.addChild(new BgSprite(), 0);

        var yoyoNode = new YoyoNode();

        // yoyoNode.runMyAction();

        this.addChild(yoyoNode, 2);

        var earthSprite = new EarthSprite();

        // earthSprite.runMyAction();

        this.addChild(earthSprite, 1);

        var angle    = 0,
            fixed_angle = 65,
            r_angle  = angle + fixed_angle,
            radian   = Math.PI * r_angle / 180;
            // fixed_angle = angle + 40 + (Math.random() - 0.5) * 2 * 10;

        var stone1 = new StoneSprite(0);

        stone1.setPosition(CCX + Math.sin(radian)*275, CCY + Math.cos(radian)*275);
        stone1.setRotation(r_angle);

        this.addChild(stone1, 1);

        var sprite_button_start = new cc.Sprite(res.Sprite, cc.rect(1102,0, 380, 96));

        var startItem = new cc.MenuItemSprite(sprite_button_start, null, function () {

          cc.log("Menu is clicked!");

          earthSprite.bindingClick(function(yoyo, controller){
              if(controller.needPause){
                  controller.needPause = false;
                  cc.director.resume();
              }
              yoyo.yJump();
          }, yoyoNode, controller);

          this.scheduleOnce(function(){
              if(controller.needPause) cc.director.pause();
          }, .8);

          yoyoNode.runMyAction();

          this.schedule(function(){
              r_angle = angle + fixed_angle;
              radian = Math.PI * r_angle / 180;
              earthSprite.setRotation(angle);
              stone1.setPosition(CCX + Math.sin(radian)*275, CCY + Math.cos(radian)*275);
              stone1.setRotation(r_angle);
              angle -= 0.8;
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
