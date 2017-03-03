var PlayLayer = cc.Layer.extend({

    ctor:function () {

        this._super();

        var controller = {
          needPause: true
        };

        this.addChild(new BgSprite(), 0);

        var yoyoNode = new YoyoNode();

        yoyoNode.runMyAction();

        this.addChild(yoyoNode, 2);

        var earthNode = new EarthNode(function(yoyo, controller){
            if(controller.needPause){
                controller.needPause = false;
                cc.director.resume();
            }
            yoyo.yJump();
        }, yoyoNode, controller);

        earthNode.runMyAction();

        this.addChild(earthNode, 1);

        this.scheduleOnce(function(){
            if(controller.needPause) cc.director.pause();
        }, .8);

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
