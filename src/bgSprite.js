var BgSprite = cc.Sprite.extend({

	ctor: function(){

		this._super(res.BackGround_png);

		this.attr({
            x: CCX,
            y: WIN_HEIGHT,
            anchorY: 1
        });

		return true;
	}

});

// BgSprite.createSingle = function(){
// 	var bgSprite = null;
// 	if(cc.pool.hasObject(BgSprite)){
// 		bgSprite = cc.pool.getFromPool(BgSprite);
// 		bgSprite.removeFromParent();
// 	}else{
// 		bgSprite = new BgSprite();
// 		cc.pool.putInPool(bgSprite);
// 	}
// 	return bgSprite;
// };