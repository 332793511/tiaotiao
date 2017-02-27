cc.LoaderScene = cc.Scene.extend({
    _interval : null,
    _label : null,
    _className:"LoaderScene",
    cb: null,
    target: null,

    init : function(){
        var self = this;

        return true;
    },

    _initStage: function (img, centerPos) {
        var self = this;
        var texture2d = self._texture2d = new cc.Texture2D();
        texture2d.initWithElement(img);
        texture2d.handleLoadedTexture();
        var logo = self._logo = new cc.Sprite(texture2d);
        logo.setScale(cc.contentScaleFactor());
        logo.x = centerPos.x;
        logo.y = centerPos.y;
        self._bgLayer.addChild(logo, 10);
    },
    /**
     * custom onEnter
     */
    onEnter: function () {
        var self = this;
        cc.Node.prototype.onEnter.call(self);
        self.schedule(self._startLoading, 0.3);
    },
    /**
     * custom onExit
     */
    onExit: function () {
        cc.Node.prototype.onExit.call(this);
        // var tmpStr = "Loading... 0%";
        // this._label.setString(tmpStr);
        var ld = document.getElementById('loading');
        if(ld){
          ld.style.opacity = 0;
          setTimeout(function() {
            ld.parentNode.removeChild(ld);
          }, 500);
        }
    },

    /**
     * init with resources
     * @param {Array} resources
     * @param {Function|String} cb
     * @param {Object} target
     */
    initWithResources: function (resources, cb, target) {
        if(cc.isString(resources))
            resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
        this.target = target;
    },

    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        var lp = document.getElementById('loading-progressing');
        cc.loader.load(res,
            function (result, count, loadedCount) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                if(lp){
                  lp.style.width = (6.66667 * percent/100) + "rem";
                }
                // self._label.setString("Loading... " + percent + "%");
            }, function () {
                if (self.cb){
                  self.cb.call(self.target);
                }
                if(lp){
                  lp.style.width = "6.66667rem";
                }
            }
        );
    },

    _updateTransform: function(){
        this._renderCmd.setDirtyFlag(cc.Node._dirtyFlags.transformDirty);
        this._bgLayer._renderCmd.setDirtyFlag(cc.Node._dirtyFlags.transformDirty);
        this._label._renderCmd.setDirtyFlag(cc.Node._dirtyFlags.transformDirty);
        this._logo._renderCmd.setDirtyFlag(cc.Node._dirtyFlags.transformDirty);
    }
});

cc.LoaderScene.preload = function(resources, cb, target){
    var _cc = cc;
    if(!_cc.loaderScene) {
        _cc.loaderScene = new cc.LoaderScene();
        _cc.loaderScene.init();
        cc.eventManager.addCustomListener(cc.Director.EVENT_PROJECTION_CHANGED, function(){
            _cc.loaderScene._updateTransform();
        });
    }
    _cc.loaderScene.initWithResources(resources, cb, target);

    cc.director.runScene(_cc.loaderScene);
    return _cc.loaderScene;
};
