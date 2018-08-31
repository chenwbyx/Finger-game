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
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            return _super.call(this) || this;
        }
        Button.prototype.Init = function (url, txt, touchfun, thisobj) {
            this._callback = touchfun;
            this._thisObj = thisobj;
            this._bit = new egret.Bitmap(RES.getRes(url));
            this._bit.scale9Grid = new egret.Rectangle(16, 21, 25, 25);
            this._bit.width = 350;
            this._bit.height = 80;
            this.addChild(this._bit);
            this._bit.x = -this._bit.width / 2;
            this._bit.y = -this._bit.height / 2;
            this._txt = new egret.TextField();
            this._txt.text = txt;
            this._txt.textColor = 0xB9FF9C;
            this._txt.x = -this._txt.textWidth / 2;
            this._txt.y = -this._txt.textHeight / 2;
            this.addChild(this._txt);
            this.touchChildren = false;
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onCancle, this);
            this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onCancle, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        };
        Button.prototype.onTab = function (e) {
            if (this._callback) {
                this._callback.call(this._thisObj);
            }
        };
        Button.prototype.onBegin = function (e) {
            this.scaleX = this.scaleY = 0.9;
        };
        Button.prototype.onEnd = function (e) {
            this.onCancle();
        };
        Button.prototype.onCancle = function (e) {
            if (e === void 0) { e = null; }
            this.scaleX = this.scaleY = 1;
        };
        return Button;
    }(egret.Sprite));
    fighter.Button = Button;
    __reflect(Button.prototype, "fighter.Button");
})(fighter || (fighter = {}));
