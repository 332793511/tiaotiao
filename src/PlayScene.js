var PlayLayer = cc.Layer.extend({

      ctor:function () {

          this._super();

          var bgSprite = new cc.Sprite(res.BackGround_png);

          bgSprite.attr({
            x: CCX,
            y: WIN_SIZE.height,
            anchorY: 1
          });

          this.addChild(bgSprite, 0);


          var yoyoNode = new YoyoNode();

          this.addChild(yoyoNode, 2);

          var earthNode = new EarthNode(function(yoyo){
              yoyo.yJump();
          }, yoyoNode);

          this.addChild(earthNode, 1);

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
