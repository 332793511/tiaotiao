StoneSprite = cc.Sprite.extend({

    ctor: function() {

        var stones = [res.Hill1, res.Hill2];

        if(arguments.length > 0){
            var arg = arguments[0];
            if(typeof arg === "number" && arg >= 0 && arg <= 1){
              this._super(stones[arg]);
            }
        }else{
            this._super(stones[parseInt(Math.random()*2)]);
        }

        return true;
    },

    update: function(){

    }

});
