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
    var GameContainer = (function (_super) {
        __extends(GameContainer, _super);
        /**被实例化时执行*/
        function GameContainer() {
            var _this = _super.call(this) || this;
            /**障碍物 */
            _this.obstacles = [];
            /**速度 */
            _this.speed = 10;
            /**障碍物间隔 */
            _this.obstacleSpace = [1.5, 1.3, 1.4, 1.3, 1.5, 1.1, 1.4, 1.5, 1, 1.4, 1.3, 1.2, 1.5];
            _this.obstacleNum = 0; //obstacleSpace的迭代器
            _this.obstacleCnt = 0; //每帧+1，每30使obstacleNum+1
            /**障碍物的位置 */
            _this.obstaclePosition = [1, 2, 3, 4, 4, 3, 2, 1, 2, 4, 2, 3, 1, 4, 1, 4, 3, 2, 4, 1, 1, 1, 4, 3, 4, 3, 2, 1];
            _this.obstaclePosCnt = 0; //obstaclePosition的迭代器
            /**道路位置 */
            _this.RoadPosition = [];
            /**是否可以复活 */
            _this.reLive = true;
            /**无敌时间*/
            _this.reLiveTimer = 5;
            /**显示无敌时间的文本 */
            _this.reLiveText = new eui.Label();
            _this.count = 0; //每帧+1，每30使reLiveTimer+1
            /**保存多点触控的每一个点 */
            _this.touchPoints = { names: [] };
            /**发光效果 */
            _this.glowFilter = new egret.GlowFilter(0xEEDD82, 0.8, 15, 15, 10, 3 /* HIGH */, false, false);
            /**声音相关 */
            _this.soundBgm = new egret.Sound();
            _this.soundDead = new egret.Sound();
            return _this;
        }
        GameContainer.prototype.Init = function () {
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            //创建背景
            this.bg = new fighter.BgMap();
            this.addChild(this.bg);
            //创建开始按钮
            this._ui = new fighter.UI();
            this.addChild(this._ui);
            this._ui.Init();
            //创建返回按钮
            this.btnBack = this.createBitmapByName("btn_back_png");
            this.btnBack.x = (this.stageW - this.btnBack.width) / 2;
            this.btnBack.y = this.stageH * 6 / 7;
            this.btnBack.touchEnabled = true;
            //创建复活按钮
            this.btnReLive = this.createBitmapByName("btn_relive_png");
            this.btnReLive.x = (this.stageW - this.btnReLive.width) / 2;
            this.btnReLive.y = (this.stageH - this.btnReLive.height) / 2;
            this.btnReLive.touchEnabled = true;
            //初始化道路（轨迹）位置
            for (var i = 0; i < 4; ++i) {
                this.RoadPosition[i] = this.stageW / 8 + i * this.stageW / 4;
            }
            //显示无敌时间文本
            this.reLiveText.text = "无敌时间：" + this.reLiveTimer + " s";
            this.reLiveText.x = this.stageW / 2 - 200;
            this.reLiveText.y = this.stageH / 2;
            this.reLiveText.size = 50;
            //创建背景音乐
            this.soundInit();
        };
        GameContainer.prototype.createBitmapByName = function (name) {
            var result = new egret.Bitmap();
            var texture = RES.getRes(name);
            result.texture = texture;
            return result;
        };
        Object.defineProperty(GameContainer, "Inst", {
            get: function () {
                if (this._inst == null) {
                    this._inst = new GameContainer();
                }
                return this._inst;
            },
            enumerable: true,
            configurable: true
        });
        GameContainer.prototype.soundInit = function () {
            this.soundBgm.addEventListener(egret.Event.COMPLETE, function loadOver(event) { }, this);
            this.soundBgm.load("resource/assets/sound/BGM_InGame.mp3");
            this.soundDead.addEventListener(egret.Event.COMPLETE, function loadOver(event) { }, this);
            this.soundDead.load("resource/assets/sound/SE_GameOver.mp3");
        };
        GameContainer.prototype.gameStart = function () {
            var _this = this;
            this._ui.Run();
            this.soundChannel = this.soundBgm.play(0, -1);
            //小球
            this.creatBall();
            GameContainer.myScore = 0;
            this._ui._myScoreText.text = GameContainer.myScore + "米";
            //this.addChild(this.myScoreTextBg);
            //this.addChild(this.myScoreText);
            this.bg.start();
            this.liftBall.gotoAndPlay(1, -1);
            this.rightBall.gotoAndPlay(1, -1);
            this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
            //键盘方向左右键控制小球
            var l_flag = true;
            var r_flag = true;
            window.onkeydown = function (e) {
                if (e.keyCode == 37 && l_flag == true) {
                    _this.touchLiftBegin();
                    l_flag = false;
                }
                else if (e.keyCode == 39 && r_flag == true) {
                    _this.touchRightBegin();
                    r_flag = false;
                }
            };
            window.onkeyup = function (e) {
                if (e.keyCode == 37 && l_flag == false) {
                    _this.touchLiftEnd();
                    l_flag = true;
                }
                else if (e.keyCode == 39 && r_flag == false) {
                    _this.touchRightEnd();
                    r_flag = true;
                }
            };
            //触屏控制小球
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveIng, this);
        };
        /**创建小球 */
        GameContainer.prototype.creatBall = function () {
            var LiftMcFactory = new egret.MovieClipDataFactory(RES.getRes("r_fish_json"), RES.getRes("r_fish_png"));
            var RightMcFactory = new egret.MovieClipDataFactory(RES.getRes("l_fish_json"), RES.getRes("l_fish_png"));
            this.liftBall = new egret.MovieClip(RightMcFactory.generateMovieClipData("l_fish"));
            this.rightBall = new egret.MovieClip(LiftMcFactory.generateMovieClipData("r_fish"));
            this.initBallPoition(0);
            //egret.log("添加小球", this.numChildren);
            this.addChildAt(this.rightBall, 3);
            //egret.log("添加小球", this.numChildren);
            this.addChildAt(this.liftBall, 3);
        };
        /**初始化小球位置 */
        GameContainer.prototype.initBallPoition = function (pos) {
            this.rightBall.x = this.RoadPosition[2] - this.rightBall.width / 2 + pos;
            this.rightBall.y = (this.stageH - this.rightBall.height) * 3 / 5 + pos;
            this.liftBall.x = this.RoadPosition[1] - this.liftBall.width / 2 + pos;
            this.liftBall.y = (this.stageH - this.liftBall.height) * 3 / 5 + pos;
        };
        /**创建障碍物 */
        GameContainer.prototype.creatObstacle = function () {
            var rightObstacle = fighter.MyObject.produce("sea_obstacle_" + (Math.floor(Math.random() * 5)) + "_png");
            var liftObstacle = fighter.MyObject.produce("sea_obstacle_" + (Math.floor(Math.random() * 5)) + "_png");
            liftObstacle.x = (this.obstaclePosition[this.obstaclePosCnt] == 1 || this.obstaclePosition[this.obstaclePosCnt] == 2) ? this.RoadPosition[1] - rightObstacle.width / 2 : this.RoadPosition[0] - rightObstacle.width / 2; //Math.random()*(this.stageW-rightObstacle.width);
            rightObstacle.x = (this.obstaclePosition[this.obstaclePosCnt] == 2 || this.obstaclePosition[this.obstaclePosCnt] == 4) ? this.RoadPosition[2] - rightObstacle.width / 2 : this.RoadPosition[3] - rightObstacle.width / 2; //Math.random()*(this.stageW-liftObstacle.width);
            rightObstacle.y = -10;
            liftObstacle.y = -10;
            //egret.log("添加障碍物",this.numChildren);
            this.addChildAt(rightObstacle, 1);
            //egret.log("添加障碍物",this.numChildren);
            this.addChildAt(liftObstacle, 1);
            this.obstacles.push(rightObstacle);
            this.obstacles.push(liftObstacle);
            this.obstaclePosCnt = (++this.obstaclePosCnt) % this.obstaclePosition.length;
        };
        GameContainer.prototype.touchLiftBegin = function () {
            this.liftBall.x = this.RoadPosition[0] - this.liftBall.width / 2;
        };
        GameContainer.prototype.touchLiftEnd = function () {
            this.liftBall.x = this.RoadPosition[1] - this.liftBall.width / 2;
        };
        GameContainer.prototype.touchRightBegin = function () {
            this.rightBall.x = this.RoadPosition[3] - this.rightBall.width / 2;
        };
        GameContainer.prototype.touchRightEnd = function () {
            this.rightBall.x = this.RoadPosition[2] - this.rightBall.width / 2;
        };
        /**触摸结束 */
        GameContainer.prototype.touchEnd = function (e) {
            if (this.touchPoints[e.touchPointID].x <= this.stageW / 2) {
                this.liftBall.x = this.RoadPosition[1] - this.liftBall.width / 2;
            }
            else if (this.touchPoints[e.touchPointID].x >= this.stageW / 2) {
                this.rightBall.x = this.RoadPosition[2] - this.rightBall.width / 2;
            }
            delete this.touchPoints[e.touchPointID];
        };
        /**触摸开始 */
        GameContainer.prototype.touchBegin = function (e) {
            if (this.touchPoints[e.touchPointID] == null) {
                this.touchPoints[e.touchPointID] = new egret.Point(e.stageX, e.stageY);
                this.touchPoints["names"].push(e.touchPointID);
                if (e.stageX <= 320) {
                    this.liftBall.x = this.RoadPosition[0] - this.liftBall.width / 2;
                }
                else if (e.stageX > 320) {
                    this.rightBall.x = this.RoadPosition[3] - this.rightBall.width / 2;
                }
            }
        };
        /**触摸滑动 */
        GameContainer.prototype.touchMoveIng = function (e) {
            if (this.touchPoints[e.touchPointID].x <= 320 && e.stageX > this.stageW / 2) {
                this.liftBall.x = this.RoadPosition[1] - this.liftBall.width / 2;
                this.rightBall.x = this.RoadPosition[3] - this.rightBall.width / 2;
            }
            else if (this.touchPoints[e.touchPointID].x >= 320 && e.stageX < this.stageW / 2) {
                this.rightBall.x = this.RoadPosition[2] - this.rightBall.width / 2;
                this.liftBall.x = this.RoadPosition[0] - this.liftBall.width / 2;
            }
            this.touchPoints[e.touchPointID].x = e.stageX;
            this.touchPoints[e.touchPointID].y = e.stageY;
        };
        /**画面刷新 */
        GameContainer.prototype.gameViewUpdate = function (evt) {
            //egret.log(GameContainer.myScore,this.speed,GameContainer.addspeed,parseFloat(((this.obstacleCnt*this.speed)/300).toFixed(1)));
            if ((GameContainer.myScore / 30) % 100 == 0 && GameContainer.myScore != 0) {
                this.Invincible();
            }
            if ((GameContainer.myScore / 30) % 80 == 0 && GameContainer.myScore != 0)
                this.speed = this.speed * 6 / 5;
            if (parseFloat(((++this.obstacleCnt * this.speed) / 300).toFixed(1)) == this.obstacleSpace[this.obstacleNum]) {
                this.obstacleCnt = 0;
                this.obstacleNum = (++this.obstacleNum) % this.obstacleSpace.length;
                this.creatObstacle();
            }
            var theObstacle;
            var obstacleCount = this.obstacles.length;
            for (var i = 0; i < obstacleCount; i++) {
                theObstacle = this.obstacles[i];
                if (theObstacle.y > this.stageH) {
                    this.removeChild(theObstacle);
                    fighter.MyObject.reclaim(theObstacle);
                    this.obstacles.splice(i, 1); //删除元素
                    i--;
                    obstacleCount--;
                }
                theObstacle.y += (this.speed + GameContainer.addspeed);
            }
            if (this.reLive == true && this.obstacleCnt & 1)
                this.gameHitTest();
            GameContainer.myScore += parseInt(((this.speed + GameContainer.addspeed) / 10).toString());
            this._ui._myScoreText.text = parseInt((GameContainer.myScore / 30).toString()) + "米";
            if (this.reLive == false && ++this.count == 60) {
                this.reLiveTimer--;
                this.count = 0;
            }
            this.reLiveText.text = "无敌时间：" + this.reLiveTimer;
            if (this.reLiveTimer == 3) {
                GameContainer.addspeed = 0;
            }
            if (this.reLiveTimer == 0) {
                this.liftBall.filters = null;
                this.rightBall.filters = null;
                this.removeChild(this.reLiveText);
                this.reLive = true;
                this.reLiveTimer = 5;
            }
        };
        /**碰撞检测 */
        GameContainer.prototype.gameHitTest = function () {
            var obstacleCount = this.obstacles.length;
            for (var i = 0; i < obstacleCount; ++i) {
                if (this.hitTest(this.liftBall, this.obstacles[i]) || this.hitTest(this.rightBall, this.obstacles[i]))
                    this.gameOver();
            }
        };
        GameContainer.prototype.hitTest = function (obj1, obj2) {
            var rect1 = obj1.getBounds();
            var rect2 = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        };
        /**奖励无敌时间 */
        GameContainer.prototype.Invincible = function () {
            this.liftBall.filters = [this.glowFilter];
            this.rightBall.filters = [this.glowFilter];
            this.reLive = false;
            this.reLiveTimer = 8;
            GameContainer.addspeed = 15;
            this.addChildAt(this.reLiveText, this.numChildren - 1);
        };
        /**游戏结束 */
        GameContainer.prototype.gameOver = function () {
            this.liftBall.filters = null;
            this.bg.pause();
            this.soundChannel.stop();
            this.soundDead.play(0, 1);
            this.liftBall.gotoAndPlay(1, 1);
            this.rightBall.gotoAndPlay(1, 1);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveIng, this);
            this.addChild(this.btnBack);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_END, this.btnBackClick, this);
            if (this.reLive) {
                this.addChild(this.btnReLive);
                this.btnReLive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reLiveClick, this);
            }
        };
        /**复活 */
        GameContainer.prototype.reLiveClick = function () {
            this.btnReLive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reLiveClick, this);
            this.reLive = false;
            this.removeChild(this.btnBack);
            this.removeChild(this.btnReLive);
            this.liftBall.filters = [this.glowFilter];
            this.rightBall.filters = [this.glowFilter];
            this.bg.start();
            this.soundChannel = this.soundBgm.play(0, -1);
            this.initBallPoition(15);
            this.liftBall.gotoAndPlay(1, -1);
            this.rightBall.gotoAndPlay(1, -1);
            this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveIng, this);
            this.addChildAt(this.reLiveText, this.numChildren - 1);
        };
        /**返回并初始化一部分数据 */
        GameContainer.prototype.btnBackClick = function () {
            var _this = this;
            this._ui.Stop();
            platform.setUserCloudStorage([{ key: "score", value: parseInt((GameContainer.myScore / 30).toString()) + "" }]);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_END, this.btnBackClick, this);
            var theObstacle;
            var obstacleCount = this.obstacles.length;
            for (var i = 0; i < obstacleCount; i++) {
                theObstacle = this.obstacles[i];
                this.removeChild(theObstacle);
                fighter.MyObject.reclaim(theObstacle);
                this.obstacles.splice(i, 1);
                i--;
                obstacleCount--;
            }
            window.onkeydown = function (e) {
                _this.gameStart();
            };
            this.removeChild(this.btnBack);
            if (this.reLive == true)
                this.removeChild(this.btnReLive);
            this.removeChild(this.liftBall);
            this.removeChild(this.rightBall);
            //this.initBallPoition(0);
            GameContainer.myScore = 0;
            this.obstacleNum = 0;
            this.obstaclePosCnt = 0;
            this.reLive = true;
            this.speed = 10;
        };
        /**成绩*/
        GameContainer.myScore = 0;
        /**奖励阶段加速 */
        GameContainer.addspeed = 0;
        return GameContainer;
    }(egret.DisplayObjectContainer));
    fighter.GameContainer = GameContainer;
    __reflect(GameContainer.prototype, "fighter.GameContainer");
})(fighter || (fighter = {}));
//# sourceMappingURL=GameContainer.js.map