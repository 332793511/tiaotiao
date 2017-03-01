//定义地球节点
var EarthNode = cc.Node.extend({

	ctor: function(){

		this._super();

		//封装外部方法
		var __arguments = arguments, fn, first;

		if(__arguments.length > 0){
          first = Array.prototype.shift.call(__arguments);
          if(typeof first === "function"){
          	fn = first;
          }else{
          	fn = function(){
          		cc.log("The first argument (" + first + ") should be a function");
          	};
          }
      	}else{
      		fn = function(){
          		cc.log("No external callback functions and parameters passed");
          	};
      	}

		var earthSprite        = new cc.Sprite(res.Earth),
			earthRotateForever = cc.repeatForever(new cc.RotateBy(6, -360));

		earthSprite.setPosition(CCDOT);

		earthSprite.runAction(earthRotateForever);

		//给节点添加点击事件
		cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event){
            	//获取点击坐标和节点中心坐标距离（判断点击范围是否在圆形内）
                var distance = cc.pDistance(event.getCurrentTarget().getPosition(), touch.getLocation());
                //点击坐标如果距离节点中心坐标小于节点的半径
                if(distance < 255){
                  cc.log('its ok');
                  //实现外部回调函数
                  fn.apply(this, __arguments);          
                } 
            }
        }, earthSprite);

        this.addChild(earthSprite);

		return true;

	}

});
