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

    this.__yoyoSprite.runAction(this.__defaultActionForever);

    this.addChild(this.__yoyoSprite);

		return true;

    //把创建动作的方法一一封装到对象函数
    //通过对象缓存池创建对象，并初始化起始位置、默认动作，达到寿命时销毁。
    //监听yoyo的碰撞事件，取出碰撞优先数组第一个值，检测碰撞，
    //监听碰撞优先数组第一个元素x，if x位置对应的与y轴夹角为不可能碰撞，则shift数组

	},

  yJump: function(){
    if(this.__canJump){
      this.__canJump = false;
      this.__yoyoSprite.stopAction(this.__defaultActionForever);
      this.__yoyoSprite.runAction(this.__yoyoSeq);
    }
  }

});
