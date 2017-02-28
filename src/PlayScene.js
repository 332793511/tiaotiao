var PlayLayer = cc.Layer.extend({
      bgSprite: null,
      earthSprite: null,
      yoyoSprite: null,
      ctor:function () {
          this._super();

          var size = cc.winSize;

          // add bg
          this.bgSprite = new cc.Sprite(res.BackGround_png);
          this.bgSprite.attr({
              x: size.width / 2,
              y: size.height / 2,
          });
          this.addChild(this.bgSprite, 0);

          this.earthSprite = new cc.Sprite(res.Earth);
          this.earthSprite.attr({
              x: size.width / 2,
              y: size.height/ 2
          });

          var earthAction = new cc.RotateBy(6, -360);
          // this.earthSprite.runAction(earthAction);
          // var earthAnimation = new cc.Animation();
          // earthAnimation.addSpriteFrame(earthSprite);
          // var earthAction = cc.animate(earthAnimation);
          this.earthSprite.runAction(cc.repeatForever(earthAction))
          this.addChild(this.earthSprite, 1);


          this.yoyoSprite = new cc.Sprite(res.Yoyo_run, cc.rect(0,0, 106, 146));
          this.yoyoSprite.attr({
              x: size.width / 2,
              y: (size.height / 2) + 312
          });

          var animation = new cc.Animation();
          for (var i = 1; i <= 2; i++) {
            var  spriteFrame = new cc.SpriteFrame(res.Yoyo_run, cc.rect(106*i, 0, 106, 146));
            animation.addSpriteFrame(spriteFrame);
          }

          animation.setDelayPerUnit(0.15);           //设置两个帧播放时间
          animation.setRestoreOriginalFrame(true);    //动画执行后还原初始状态

          var action = cc.animate(animation);
          this.yoyoSprite.runAction(cc.repeatForever(action))

          this.addChild(this.yoyoSprite, 1);



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
