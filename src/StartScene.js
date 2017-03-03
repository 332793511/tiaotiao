var StartLayer = cc.Layer.extend({

    ctor:function () {

        this._super();

        this.addChild(new BgSprite(), 0);

        var earthSprite = new EarthSprite();

        this.addChild(earthSprite, 1);

        var stone1 = new StoneSprite(0);

        var angle = 65,
            radian = Math.PI * angle / 180;

        stone1.setPosition(CCX + Math.sin(radian)*275, CCY + Math.cos(radian)*275);
        stone1.setRotation(angle);

        this.addChild(stone1, 1);

        var yoyoSprite = new cc.Sprite(res.Yoyo_run, cc.rect(0,0, 106, 146));

        yoyoSprite.setPosition(CCX, CCY + 312);

        this.addChild(yoyoSprite, 1);

        var sprite_button_start = new cc.Sprite(res.Sprite, cc.rect(1102,0, 380, 96));

        var startItem = new cc.MenuItemSprite(sprite_button_start, null, function () {

          cc.log("Menu is clicked!");

          cc.director.runScene(new PlayScene());

        }, this);

        startItem.attr({
          x: CCX,
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
