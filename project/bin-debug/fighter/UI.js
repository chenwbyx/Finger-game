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
    var UI = (function (_super) {
        __extends(UI, _super);
        function UI() {
            var _this = _super.call(this) || this;
            _this._scorePanel = 0;
            _this._groupShow = false; //从组排名进来的,显示组排名
            /**显示成绩的文本 */
            _this._myScoreText = new eui.Label();
            return _this;
        }
        UI.prototype.Init = function () {
            this._myScoreText.text = fighter.GameContainer.myScore / 30 + "米";
            this._myScoreText.anchorOffsetX = 30;
            this._myScoreText.x = Config.StageHalfWidth;
            this._myScoreText.y = 35;
            this._myScoreText.size = 35;
            this._myScoreText.visible = false;
            this._myScoreTextBg = this.createBitmapByName("sea_text_bg_png");
            this._myScoreTextBg.x = Config.StageHalfWidth - 70;
            this._myScoreTextBg.y = 10;
            this._myScoreTextBg.visible = false;
            this.addChild(this._myScoreTextBg);
            this.addChild(this._myScoreText);
            this._mask = new egret.Shape();
            this._mask.graphics.beginFill(0x000000, 0.3);
            this._mask.graphics.drawRect(0, 0, Config.StageWidth, Config.StageHeight);
            this._mask.graphics.endFill();
            this.addChild(this._mask);
            this._startBtn = new fighter.Button();
            this._startBtn.Init("btn_bg_png", "开始游戏", this.start, this);
            this.addChild(this._startBtn);
            this._friendRankBtn = new fighter.Button();
            this._friendRankBtn.Init("btn_bg_png", "好友排行", this.friendRank, this);
            this.addChild(this._friendRankBtn);
            this._groupRanktBtn = new fighter.Button();
            this._groupRanktBtn.Init("btn_bg_png", "群排行", this.clickGroup, this);
            this.addChild(this._groupRanktBtn);
            this._shareBtn = new fighter.Button();
            this._shareBtn.Init("btn_bg_png", "分享战绩", this.share, this);
            this.addChild(this._shareBtn);
            this.addEventListener(egret.Event.RESIZE, this.onResize, this);
            this.onResize(null);
        };
        UI.prototype.Run = function () {
            for (var i = 0; i < this.numChildren; i++) {
                var child = this.getChildAt(i);
                if (child == this._rankBit) {
                    continue;
                }
                if (child == this._myScoreText || child == this._myScoreTextBg)
                    child.visible = true;
                else
                    child.visible = false;
            }
        };
        UI.prototype.Stop = function () {
            for (var i = 0; i < this.numChildren; i++) {
                var child = this.getChildAt(i);
                if (child == this._rankBit) {
                    continue;
                }
                if (child == this._myScoreText || child == this._myScoreTextBg)
                    this.getChildAt(i).visible = false;
                else
                    this.getChildAt(i).visible = true;
            }
        };
        UI.prototype.onResize = function (e) {
            this._startBtn.x = Config.StageHalfWidth;
            this._startBtn.y = Config.StageHalfHeight;
            this._friendRankBtn.x = this._startBtn.x;
            this._friendRankBtn.y = this._startBtn.y + this._startBtn.height + 20;
            this._groupRanktBtn.x = this._startBtn.x;
            this._groupRanktBtn.y = this._friendRankBtn.y + this._friendRankBtn.height + 20;
            this._shareBtn.x = this._startBtn.x;
            this._shareBtn.y = this._groupRanktBtn.y + this._groupRanktBtn.height + 20;
        };
        UI.prototype.start = function () {
            fighter.GameContainer.Inst.gameStart();
        };
        UI.prototype.friendRank = function () {
            platform.sendShareData({ command: "open", type: "friend" });
            this._rankBit = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
            this._rankBit.touchEnabled = true;
            this._rankBit.pixelHitTest = true;
            this.addChild(this._rankBit);
        };
        UI.prototype.clickGroup = function () {
            var _this = this;
            var desc = "我的成绩" + this._scorePanel.toString();
            var imgurl = "resource/assets/icon" + (1 + Math.floor(Math.random() * 4)) + ".jpg";
            return new Promise(function (resolve, reject) {
                platform.updateShareMenu(true).then(function (data) {
                    console.log("updateShareMenu: ", data);
                    if (data) {
                        return platform.shareApp("群主别踢,我就是看看谁的手速最快," + desc, imgurl, desc).then(function (data) {
                            if (data && data.shareTickets && data.shareTickets.length > 0) {
                                _this.groupRank(data.shareTickets[0]);
                                resolve(true);
                            }
                            else {
                                resolve(false);
                            }
                        });
                    }
                    else {
                        resolve(false);
                    }
                });
            });
        };
        UI.prototype.groupRank = function (shareTicket) {
            platform.sendShareData({ command: "open", type: "group", groupid: shareTicket });
            this._rankBit = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
            this._rankBit.touchEnabled = true;
            this._rankBit.pixelHitTest = true;
            this.addChild(this._rankBit);
        };
        UI.prototype.share = function () {
            var desc = "我的成绩";
            var imgurl = "resource/assets/icon" + (1 + Math.floor(Math.random() * 4)) + ".jpg";
            platform.shareAppMessage("收到一封战书,谁输谁请客吃饭!" + desc, imgurl, desc);
        };
        UI.prototype.createBitmapByName = function (name) {
            var result = new egret.Bitmap();
            var texture = RES.getRes(name);
            result.texture = texture;
            return result;
        };
        return UI;
    }(egret.Sprite));
    fighter.UI = UI;
    __reflect(UI.prototype, "fighter.UI");
})(fighter || (fighter = {}));
//# sourceMappingURL=UI.js.map