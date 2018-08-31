module fighter {
	export class UI extends egret.Sprite {
		/**标题 */
		private _title: egret.Bitmap;
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
		/**声音图标 */
		private _bgmIcon: egret.Bitmap;
		public _bgmFlag: boolean;
		/**复活卡图标 */
		private _reliveIcon: egret.Bitmap;
		public _reliveText: eui.Label = new eui.Label();
		/**复活按钮 */
		private _btnReLive: egret.Bitmap;
		/**返回按钮 */
		private _btnBack: egret.Bitmap;
		public constructor() {
			super();
		}

		public Init(): void {

			this._myScoreText.text = parseInt((GameContainer.myScore / 30).toString()) + "米";
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
			this._title.x = Config.StageHalfWidth -  this._title.width / 2;
			this._title.y = 200;
			this.addChild(this._title);

			this._mask = new egret.Shape();
			this._mask.graphics.beginFill(0x000000, 0.3);
			this._mask.graphics.drawRect(0, 0, Config.StageWidth, Config.StageHeight);
			this._mask.graphics.endFill();
			this.addChild(this._mask);

			this._shp.graphics.lineStyle( 10, 0x636363 );
			this._shp.graphics.beginFill( 0xFFFAF0, 1);
        	this._shp.graphics.drawRect( Config.StageWidth / 8, Config.StageHeight / 3, Config.StageWidth * 3 / 4 , Config.StageHeight * 2 / 5 );
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

			//创建复活按钮
			this._btnReLive = this.createBitmapByName("btn_relive_png");
			this._btnReLive.x = (Config.StageWidth - this._btnReLive.width) / 2;
			this._btnReLive.y = (Config.StageHeight - this._btnReLive.height) * 7/10 - 50;
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
			this._bgmIcon.x = 240;
			this._bgmIcon.y = 45;
			this._bgmIcon.touchEnabled = true;
			this._bgmIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bgmControl, this);
			this.addChild(this._bgmIcon);
			this._bgmFlag = true;

			this._reliveIcon = this.createBitmapByName("relive_png");
			this._reliveIcon.x = 40;
			this._reliveIcon.y = 40;
			this.addChild(this._reliveIcon);
			this._reliveText.text = (fighter.GameContainer.Inst.reLive == -1 ? "" : fighter.GameContainer.Inst.reLive) + "";
			this._reliveText.x = 130
			this._reliveText.y = 50;
			this._reliveText.size = 32;
			this.addChild(this._reliveText);
			
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
				if(child == this._shp || child == this._shpTextTitle || child == this._shpTextCon || child == this._mask || child == this._btnBack || child == this._reliveIcon || child == this._reliveText)
				 	child.visible = true;
				else if (child == this._btnReLive && GameContainer.Inst.reLive > 0)
					child.visible = true;
				else
					child.visible = false;
			}
		}

		public Stop(): void {
			this._reliveText.text = (fighter.GameContainer.Inst.reLive == -1 ? "" : fighter.GameContainer.Inst.reLive) + "";
			for (var i: number = 0; i < this.numChildren; i++) {
				var child: any = this.getChildAt(i);
				if (child == this._rankBit) {
					continue;
				}
				if(child==this._myScoreText || child==this._myScoreTextBg || child == this._shp || child == this._shpTextTitle || child == this._shpTextCon || child == this._btnReLive || child == this._btnBack)
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
			//创建开放数据域显示对象
			this._rankBit = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth , this.stage.stageHeight );
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

		public share(): void {
			var imgurl: string = "resource/assets/icon.png";
			platform.shareAppMessage("收到一封战书,谁输谁请客吃饭!^_^", imgurl).then((res) => {
				if(res)
					platform.setUserRelive(++fighter.GameContainer.Inst.reLive);
				this._reliveText.text = (fighter.GameContainer.Inst.reLive == -1 ? "" : fighter.GameContainer.Inst.reLive) + "";
			});
		}

		private relive():void {
			// var imgurl: string = "resource/assets/icon.png";
			// platform.shareAppMessage("收到一封战书,谁输谁请客吃饭!^_^", imgurl).then((res) => {
			// 	if(res)
			// 		GameContainer.Inst.reLiveClick();
			// });
			GameContainer.Inst.reLiveClick();
		}

		private bgmControl():void{
			if(this._bgmFlag){
				this._bgmFlag = false;
				this._bgmIcon.texture = RES.getRes("bgm_close_png");
			}else{
				this._bgmFlag = true;
				this._bgmIcon.texture = RES.getRes("bgm_open_png");
			}
		}

		private clickBack():void {
			GameContainer.Inst.btnBackClick();
		}

		private createBitmapByName(name: string): egret.Bitmap {
			let result = new egret.Bitmap();
			let texture: egret.Texture = RES.getRes(name);
			result.texture = texture;
			return result;
		}

	}
}