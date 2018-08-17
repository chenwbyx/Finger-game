var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s]);i.prototype=e.prototype,t.prototype=new i},__awaiter=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))(function(r,n){function h(t){try{a(s.next(t))}catch(e){n(e)}}function o(t){try{a(s["throw"](t))}catch(e){n(e)}}function a(t){t.done?r(t.value):new i(function(e){e(t.value)}).then(h,o)}a((s=s.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function i(t){return function(e){return s([t,e])}}function s(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(h=n[2&i[0]?"return":i[0]?"throw":"next"])&&!(h=h.call(n,i[1])).done)return h;switch(n=0,h&&(i=[0,h.value]),i[0]){case 0:case 1:h=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(h=a.trys,!(h=h.length>0&&h[h.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!h||i[1]>h[0]&&i[1]<h[3])){a.label=i[1];break}if(6===i[0]&&a.label<h[1]){a.label=h[1],h=i;break}if(h&&a.label<h[2]){a.label=h[2],a.ops.push(i);break}h[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(s){i=[6,s],n=0}finally{r=h=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var r,n,h,o,a={label:0,sent:function(){if(1&h[0])throw h[1];return h[1]},trys:[],ops:[]};return o={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o},AssetAdapter=function(){function t(){}return t.prototype.getAsset=function(t,e,i){function s(s){e.call(i,s,t)}if(RES.hasRes(t)){var r=RES.getRes(t);r?s(r):RES.getResAsync(t,s,this)}else RES.getResByUrl(t,s,this,RES.ResourceItem.TYPE_IMAGE)},t}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var LoadingUI=function(t){function e(){var e=t.call(this)||this;return e.createView(),e}return __extends(e,t),e.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},e.prototype.onProgress=function(t,e){this.textField.text="Loading..."+t+"/"+e},e}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Main=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.createChildren=function(){t.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(t){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var e=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",e),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(t){console.log(t)})},e.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(i){switch(i.label){case 0:return[4,this.loadResource()];case 1:return i.sent(),this.createGameScene(),[4,RES.getResAsync("description_json")];case 2:return t=i.sent(),this.startAnimation(t),[4,platform.login()];case 3:return i.sent(),[4,platform.getUserInfo()];case 4:return e=i.sent(),console.log(e),[2]}})})},e.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(i){switch(i.label){case 0:return i.trys.push([0,4,,5]),t=new LoadingUI,this.stage.addChild(t),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return i.sent(),[4,this.loadTheme()];case 2:return i.sent(),[4,RES.loadGroup("preload",0,t)];case 3:return i.sent(),this.stage.removeChild(t),[3,5];case 4:return e=i.sent(),console.error(e),[3,5];case 5:return[2]}})})},e.prototype.loadTheme=function(){var t=this;return new Promise(function(e,i){var s=new eui.Theme("resource/default.thm.json",t.stage);s.addEventListener(eui.UIEvent.COMPLETE,function(){e()},t)})},e.prototype.createGameScene=function(){var t=new fighter.GameContainer;this.addChild(t)},e.prototype.createBitmapByName=function(t){var e=new egret.Bitmap,i=RES.getRes(t);return e.texture=i,e},e.prototype.startAnimation=function(t){var e=this,i=new egret.HtmlTextParser,s=t.map(function(t){return i.parse(t)}),r=this.textfield,n=-1,h=function(){n++,n>=s.length&&(n=0);var t=s[n];r.textFlow=t;var i=egret.Tween.get(r);i.to({alpha:1},200),i.wait(2e3),i.to({alpha:0},200),i.call(h,e)};h()},e.prototype.onButtonClick=function(t){var e=new eui.Panel;e.title="Title",e.horizontalCenter=0,e.verticalCenter=0,this.addChild(e)},e}(eui.UILayer);__reflect(Main.prototype,"Main");var DebugPlatform=function(){function t(){}return t.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,{nickName:"username"}]})})},t.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var ThemeAdapter=function(){function t(){}return t.prototype.getTheme=function(t,e,i,s){function r(t){e.call(s,t)}function n(e){e.resItem.url==t&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,n,null),i.call(s))}var h=this;"undefined"!=typeof generateEUI?egret.callLater(function(){e.call(s,generateEUI)},this):"undefined"!=typeof generateEUI2?RES.getResByUrl("resource/gameEui.json",function(t,i){window.JSONParseClass.setData(t),egret.callLater(function(){e.call(s,generateEUI2)},h)},this,RES.ResourceItem.TYPE_JSON):(RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,n,null),RES.getResByUrl(t,r,this,RES.ResourceItem.TYPE_TEXT))},t}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);var fighter;!function(t){var e=function(t){function e(){var e=t.call(this)||this;return e.speed=10,e.addEventListener(egret.Event.ADDED_TO_STAGE,e.onAddToStage,e),e}return __extends(e,t),e.prototype.onAddToStage=function(){this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this),this.stageW=this.stage.stageWidth,this.stageH=this.stage.stageHeight;var t=this.createBitmapByName("background_1_jpg");this.textureHeight=t.height,this.rowCount=Math.ceil(this.stageH/this.textureHeight)+1,this.bmpArr=[];for(var e=0;e<this.rowCount;e++){var i=this.createBitmapByName("background_1_jpg");i.y=this.textureHeight*e-(this.textureHeight*this.rowCount-this.stageH),this.bmpArr.push(i),this.addChild(i)}},e.prototype.createBitmapByName=function(t){var e=new egret.Bitmap,i=RES.getRes(t);return e.texture=i,e},e.prototype.start=function(){this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this),this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this)},e.prototype.enterFrameHandler=function(t){for(var e=0;e<this.rowCount;e++){var i=this.bmpArr[e];i.y+=this.speed,i.y>this.stageH&&(i.y=this.bmpArr[0].y-this.textureHeight,this.bmpArr.pop(),this.bmpArr.unshift(i))}},e.prototype.pause=function(){this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this),this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this)},e}(egret.DisplayObjectContainer);t.BgMap=e,__reflect(e.prototype,"fighter.BgMap")}(fighter||(fighter={}));var fighter;!function(t){var e=function(e){function i(){var t=e.call(this)||this;return t.obstacles=[],t.myScore=0,t.speed=10,t.obstacleSpace=[1.5,1.5,1.5,1.5,2,1.5,2,1.5,1.5,2],t.obstacleNum=0,t.obstacleCnt=0,t.obstaclePosition=[1,2,3,4,1,2,2,1,2,4,2,3,1,1,1,4,3,2],t.obstaclePosCnt=0,t.RoadPosition=[],t.liftSpr=new egret.Sprite,t.rightSpr=new egret.Sprite,t.myScoreText=new eui.Label,t.reLive=!0,t.reLiveTimer=5,t.reLiveText=new eui.Label,t.count=0,t.addEventListener(egret.Event.ADDED_TO_STAGE,t.onAddToStage,t),t}return __extends(i,e),i.prototype.onAddToStage=function(t){this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this),this.creatGameSence()},i.prototype.creatGameSence=function(){this.stageW=this.stage.stageWidth,this.stageH=this.stage.stageHeight,this.bg=new t.BgMap,this.addChild(this.bg),this.btnStart=this.createBitmapByName("btn_icon_png"),this.btnStart.x=(this.stageW-this.btnStart.width)/2,this.btnStart.y=(this.stageH-this.btnStart.height)/2,this.btnStart.touchEnabled=!0,this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gameStart,this),this.addChild(this.btnStart),this.btnBack=this.createBitmapByName("btn_back_png"),this.btnBack.x=(this.stageW-this.btnStart.width)/2,this.btnBack.y=(this.stageH-this.btnStart.height)/2,this.btnBack.touchEnabled=!0,this.btnReLive=this.createBitmapByName("btn_relive_png"),this.btnReLive.x=(this.stageW-this.btnStart.width)/2,this.btnReLive.y=(this.stageH-this.btnStart.height)/2-100,this.btnReLive.touchEnabled=!0,this.liftSpr.graphics.beginFill(16777215,0),this.liftSpr.graphics.drawRect(0,0,this.stageW/2,this.stageH),this.liftSpr.graphics.endFill(),this.addChild(this.liftSpr),this.rightSpr.graphics.beginFill(16777215,0),this.rightSpr.graphics.drawRect(0,0,this.stageW/2,this.stageH),this.rightSpr.graphics.endFill(),this.rightSpr.x=this.stageW/2,this.addChild(this.rightSpr);for(var e=0;4>e;++e)this.RoadPosition[e]=this.stageW/8+e*this.stageW/4;this.creatBall(),this.myScoreText.text=this.myScore+"米",this.myScoreText.x=this.stageW/2-40,this.myScoreText.y=10,this.myScoreText.size=50,this.reLiveText.text="无敌时间："+this.reLiveTimer+" s",this.reLiveText.x=this.stageW/2-200,this.reLiveText.y=this.stageH/2,this.reLiveText.size=70},i.prototype.createBitmapByName=function(t){var e=new egret.Bitmap,i=RES.getRes(t);return e.texture=i,e},i.prototype.gameStart=function(){mouse.enable(this.stage),this.myScore=0,this.myScoreText.text=this.myScore+"米",this.addChild(this.myScoreText),this.removeChild(this.btnStart),this.bg.start(),this.liftSpr.touchEnabled=!0,this.rightSpr.touchEnabled=!0,this.liftSpr.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.moveInLiftBall,this),this.liftSpr.addEventListener(egret.TouchEvent.TOUCH_END,this.moveOutLiftBall,this),this.rightSpr.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.moveInRightBall,this),this.rightSpr.addEventListener(egret.TouchEvent.TOUCH_END,this.moveOutRightBall,this),this.addEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this)},i.prototype.creatBall=function(){this.rightBall=t.MyObject.produce("car_png"),this.liftBall=t.MyObject.produce("car_png"),this.initBallPoition(),this.addChildAt(this.rightBall,this.numChildren-1),this.addChildAt(this.liftBall,this.numChildren-1)},i.prototype.initBallPoition=function(){this.rightBall.x=this.RoadPosition[2]-this.rightBall.width/2,this.rightBall.y=3*(this.stageH-this.rightBall.height)/4,this.liftBall.x=this.RoadPosition[1]-this.liftBall.width/2,this.liftBall.y=3*(this.stageH-this.liftBall.height)/4},i.prototype.creatObstacle=function(){var e=t.MyObject.produce("obstacle_1_png"),i=t.MyObject.produce("obstacle_1_png");i.x=1==this.obstaclePosition[this.obstaclePosCnt]||2==this.obstaclePosition[this.obstaclePosCnt]?this.RoadPosition[1]-e.width/2:this.RoadPosition[0]-e.width/2,e.x=2==this.obstaclePosition[this.obstaclePosCnt]||4==this.obstaclePosition[this.obstaclePosCnt]?this.RoadPosition[2]-e.width/2:this.RoadPosition[3]-e.width/2,e.y=-10,i.y=-10,this.addChildAt(e,this.numChildren-1),this.addChildAt(i,this.numChildren-1),this.obstacles.push(e),this.obstacles.push(i),this.obstaclePosCnt=++this.obstaclePosCnt%this.obstacles.length},i.prototype.moveOutLiftBall=function(){egret.log("左结束"),this.rightSpr.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.moveInRightSpr,this),this.liftBall.x=this.RoadPosition[1]-this.liftBall.width/2},i.prototype.moveInLiftBall=function(){egret.log("左开始"),this.rightSpr.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.moveInRightSpr,this),this.liftBall.x=this.RoadPosition[0]-this.liftBall.width/2},i.prototype.moveInLiftSpr=function(t){t.stageX<this.stageW/2&&(this.liftBall.x=this.RoadPosition[0]-this.liftBall.width/2,this.moveOutRightBall())},i.prototype.moveOutRightBall=function(){egret.log("右结束"),this.liftSpr.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.moveInLiftSpr,this),this.rightBall.x=this.RoadPosition[2]-this.rightBall.width/2},i.prototype.moveInRightBall=function(){egret.log("右开始"),this.liftSpr.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.moveInLiftSpr,this),this.rightBall.x=this.RoadPosition[3]-this.rightBall.width/2},i.prototype.moveInRightSpr=function(t){t.stageX>this.stageW/2&&(this.rightBall.x=this.RoadPosition[3]-this.rightBall.width/2,this.moveOutLiftBall())},i.prototype.gameViewUpdate=function(e){++this.obstacleCnt/30==this.obstacleSpace[this.obstacleNum]&&(this.obstacleCnt=0,this.obstacleNum=++this.obstacleNum%this.obstacleSpace.length,this.creatObstacle());for(var i,s=this.obstacles.length,r=0;s>r;r++)i=this.obstacles[r],i.y>this.stageH&&(this.removeChild(i),t.MyObject.reclaim(i),this.obstacles.splice(r,1),r--,s--),i.y+=this.speed;1==this.reLive&&this.gameHitTest(),this.myScore++,this.myScoreText.text=parseInt((this.myScore/30).toString())+"米",0==this.reLive&&30==++this.count&&(this.reLiveTimer--,this.count=0),this.reLiveText.text="无敌时间："+this.reLiveTimer+" s",0!=this.reLive||7!=this.count&&22!=this.count||(this.removeChild(this.liftBall),this.removeChild(this.rightBall)),0!=this.reLive||0!=this.count&&15!=this.count||(this.addChild(this.liftBall),this.addChild(this.rightBall)),0==this.reLiveTimer&&(this.removeChild(this.reLiveText),this.reLive=!0,this.reLiveTimer=5)},i.prototype.gameHitTest=function(){for(var t=this.obstacles.length,e=0;t>e;++e)(this.hitTest(this.liftBall,this.obstacles[e])||this.hitTest(this.rightBall,this.obstacles[e]))&&this.gameOver()},i.prototype.hitTest=function(t,e){var i=t.getBounds(),s=e.getBounds();return i.x=t.x,i.y=t.y,s.x=e.x,s.y=e.y,i.intersects(s)},i.prototype.gameOver=function(){this.bg.pause(),this.removeEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this),this.liftSpr.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.moveInLiftBall,this),this.liftSpr.removeEventListener(egret.TouchEvent.TOUCH_END,this.moveOutLiftBall,this),this.rightSpr.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.moveInRightBall,this),this.rightSpr.removeEventListener(egret.TouchEvent.TOUCH_END,this.moveOutRightBall,this),this.addChild(this.btnBack),this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnBackClick,this),this.reLive&&(this.addChild(this.btnReLive),this.btnReLive.addEventListener(egret.TouchEvent.TOUCH_TAP,this.reLiveClick,this))},i.prototype.reLiveClick=function(){this.reLive=!1,this.removeChild(this.btnBack),this.removeChild(this.btnReLive),this.bg.start(),this.initBallPoition(),this.addEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this),this.liftSpr.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.moveInLiftBall,this),this.liftSpr.addEventListener(egret.TouchEvent.TOUCH_END,this.moveOutLiftBall,this),this.rightSpr.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.moveInRightBall,this),this.rightSpr.addEventListener(egret.TouchEvent.TOUCH_END,this.moveOutRightBall,this),this.reLiveText.text="无敌时间："+this.reLiveTimer+"s。",this.addChildAt(this.reLiveText,this.numChildren-1)},i.prototype.btnBackClick=function(){for(var e,i=this.obstacles.length,s=0;i>s;s++)e=this.obstacles[s],this.removeChild(e),t.MyObject.reclaim(e),this.obstacles.splice(s,1),s--,i--;this.addChild(this.btnStart),this.removeChild(this.btnBack),1==this.reLive&&this.removeChild(this.btnReLive),this.initBallPoition(),this.myScore=0,this.obstacleNum=0,this.obstaclePosCnt=0,this.reLive=!0},i}(egret.DisplayObjectContainer);t.GameContainer=e,__reflect(e.prototype,"fighter.GameContainer")}(fighter||(fighter={}));var fighter;!function(t){var e=function(e){function i(t,i){var s=e.call(this)||this;return s.isLive=!0,s.textureName=i,s.bmp=new egret.Bitmap(t),s.addChild(s.bmp),s}return __extends(i,e),i.produce=function(e){null==t.MyObject.cacheDict[e]&&(t.MyObject.cacheDict[e]=[]);var i,s=t.MyObject.cacheDict[e];return i=s.length>0?s.pop():new t.MyObject(RES.getRes(e),e),i.isLive=!0,i},i.reclaim=function(e){var i=e.textureName;null==t.MyObject.cacheDict[i]&&(t.MyObject.cacheDict[i]=[]);var s=t.MyObject.cacheDict[i];-1==s.indexOf(e)&&s.push(e)},i.cacheDict={},i}(egret.DisplayObjectContainer);t.MyObject=e,__reflect(e.prototype,"fighter.MyObject")}(fighter||(fighter={}));