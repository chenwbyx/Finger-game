module fighter {
	export class UI extends egret.Sprite {
		private _mask: egret.Shape;
		private _startBtn: fighter.Button;
		private _friendRankBtn: fighter.Button;
		private _groupRanktBtn: fighter.Button;
		private _shareBtn: fighter.Button;
		private _scorePanel: number = 0;
		private _rankBit: egret.Bitmap;
		private _groupShow: boolean = false;//从组排名进来的,显示组排名
		/**显示成绩的文本 */
		public _myScoreText: eui.Label = new eui.Label();
		/**显示成绩文本的背景 */
		private _myScoreTextBg: egret.Bitmap;

		public constructor() {
			super();
		}

		public Init(): void {

			this._myScoreText.text = GameContainer.myScore/30 + "米";
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
		}

		public Run():void
		{
			for(var i:number=0;i<this.numChildren;i++)
			{
				var child:any=this.getChildAt(i);
				if (child == this._rankBit) {
					continue;
				}
				if(child==this._myScoreText || child==this._myScoreTextBg)
				 	child.visible=true;
				else
					child.visible=false;
			}
		}

		public Stop(): void {
			for (var i: number = 0; i < this.numChildren; i++) {
				var child: any = this.getChildAt(i);
				if (child == this._rankBit) {
					continue;
				}
				if(child==this._myScoreText || child==this._myScoreTextBg)
				 	this.getChildAt(i).visible =false;
				else
					this.getChildAt(i).visible = true;
			}
		}

		private onResize(e: egret.Event): void {
			this._startBtn.x = Config.StageHalfWidth;
			this._startBtn.y = Config.StageHalfHeight

			this._friendRankBtn.x = this._startBtn.x;
			this._friendRankBtn.y = this._startBtn.y + this._startBtn.height + 20;

			this._groupRanktBtn.x = this._startBtn.x;
			this._groupRanktBtn.y = this._friendRankBtn.y + this._friendRankBtn.height + 20;

			this._shareBtn.x = this._startBtn.x;
			this._shareBtn.y = this._groupRanktBtn.y + this._groupRanktBtn.height + 20;
		}

		private start(): void {
			GameContainer.Inst.gameStart();
		}

		private friendRank(): void {
			platform.sendShareData({ command: "open", type: "friend" });
			this._rankBit = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
			this._rankBit.touchEnabled = true;
			this._rankBit.pixelHitTest = true;
			this.addChild(this._rankBit);
		}

		private clickGroup() {
			var desc: string = "我的成绩" + this._scorePanel.toString();
			var imgurl: string = "resource/assets/icon" + (1 + Math.floor(Math.random() * 4)) + ".jpg";

			return new Promise((resolve, reject) => {
				platform.updateShareMenu(true).then(data => {
					console.log("updateShareMenu: ", data);
					if (data) {
						return platform.shareApp("群主别踢,我就是看看谁的手速最快," + desc, imgurl, desc).then(data => {
							if (data && data.shareTickets && data.shareTickets.length > 0) {
								this.groupRank(data.shareTickets[0]);
								resolve(true);
							} else {
								resolve(false);
							}
						});
					} else {
						resolve(false);
					}
				})
			});
		}

		private groupRank(shareTicket): void {
			platform.sendShareData({ command: "open", type: "group", groupid: shareTicket });
			this._rankBit = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
			this._rankBit.touchEnabled = true;
			this._rankBit.pixelHitTest = true;
			this.addChild(this._rankBit);
		}

		private share(): void {
			var desc: string = "我的成绩";
			var imgurl: string = "resource/assets/icon" + (1 + Math.floor(Math.random() * 4)) + ".jpg";
			platform.shareAppMessage("收到一封战书,谁输谁请客吃饭!" + desc, imgurl, desc);
		}

		private createBitmapByName(name: string): egret.Bitmap {
			let result = new egret.Bitmap();
			let texture: egret.Texture = RES.getRes(name);
			result.texture = texture;
			return result;
		}

	}
}