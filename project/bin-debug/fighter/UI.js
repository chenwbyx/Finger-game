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
            _this._groupShow = false; //从组排名进来的,显示组排名
            /**显示成绩的文本 */
            _this._myScoreText = new eui.Label();
            /**结束后显示成绩 */
            _this._shp = new egret.Shape();
            _this._shpTextTitle = new eui.Label();
            _this._shpTextCon = new eui.Label();
            return _this;
        }
        UI.prototype.Init = function () {
            this._myScoreText.text = parseInt((fighter.GameContainer.myScore / 30).toString()) + "米";
            this._myScoreText.anchorOffsetX = 35;
            this._myScoreText.x = Config.StageHalfWidth;
            this._myScoreText.y = 75;
            this._myScoreText.size = 35;
            this._myScoreText.visible = false;
            this._myScoreTextBg = this.createBitmapByName("sea_text_bg_png");
            this._myScoreTextBg.x = Config.StageHalfWidth - 70;
            this._myScoreTextBg.y = 50;
            this._myScoreTextBg.visible = false;
            this.addChild(this._myScoreTextBg);
            this.addChild(this._myScoreText);
            this._title = this.createBitmapByName("title_png");
            this._title.x = Config.StageHalfWidth - this._title.width / 2;
            this._title.y = 200;
            this.addChild(this._title);
            this._mask = new egret.Shape();
            this._mask.graphics.beginFill(0x000000, 0.3);
            this._mask.graphics.drawRect(0, 0, Config.StageWidth, Config.StageHeight);
            this._mask.graphics.endFill();
            this.addChild(this._mask);
            this._shp.graphics.lineStyle(10, 0x636363);
            this._shp.graphics.beginFill(0xFFFAF0, 1);
            this._shp.graphics.drawRect(Config.StageWidth / 8, Config.StageHeight / 3, Config.StageWidth * 3 / 4, Config.StageHeight * 2 / 5);
            this._shp.graphics.endFill();
            this._shp.visible = false;
            this.addChild(this._shp);
            this._shpTextTitle.text = "-当前成绩-";
            this._shpTextTitle.anchorOffsetX = this._shpTextTitle.width / 2;
            this._shpTextTitle.anchorOffsetY = this._shpTextTitle.height / 2;
            this._shpTextTitle.x = Config.StageHalfWidth;
            this._shpTextTitle.y = Config.StageHeight / 3 + 50;
            this._shpTextTitle.size = 30;
            this._shpTextTitle.textColor = 0x0F0F0F;
            this._shpTextTitle.visible = false;
            this.addChild(this._shpTextTitle);
            this._shpTextCon.text = parseInt((fighter.GameContainer.myScore / 30).toString()) + "米";
            this._shpTextCon.anchorOffsetX = this._shpTextCon.width / 2;
            this._shpTextCon.anchorOffsetY = this._shpTextCon.height / 2;
            this._shpTextCon.x = Config.StageHalfWidth - 30;
            this._shpTextCon.y = Config.StageHeight / 2;
            this._shpTextCon.size = 60;
            this._shpTextCon.textColor = 0x0F0F0F;
            this._shpTextCon.visible = false;
            this.addChild(this._shpTextCon);
            //创建复活按钮
            this._btnReLive = this.createBitmapByName("btn_relive_png");
            this._btnReLive.x = (Config.StageWidth - this._btnReLive.width) / 2;
            this._btnReLive.y = (Config.StageHeight - this._btnReLive.height) * 7 / 10 - 50;
            this._btnReLive.touchEnabled = true;
            this._btnReLive.visible = false;
            this.addChild(this._btnReLive);
            this._btnReLive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.relive, this);
            //创建返回按钮
            this._btnBack = this.createBitmapByName("btn_back_png");
            this._btnBack.x = (Config.StageWidth - this._btnBack.width) / 2;
            this._btnBack.y = Config.StageHeight * 6 / 7;
            this._btnBack.touchEnabled = true;
            this._btnBack.visible = false;
            this.addChild(this._btnBack);
            this._btnBack.addEventListener(egret.TouchEvent.TOUCH_END, this.clickBack, this);
            this._bgmIcon = this.createBitmapByName("bgm_open_png");
            this._bgmIcon.x = 40;
            this._bgmIcon.y = 20;
            this._bgmIcon.touchEnabled = true;
            this._bgmIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bgmControl, this);
            this.addChild(this._bgmIcon);
            this._bgmFlag = true;
            // this._reliveIcon = this.createBitmapByName("relive_png");
            // this._reliveIcon.x = 40;
            // this._reliveIcon.y = 20;
            // this.addChild(this._reliveIcon);
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
            this._shareBtn.Init("btn_bg_png", "分享游戏", this.share, this);
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
        UI.prototype.pause = function () {
            for (var i = 0; i < this.numChildren; i++) {
                var child = this.getChildAt(i);
                if (child == this._rankBit) {
                    continue;
                }
                if (child == this._shp || child == this._shpTextTitle || child == this._shpTextCon || child == this._mask || child == this._btnBack)
                    child.visible = true;
                else if (child == this._btnReLive && fighter.GameContainer.Inst.reLive)
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
                if (child == this._myScoreText || child == this._myScoreTextBg || child == this._shp || child == this._shpTextTitle || child == this._shpTextCon || child == this._btnReLive || child == this._btnBack)
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
            //创建开放数据域显示对象
            this._rankBit = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
            this._rankBit.touchEnabled = true;
            this._rankBit.pixelHitTest = true;
            this.addChild(this._rankBit);
        };
        UI.prototype.clickGroup = function () {
            var _this = this;
            var imgurl = "resource/assets/icon.png";
            return new Promise(function (resolve, reject) {
                platform.updateShareMenu(true).then(function (data) {
                    console.log("updateShareMenu: ", data);
                    if (data) {
                        return platform.shareApp("群主别踢,我就是看看谁的手速最快。^_^", imgurl).then(function (data) {
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
            var imgurl = "resource/assets/icon.png";
            platform.shareAppMessage("收到一封战书,谁输谁请客吃饭!^_^", imgurl);
        };
        UI.prototype.relive = function () {
            // var imgurl: string = "resource/assets/icon.png";
            // platform.shareAppMessage("收到一封战书,谁输谁请客吃饭!^_^", imgurl).then((res) => {
            // 	if(res)
            // 		GameContainer.Inst.reLiveClick();
            // });
            fighter.GameContainer.Inst.reLiveClick();
        };
        UI.prototype.bgmControl = function () {
            if (this._bgmFlag) {
                this._bgmFlag = false;
                this._bgmIcon.texture = RES.getRes("bgm_close_png");
            }
            else {
                this._bgmFlag = true;
                this._bgmIcon.texture = RES.getRes("bgm_open_png");
            }
        };
        UI.prototype.clickBack = function () {
            fighter.GameContainer.Inst.btnBackClick();
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
