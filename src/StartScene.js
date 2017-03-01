var StartLayer = cc.Layer.extend({

    bgSprite: null,

    earthSprite: null,

    yoyoSprite: null,

    ctor:function () {

        this._super();

        this.bgSprite = new cc.Sprite(res.BackGround_png);

        this.bgSprite.attr({
            x: WIN_SIZE.width / 2,
            y: WIN_SIZE.height,
            anchorY: 1
        });

        this.addChild(this.bgSprite, 0);


        this.earthSprite = new cc.Sprite(res.Earth);

        this.earthSprite.attr({
            x: WIN_SIZE.width / 2,
            y: WIN_SIZE.height/ 2
        });

        this.addChild(this.earthSprite, 1);


        this.yoyoSprite = new cc.Sprite(res.Yoyo_run, cc.rect(0,0, 106, 146));

        this.yoyoSprite.attr({
            x: WIN_SIZE.width / 2,
            y: (WIN_SIZE.height / 2) + 312
        });

        this.addChild(this.yoyoSprite, 1);


        // var sprite = new cc.Sprite(res.Sprite);
        // var action = cc. scaleBy(0.5, 0.5);
        // sprite.runAction(action);
        // this.addChild(sprite, 1);

        var sprite = new cc.Sprite(res.Sprite, cc.rect(1102,0, 380, 96));

        var startItem = new cc.MenuItemSprite(sprite, null, function () {
          cc.log("Menu is clicked!");
          // var trans = new cc.TransitionPageTurn(1, new PlayScene(), false);
          cc.director.runScene(new PlayScene());
        }, this);
        startItem.attr({
          x: WIN_SIZE.width/2,
          y: 187,
          anchorX: 0.5,
          anchorY: 0.5,
        });
        var menu = new cc.Menu(startItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

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
