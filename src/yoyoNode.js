//定义yoyo节点
var YoyoNode = cc.Node.extend({

  __canJump: true,

  __yoyoSprite: null,

  __yoyoSeq: null,

  __defaultActionForever: null,

	ctor: function(){

    this._super();

    var __self = this;

    this.__yoyoSprite = new cc.Sprite(res.Yoyo_run, cc.rect(0,0, 106, 146));

    this.__yoyoSprite.setPosition(CCX, CCY + 312);

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
        __self.__yoyoSprite.runAction(__self.__defaultActionForever);
        __self.__canJump = true;
    });

    this.__yoyoSeq = cc.sequence(jumpImageAction, jumpAction, CallbackJumpAction);

    this.addChild(this.__yoyoSprite);

		return true;

    //修改node节点为 sprite节点

	},

  runMyAction: function(){
    this.__yoyoSprite.runAction(this.__defaultActionForever);
  },

  yJump: function(){
    if(this.__canJump){
      this.__canJump = false;
      this.__yoyoSprite.stopAction(this.__defaultActionForever);
      this.__yoyoSprite.runAction(this.__yoyoSeq);
    }
  }

});
