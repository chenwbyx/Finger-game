module fighter {
	export class MyObject extends egret.DisplayObjectContainer{

		private static cacheDict:Object = {};
        /**生产*/
        public static produce(textureName:string):fighter.MyObject
        {	
            if(fighter.MyObject.cacheDict[textureName]==null)
                fighter.MyObject.cacheDict[textureName] = [];
            var dict:fighter.MyObject[] = fighter.MyObject.cacheDict[textureName];
            var theFighter:fighter.MyObject;
            if(dict.length>0) {
                theFighter = dict.pop();
            } else {
                theFighter = new fighter.MyObject(RES.getRes(textureName),textureName);
            }
            theFighter.isLive = true;
            return theFighter;
        }
        /**回收*/
        public static reclaim(theFighter:fighter.MyObject):void
        {
			var textureName: string = theFighter.textureName;
            if(fighter.MyObject.cacheDict[textureName]==null)
                fighter.MyObject.cacheDict[textureName] = [];
            var dict:fighter.MyObject[] = fighter.MyObject.cacheDict[textureName];
            if(dict.indexOf(theFighter)==-1)
                dict.push(theFighter);
        }

		/**图 */
		public bmp:egret.Bitmap;
		/**是否存在*/
        public isLive:boolean = true;
		/**名字 */
		public textureName:string;
		public constructor(texture:egret.Texture,textureName:string) {
            super();
			this.textureName = textureName;
            this.bmp = new egret.Bitmap(texture);
            this.addChild(this.bmp);
        }
	}
}