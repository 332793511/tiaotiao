var StartLayer = cc.Layer.extend({
      ctor:function () {
          this._super();

          var size = cc.winSize;

          this.bgSprite = new cc.Sprite(res.BackGround_png);
          this.bgSprite.attr({
              x: size.width / 2,
              y: size.height / 2,
          });
          this.addChild(this.bgSprite, 0);

          return true;
      }
  });

  var StartScene = cc.Scene.extend({
      onEnter:function () {
          this._super();
          var layer = new StartLayer();
          this.addChild(layer);
      }
  });
