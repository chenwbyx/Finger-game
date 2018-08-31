var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var fighter;
(function (fighter) {
    var MyObject = (function (_super) {
        __extends(MyObject, _super);
        function MyObject(texture, textureName) {
            var _this = _super.call(this) || this;
            /**是否存在*/
            _this.isLive = true;
            _this.textureName = textureName;
            _this.bmp = new egret.Bitmap(texture);
            _this.addChild(_this.bmp);
            return _this;
        }
        /**生产*/
        MyObject.produce = function (textureName) {
            if (fighter.MyObject.cacheDict[textureName] == null)
                fighter.MyObject.cacheDict[textureName] = [];
            var dict = fighter.MyObject.cacheDict[textureName];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new fighter.MyObject(RES.getRes(textureName), textureName);
            }
            theFighter.isLive = true;
            return theFighter;
        };
        /**回收*/
        MyObject.reclaim = function (theFighter) {
            var textureName = theFighter.textureName;
            if (fighter.MyObject.cacheDict[textureName] == null)
                fighter.MyObject.cacheDict[textureName] = [];
            var dict = fighter.MyObject.cacheDict[textureName];
            if (dict.indexOf(theFighter) == -1)
                dict.push(theFighter);
        };
        MyObject.cacheDict = {};
        return MyObject;
    }(egret.DisplayObjectContainer));
    fighter.MyObject = MyObject;
    __reflect(MyObject.prototype, "fighter.MyObject");
})(fighter || (fighter = {}));
