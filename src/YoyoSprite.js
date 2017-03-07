//定义yoyo节点
var YoyoSprite = cc.Sprite.extend({

  __canJump: true,

  __canBlink: true,

  __yoyoSeq: null,

  __defaultActionForever: null,

  __blinkAction: null,

	ctor: function(){

    this._super(res.Yoyo_run, cc.rect(0,0, 106, 146));

    var __self = this;

    this.setPosition(CCX, CCY + 312);

    var defultAni  = new cc.Animation();

    for (var i = 1; i <= 3; i++) {
      var offsetX = 106 * i % 318;
      var spriteFrame = new cc.SpriteFrame(res.Yoyo_run, cc.rect(offsetX, 0, 106, 146));
      defultAni.addSpriteFrame(spriteFrame);
    }
    defultAni.setDelayPerUnit(0.12);           //设置两个帧播放时间
    defultAni.setRestoreOriginalFrame(true);    //动画执行后还原初始状态

    this.__defaultActionForever = cc.repeatForever(cc.animate(defultAni));

    var jumpImageAni   = new cc.Animation(),
        jumpImageFrame = new cc.SpriteFrame(res.Yoyo_run, cc.rect(212, 0, 106, 146));

    jumpImageAni.addSpriteFrame(jumpImageFrame);
    jumpImageAni.setDelayPerUnit(0.12);

    var jumpImageAction = cc.animate(jumpImageAni);

    var jumpAction = cc.jumpBy(.8, cc.p(0, 0), 120, 1);

    var CallbackJumpAction = cc.callFunc(function(){
        __self.runAction(__self.__defaultActionForever);
        __self.__canJump = true;
    });

    this.__blinkAction = new cc.Blink(.5, 8);

    this.__yoyoSeq = cc.sequence(jumpImageAction, jumpAction, CallbackJumpAction);

		return true;

    //修改node节点为 sprite节点

	},

  runMyAction: function(){
    this.runAction(this.__defaultActionForever);
  },

  runBlinkAction: function(){
    var __self = this;
    if(this.__canBlink){
      this.__canBlink = false;
      this.runAction(this.__blinkAction);
      setTimeout(function () {
        __self.__canBlink = true;
      }, 600);
    }

  },

  yJump: function(){
    if(this.__canJump){
      this.__canJump = false;
      this.stopAction(this.__defaultActionForever);
      this.runAction(this.__yoyoSeq);
    }
  }

});
