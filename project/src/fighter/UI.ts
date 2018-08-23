module fighter {
	export class UI extends egret.Sprite {
		public _mask: egret.Shape;
		private _startBtn: fighter.Button;
		private _friendRankBtn: fighter.Button;
		private _groupRanktBtn: fighter.Button;
		private _shareBtn: fighter.Button;
		private _rankBit: egret.Bitmap;
		private _groupShow: boolean = false;//从组排名进来的,显示组排名
		/**显示成绩的文本 */
		public _myScoreText: eui.Label = new eui.Label();
		/**显示成绩文本的背景 */
		private _myScoreTextBg: egret.Bitmap;
		/**结束后显示成绩 */
		private _shp:egret.Shape = new egret.Shape();
		private _shpTextTitle: eui.Label = new eui.Label();
		public _shpTextCon: eui.Label = new eui.Label();
		public constructor() {
			super();
		}

		public Init(): void {

			this._myScoreText.text = parseInt((GameContainer.myScore / 30).toString()) + "米";
			this._myScoreText.anchorOffsetX = 35;
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

			this._shp.graphics.lineStyle( 10, 0x636363 );
			this._shp.graphics.beginFill( 0xFFFAF0, 1);
        	this._shp.graphics.drawRect( Config.StageWidth / 8, Config.StageHeight / 3, Config.StageWidth * 3 / 4 , Config.StageHeight / 3 );
        	this._shp.graphics.endFill();
			this._shp.visible = false;
        	this.addChild( this._shp );
			this._shpTextTitle.text = "-当前成绩-";
			this._shpTextTitle.anchorOffsetX = this._shpTextTitle.width / 2;
			this._shpTextTitle.anchorOffsetY = this._shpTextTitle.height / 2;
			this._shpTextTitle.x = Config.StageHalfWidth;
			this._shpTextTitle.y = Config.StageHeight / 3 + 50;
			this._shpTextTitle.size = 30;
			this._shpTextTitle.textColor = 0x0F0F0F;
			this._shpTextTitle.visible = false;
			this.addChild(this._shpTextTitle);
			this._shpTextCon.text = parseInt((GameContainer.myScore / 30).toString()) + "米";
			this._shpTextCon.anchorOffsetX = this._shpTextCon.width / 2;
			this._shpTextCon.anchorOffsetY = this._shpTextCon.height / 2;
			this._shpTextCon.x = Config.StageHalfWidth - 30;
			this._shpTextCon.y = Config.StageHeight  / 2 ;
			this._shpTextCon.size = 60;
			this._shpTextCon.textColor = 0x0F0F0F;
			this._shpTextCon.visible = false;
			this.addChild(this._shpTextCon);

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

		public pause():void{
			for(var i:number=0;i<this.numChildren;i++)
			{
				var child:any=this.getChildAt(i);
				if (child == this._rankBit) {
					continue;
				}
				if(child == this._shp || child == this._shpTextTitle || child == this._shpTextCon || child == this._mask)
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
				if(child==this._myScoreText || child==this._myScoreTextBg || child == this._shp || child == this._shpTextTitle || child == this._shpTextCon)
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
			var imgurl: string = "resource/assets/icon.png";

			return new Promise((resolve, reject) => {
				platform.updateShareMenu(true).then(data => {
					console.log("updateShareMenu: ", data);
					if (data) {
						return platform.shareApp("群主别踢,我就是看看谁的手速最快。^_^" , imgurl).then(data => {
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
			var imgurl: string = "resource/assets/icon.png";
			platform.shareAppMessage("收到一封战书,谁输谁请客吃饭!^_^", imgurl);
		}

		private createBitmapByName(name: string): egret.Bitmap {
			let result = new egret.Bitmap();
			let texture: egret.Texture = RES.getRes(name);
			result.texture = texture;
			return result;
		}

	}
}