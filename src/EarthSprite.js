//定义地球节点
var EarthSprite = cc.Sprite.extend({

	ctor: function(){

		this._super(res.Earth);

		this.setPosition(CCDOT);

		// this.__earthRotateForever = cc.repeatForever(new cc.RotateBy(6, -360));

		return true;

	},

	bindingClick: function(){
		//封装外部方法
		if(arguments.length > 0){
			var __arguments = arguments, fn = Array.prototype.shift.call(__arguments);
			if(typeof fn !== "function"){
				var arg0 = fn;
				fn = function(){
					cc.log("The first argument (" + arg0 + ") should be a function");
				};
			}
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
			}, this);
    }else{
			cc.log('binding fail');
		}
	}

});
