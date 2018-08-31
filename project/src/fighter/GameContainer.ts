module fighter {
	export class GameContainer extends egret.DisplayObjectContainer {
		private static _inst: GameContainer;
		/**@private*/
		private stageW: number;
		/**@private*/
		private stageH: number;
		/**小球 */
		private rightBall: egret.MovieClip;
		private liftBall: egret.MovieClip;
		/**障碍物 */
		private obstacles: fighter.MyObject[] = [];
		/**可滚动背景*/
		private bg: fighter.BgMap;
		/**成绩*/
		public static myScore: number = 0;
		/**速度 */
		private speed: number = 10;
		/**奖励阶段加速 */
		public static addspeed: number = 0;
		/**障碍物间隔 */
		private obstacleSpace: number[] = [1.5, 1.3, 1.4, 1, 1.5, 1.1, 1.4, 1.4, 1, 1.4, 1.3, 1.2, 1.5, 1.4, 1.3, 1.5, 1.1, 1.4];
		private obstacleNum: number = 0; //obstacleSpace的迭代器
		private obstacleCnt = 0; //每帧+1，每30使obstacleNum+1
		/**障碍物的位置 */
		private obstaclePosition: number[] = [1, 2, 3, 4, 4, 3, 2, 1, 2, 4, 2, 3, 1, 4, 1, 4, 3, 2, 4, 1, 1, 1, 4, 3, 4, 3, 2, 1, 1, 2, 3, 2, 4, 4, 3, 2, 4, 3, 2, 1, 2, 4, 2, 3, 1, 4];
		private obstaclePosCnt = 0;  //obstaclePosition的迭代器
		/**道路位置 */
		private RoadPosition: number[] = [];
		/**是否可以复活 */
		public reLive: number = -1;
		/**是否处于无敌状态 */
		private isReLiveIng: boolean = false;
		/**无敌时间*/
		private reLiveTimer: number = 5;
		/**显示无敌时间的文本 */
		private reLiveText: eui.Label = new eui.Label();
		private count: number = 0; //每帧+1，每30使reLiveTimer+1
		/**保存多点触控的每一个点 */
		private touchPoints: Object = { names: [] };
		/**发光效果 */
		private glowFilter: egret.GlowFilter = new egret.GlowFilter(0xEEDD82, 0.8, 15, 15, 10, egret.BitmapFilterQuality.HIGH, false, false);
		/**声音相关 */
		private soundBgm:egret.Sound = new egret.Sound();
		private soundDead:egret.Sound = new egret.Sound();
    	private soundChannel:egret.SoundChannel;
		/**开始界面 */
		public _ui: fighter.UI;
		/**被实例化时执行*/
		public constructor() {
			super();
		}
		public Init(): void {
			this.stageW = this.stage.stageWidth;
			this.stageH = this.stage.stageHeight;
			//创建背景
			this.bg = new fighter.BgMap();
			this.addChild(this.bg);
			//创建开始界面
			this._ui = new fighter.UI();
			this.addChild(this._ui);
			this._ui.Init();
			
			//初始化道路（轨迹）位置
			for (var i = 0; i < 4; ++i) {
				this.RoadPosition[i] = this.stageW / 8 + i * this.stageW / 4;
			}

			//显示无敌时间文本
			this.reLiveText.text = this.reLiveTimer + "";
			this.reLiveText.x = this.stageW / 2 - 10;
			this.reLiveText.y = this.stageH / 2;
			this.reLiveText.size = 50;
			//加载音乐
			this.soundInit();
		}

		private createBitmapByName(name: string): egret.Bitmap {
			let result = new egret.Bitmap();
			let texture: egret.Texture = RES.getRes(name);
			result.texture = texture;
			return result;
		}

		public static get Inst(): GameContainer {
			if (this._inst == null) {
				this._inst = new GameContainer();
			}
			return this._inst;
		}
		public soundInit():void {
			this.soundBgm.addEventListener(egret.Event.COMPLETE, function loadOver(event:egret.Event) {}, this);
			this.soundBgm.load("resource/assets/sound/BGM_InGame.mp3");
			this.soundDead.addEventListener(egret.Event.COMPLETE, function loadOver(event:egret.Event) {}, this);
			this.soundDead.load("resource/assets/sound/SE_GameOver.mp3");
    	}
		public gameStart(): void {
			this._ui.Run();
			if(this._ui._bgmFlag)
				this.soundChannel = this.soundBgm.play(0,-1);
			//小球
			this.creatBall();
			GameContainer.myScore = 0;
			this._ui._myScoreText.text = GameContainer.myScore + "米";
			this.bg.start();
			this.liftBall.gotoAndPlay(1, -1);
			this.rightBall.gotoAndPlay(1, -1);
			this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this)

			//键盘方向左右键控制小球
			var l_flag: boolean = true;
			var r_flag: boolean = true;
			window.onkeydown = (e) => {
				if (e.keyCode == 37 && l_flag == true) {
					this.touchLiftBegin();
					l_flag = false;
				}
				else if (e.keyCode == 39 && r_flag == true) {
					this.touchRightBegin();
					r_flag = false;
				}
			}
			window.onkeyup = (e) => {
				if (e.keyCode == 37 && l_flag == false) {
					this.touchLiftEnd();
					l_flag = true;
				}
				else if (e.keyCode == 39 && r_flag == false) {
					this.touchRightEnd();
					r_flag = true;
				}
			}

			//触屏控制小球
			this.touchEnabled = true;
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveIng, this);

		}

		/**创建小球 */
		private creatBall(): void {
			var LiftMcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RES.getRes("r_fish_json"), RES.getRes("r_fish_png"));
			var RightMcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RES.getRes("l_fish_json"), RES.getRes("l_fish_png"));
			this.liftBall = new egret.MovieClip(RightMcFactory.generateMovieClipData("l_fish"));
			this.rightBall = new egret.MovieClip(LiftMcFactory.generateMovieClipData("r_fish"));
			this.initBallPoition(0);
			//egret.log("添加小球", this.numChildren);
			this.addChildAt(this.rightBall, 1);
			//egret.log("添加小球", this.numChildren);
			this.addChildAt(this.liftBall, 1);
		}

		/**初始化小球位置 */
		private initBallPoition(pos: number): void {
			this.rightBall.x = this.RoadPosition[2] - this.rightBall.width / 2 + pos;
			this.rightBall.y = (this.stageH - this.rightBall.height) * 3 / 5 + pos;
			this.liftBall.x = this.RoadPosition[1] - this.liftBall.width / 2 + pos;
			this.liftBall.y = (this.stageH - this.liftBall.height) * 3 / 5 + pos;
		}

		/**创建障碍物 */
		private creatObstacle(): void {
			var rightObstacle: fighter.MyObject = fighter.MyObject.produce("sea_obstacle_" + (Math.floor(Math.random() * 5)) + "_png");
			var liftObstacle: fighter.MyObject = fighter.MyObject.produce("sea_obstacle_" + (Math.floor(Math.random() * 5)) + "_png");
			liftObstacle.x = (this.obstaclePosition[this.obstaclePosCnt] == 1 || this.obstaclePosition[this.obstaclePosCnt] == 2) ? this.RoadPosition[1] - rightObstacle.width / 2 : this.RoadPosition[0] - rightObstacle.width / 2;//Math.random()*(this.stageW-rightObstacle.width);
			rightObstacle.x = (this.obstaclePosition[this.obstaclePosCnt] == 2 || this.obstaclePosition[this.obstaclePosCnt] == 4) ? this.RoadPosition[2] - rightObstacle.width / 2 : this.RoadPosition[3] - rightObstacle.width / 2;//Math.random()*(this.stageW-liftObstacle.width);
			rightObstacle.y = -10;
			liftObstacle.y = -10;
			this.addChildAt(rightObstacle, 1);
			this.addChildAt(liftObstacle, 1);
			this.obstacles.push(rightObstacle);
			this.obstacles.push(liftObstacle);
			this.obstaclePosCnt = (++this.obstaclePosCnt) % this.obstaclePosition.length;
		}

		private touchLiftBegin(): void {
			this.liftBall.x = this.RoadPosition[0] - this.liftBall.width / 2;
		}

		private touchLiftEnd(): void {
			this.liftBall.x = this.RoadPosition[1] - this.liftBall.width / 2;
		}

		private touchRightBegin(): void {
			this.rightBall.x = this.RoadPosition[3] - this.rightBall.width / 2;
		}

		private touchRightEnd(): void {
			this.rightBall.x = this.RoadPosition[2] - this.rightBall.width / 2;
		}

		/**触摸结束 */
		private touchEnd(e: egret.TouchEvent): void {
			if (this.touchPoints[e.touchPointID].x <= this.stageW / 2) {
				this.liftBall.x = this.RoadPosition[1] - this.liftBall.width / 2;
			}
			else if (this.touchPoints[e.touchPointID].x >= this.stageW / 2) {
				this.rightBall.x = this.RoadPosition[2] - this.rightBall.width / 2;
			}
			delete this.touchPoints[e.touchPointID];
		}

		/**触摸开始 */
		private touchBegin(e: egret.TouchEvent): void {
			if (this.touchPoints[e.touchPointID] == null) {
				this.touchPoints[e.touchPointID] = new egret.Point(e.stageX, e.stageY);
				this.touchPoints["names"].push(e.touchPointID);
				if (e.stageX <= this.stageW / 2) {
					this.liftBall.x = this.RoadPosition[0] - this.liftBall.width / 2;
				}
				else if (e.stageX > this.stageW / 2) {
					this.rightBall.x = this.RoadPosition[3] - this.rightBall.width / 2;
				}
			}
		}


		/**触摸滑动 */
		private touchMoveIng(e: egret.TouchEvent): void {
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
		}

		/**画面刷新 */
		private gameViewUpdate(evt: egret.Event): void {
			if ((GameContainer.myScore / 30) % 100 == 0 && GameContainer.myScore != 0) {
				this.Invincible();
			}
			if ((GameContainer.myScore / 30) % 80 == 0 && GameContainer.myScore != 0)
				this.speed = (this.speed * 6 / 5) > 17 ? 17 : this.speed * 6 / 5;
			if (parseFloat(((++this.obstacleCnt * this.speed) / 300).toFixed(1)) == this.obstacleSpace[this.obstacleNum]) {
				this.obstacleCnt = 0;
				this.obstacleNum = (++this.obstacleNum) % this.obstacleSpace.length;
				this.creatObstacle();
			}
			var theObstacle: fighter.MyObject;
			var obstacleCount: number = this.obstacles.length;
			for (var i = 0; i < obstacleCount; i++) {
				theObstacle = this.obstacles[i];
				if (theObstacle.y > this.stageH) {
					this.removeChild(theObstacle);
					fighter.MyObject.reclaim(theObstacle);
					this.obstacles.splice(i, 1);//删除元素
					i--;
					obstacleCount--;
				}
				theObstacle.y += (this.speed + GameContainer.addspeed);
			}
			if (this.isReLiveIng == false && this.obstacleCnt & 1)
				this.gameHitTest();
			GameContainer.myScore += parseInt(((this.speed + GameContainer.addspeed) / 10).toString());
			this._ui._myScoreText.text = parseInt((GameContainer.myScore / 30).toString()) + "米";
			if (this.isReLiveIng == true && ++this.count == 60) {
				this.reLiveTimer--;
				this.count = 0;
			}
			this.reLiveText.text = this.reLiveTimer + "";
			if (this.reLiveTimer == 3) {
				GameContainer.addspeed = 0;
			}
			if (this.reLiveTimer == 0) {
				this.liftBall.filters = null;
				this.rightBall.filters = null;
				this.removeChild(this.reLiveText);
				this.isReLiveIng = false;
				this.reLiveTimer = 5;
			}
			if(this.stage.frameRate < 45){
				egret.log("帧率"+this.stage.frameRate);
				egret.log(GameContainer.myScore,this.speed,GameContainer.addspeed,parseFloat(((this.obstacleCnt*this.speed)/300).toFixed(1)));
				egret.log(this.obstacles.length);
			}
		}

		/**碰撞检测 */
		private gameHitTest(): void {
			var obstacleCount: number = this.obstacles.length;
			for (var i = 0; i < obstacleCount; ++i) {
				if (this.hitTest(this.liftBall, this.obstacles[i]) || this.hitTest(this.rightBall, this.obstacles[i]))
					this.gameOver();
			}
		}

		private hitTest(obj1: egret.MovieClip, obj2: fighter.MyObject): boolean {
			var rect1: egret.Rectangle = obj1.getBounds();
			var rect2: egret.Rectangle = obj2.getBounds();
			rect1.x = obj1.x;
			rect1.y = obj1.y;
			rect2.x = obj2.x;
			rect2.y = obj2.y;
			return rect1.intersects(rect2);
		}

		/**奖励无敌时间 */
		private Invincible(): void {
			this.liftBall.filters = [this.glowFilter];
			this.rightBall.filters = [this.glowFilter];
			this.isReLiveIng = true;
			this.reLiveTimer = 5;
			GameContainer.addspeed = 15;
			this.addChildAt(this.reLiveText, this.numChildren - 1);
		}

		private sleep(time) { 
			return new Promise((resolve) => setTimeout(resolve, time));
		}

		/**游戏结束 */
		private gameOver(): void {
			this.bg.pause();
			this._ui._shpTextCon.text = parseInt((GameContainer.myScore / 30).toString()) + "米";
			this.sleep(1000).then(() => {
				this._ui.pause();
			});
			this.soundChannel.stop();
			if(this._ui._bgmFlag)
				this.soundDead.play(0, 1);
			this.liftBall.gotoAndPlay(1, 1);
			this.rightBall.gotoAndPlay(1, 1);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveIng, this);		
		}

		/**复活 */
		public reLiveClick(): void {
			this._ui.Run();
			this.isReLiveIng = true;
			--this.reLive;
			platform.setUserRelive(this.reLive);
			fighter.GameContainer.Inst._ui._reliveText.text = this.reLive + "";
			this.liftBall.filters = [this.glowFilter];
			this.rightBall.filters = [this.glowFilter];
			this.bg.start();
			if(this._ui._bgmFlag)
				this.soundChannel = this.soundBgm.play(0, -1);
			this.initBallPoition(15);
			this.liftBall.gotoAndPlay(1, -1);
			this.rightBall.gotoAndPlay(1, -1);
			this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveIng, this);
			this.addChildAt(this.reLiveText, this.numChildren - 1);
		}

		/**返回并初始化一部分数据 */
		public btnBackClick(): void {
			this._ui.Stop();
			platform.sendShareData({ command: "setUserCloudStorage", type: parseInt((GameContainer.myScore / 30).toString()) + "" });
			var theObstacle: fighter.MyObject;
			var obstacleCount: number = this.obstacles.length;
			for (var i = 0; i < obstacleCount; i++) {
				theObstacle = this.obstacles[i];
				this.removeChild(theObstacle);
				fighter.MyObject.reclaim(theObstacle);
				this.obstacles.splice(i, 1);
				i--;
				obstacleCount--;
			}
			window.onkeydown = (e) => {
				this.gameStart();
			}
			this.removeChild(this.liftBall);
			this.removeChild(this.rightBall);
			GameContainer.myScore = 0;
			this.obstacleNum = 0;
			this.obstaclePosCnt = 0;
			this.speed = 10;
		}
	}
}