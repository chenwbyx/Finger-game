module fighter {
	export class Button extends egret.Sprite {
		private _bit: egret.Bitmap;
		private _txt: egret.TextField;
		private _callback: Function;
		private _thisObj: any;
		public constructor() {
			super();
		}

		public Init(url: string, txt: string, touchfun: Function, thisobj: any): void {
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
		}
		private onTab(e: egret.TouchEvent): void {
			if (this._callback) {
				this._callback.call(this._thisObj);
			}
		}

		private onBegin(e: egret.TouchEvent): void {
			this.scaleX = this.scaleY = 0.9;
		}

		private onEnd(e: egret.TouchEvent): void {
			this.onCancle();
		}

		private onCancle(e: egret.TouchEvent = null): void {
			this.scaleX = this.scaleY = 1;
		}

	}
}