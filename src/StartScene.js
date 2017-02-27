var StartLayer = cc.Layer.extend({
    bgSprite: null,
    earthSprite: null,
    ctor:function () {
        this._super();

        var size = cc.winSize;

        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height,
            anchorY: 1
        });
        this.addChild(this.bgSprite, 0);



        this.earthSprite = new cc.Sprite(res.Earth);
        this.earthSprite.attr({
            x: size.width / 2,
            y: size.height/ 2
        });
        this.addChild(this.earthSprite, 1);

        // var startItem = new cc.MenuItemImage(res.Sprite, res.Earth, function () {
        //   cc.log("Menu is clicked!");
        //   // var trans = new cc.TransitionPageTurn(1, new PlayScene(), false);
        //   cc.director.runScene(new PlayScene());
        // }, this);
        // startItem.attr({
        //   x: size.width/2,
        //   y: size.height/2,
        //   anchorX: 0.5,
        //   anchorY: 0.5,
        //   // width: 380,
        //   // height: 96
        // });

        // var menu = new cc.Menu(startItem);
        // menu.x = 0;
        // menu.y = 0;
        // this.addChild(menu, 1);

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
