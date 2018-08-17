var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);i.prototype=e.prototype,t.prototype=new i},__awaiter=this&&this.__awaiter||function(t,e,i,r){return new(i||(i=Promise))(function(s,n){function o(t){try{h(r.next(t))}catch(e){n(e)}}function a(t){try{h(r["throw"](t))}catch(e){n(e)}}function h(t){t.done?s(t.value):new i(function(e){e(t.value)}).then(o,a)}h((r=r.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function i(t){return function(e){return r([t,e])}}function r(i){if(s)throw new TypeError("Generator is already executing.");for(;h;)try{if(s=1,n&&(o=n[2&i[0]?"return":i[0]?"throw":"next"])&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[0,o.value]),i[0]){case 0:case 1:o=i;break;case 4:return h.label++,{value:i[1],done:!1};case 5:h.label++,n=i[1],i=[0];continue;case 7:i=h.ops.pop(),h.trys.pop();continue;default:if(o=h.trys,!(o=o.length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){h=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){h.label=i[1];break}if(6===i[0]&&h.label<o[1]){h.label=o[1],o=i;break}if(o&&h.label<o[2]){h.label=o[2],h.ops.push(i);break}o[2]&&h.ops.pop(),h.trys.pop();continue}i=e.call(t,h)}catch(r){i=[6,r],n=0}finally{s=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var s,n,o,a,h={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},AssetAdapter=function(){function t(){}return t.prototype.getAsset=function(t,e,i){function r(r){e.call(i,r,t)}if(RES.hasRes(t)){var s=RES.getRes(t);s?r(s):RES.getResAsync(t,r,this)}else RES.getResByUrl(t,r,this,RES.ResourceItem.TYPE_IMAGE)},t}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var LoadingUI=function(t){function e(){var e=t.call(this)||this;return e.createView(),e}return __extends(e,t),e.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},e.prototype.onProgress=function(t,e){this.textField.text="Loading..."+t+"/"+e},e}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Main=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.createChildren=function(){t.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(t){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var e=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",e),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(t){console.log(t)})},e.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(i){switch(i.label){case 0:return[4,this.loadResource()];case 1:return i.sent(),this.createGameScene(),[4,RES.getResAsync("description_json")];case 2:return t=i.sent(),this.startAnimation(t),[4,platform.login()];case 3:return i.sent(),[4,platform.getUserInfo()];case 4:return e=i.sent(),console.log(e),[2]}})})},e.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(i){switch(i.label){case 0:return i.trys.push([0,4,,5]),t=new LoadingUI,this.stage.addChild(t),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return i.sent(),[4,this.loadTheme()];case 2:return i.sent(),[4,RES.loadGroup("preload",0,t)];case 3:return i.sent(),this.stage.removeChild(t),[3,5];case 4:return e=i.sent(),console.error(e),[3,5];case 5:return[2]}})})},e.prototype.loadTheme=function(){var t=this;return new Promise(function(e,i){var r=new eui.Theme("resource/default.thm.json",t.stage);r.addEventListener(eui.UIEvent.COMPLETE,function(){e()},t)})},e.prototype.createGameScene=function(){var t=new fighter.GameContainer;this.addChild(t)},e.prototype.createBitmapByName=function(t){var e=new egret.Bitmap,i=RES.getRes(t);return e.texture=i,e},e.prototype.startAnimation=function(t){var e=this,i=new egret.HtmlTextParser,r=t.map(function(t){return i.parse(t)}),s=this.textfield,n=-1,o=function(){n++,n>=r.length&&(n=0);var t=r[n];s.textFlow=t;var i=egret.Tween.get(s);i.to({alpha:1},200),i.wait(2e3),i.to({alpha:0},200),i.call(o,e)};o()},e.prototype.onButtonClick=function(t){var e=new eui.Panel;e.title="Title",e.horizontalCenter=0,e.verticalCenter=0,this.addChild(e)},e}(eui.UILayer);__reflect(Main.prototype,"Main");var DebugPlatform=function(){function t(){}return t.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,{nickName:"username"}]})})},t.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var ThemeAdapter=function(){function t(){}return t.prototype.getTheme=function(t,e,i,r){function s(t){e.call(r,t)}function n(e){e.resItem.url==t&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,n,null),i.call(r))}var o=this;"undefined"!=typeof generateEUI?egret.callLater(function(){e.call(r,generateEUI)},this):"undefined"!=typeof generateEUI2?RES.getResByUrl("resource/gameEui.json",function(t,i){window.JSONParseClass.setData(t),egret.callLater(function(){e.call(r,generateEUI2)},o)},this,RES.ResourceItem.TYPE_JSON):(RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,n,null),RES.getResByUrl(t,s,this,RES.ResourceItem.TYPE_TEXT))},t}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);var fighter;!function(t){var e=function(t){function e(){var e=t.call(this)||this;return e.speed=8,e._lastTime=egret.getTimer(),e.addEventListener(egret.Event.ADDED_TO_STAGE,e.onAddToStage,e),e}return __extends(e,t),e.prototype.onAddToStage=function(t){this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this),this.stageW=this.stage.stageWidth,this.stageH=this.stage.stageHeight;var e=this.createBitmapByName("background_2_jpg");this.textureHeight=e.height,this.rowCount=Math.ceil(this.stageH/this.textureHeight)+1,this.bmpArr=[];for(var i=0;i<this.rowCount;i++){var r=this.createBitmapByName("background_2_jpg");r.y=this.textureHeight*i-(this.textureHeight*this.rowCount-this.stageH),this.bmpArr.push(r),this.addChild(r)}},e.prototype.createBitmapByName=function(t){var e=new egret.Bitmap,i=RES.getRes(t);return e.texture=i,e},e.prototype.start=function(){this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this),this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this)},e.prototype.enterFrameHandler=function(t){var e=egret.getTimer(),i=1e3/(e-this._lastTime);this._lastTime=e,this.speed=60/i;for(var r=0;r<this.rowCount;r++){var s=this.bmpArr[r];s.y+=6*this.speed,s.y>this.stageH&&(s.y=this.bmpArr[0].y-this.textureHeight,this.bmpArr.pop(),this.bmpArr.unshift(s))}},e.prototype.pause=function(){this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this),this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this)},e}(egret.DisplayObjectContainer);t.BgMap=e,__reflect(e.prototype,"fighter.BgMap")}(fighter||(fighter={}));var fighter;!function(t){var e=function(e){function i(){var t=e.call(this)||this;return t.obstacles=[],t.myScore=0,t.speed=0,t.obstacleSpace=[1.5,2,1.5,2,1.5,2,1.5,1.5,3],t.obstacleNum=0,t.obstacleCnt=0,t.obstaclePosition=[1,2,3,4,1,2,2,1],t.obstaclePosCnt=0,t.RoadPosition=[],t.liftSpr=new egret.Sprite,t.rightSpr=new egret.Sprite,t.myScoreText=new eui.Label,t._lastTime=egret.getTimer(),t.addEventListener(egret.Event.ADDED_TO_STAGE,t.onAddToStage,t),t}return __extends(i,e),i.prototype.onAddToStage=function(t){this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this),this.creatGameSence()},i.prototype.creatGameSence=function(){this.stageW=this.stage.stageWidth,this.stageH=this.stage.stageHeight,this.bg=new t.BgMap,this.addChild(this.bg),this.btnStart=this.createBitmapByName("btn_icon_png"),this.btnStart.x=(this.stageW-this.btnStart.width)/2,this.btnStart.y=(this.stageH-this.btnStart.height)/2,this.btnStart.touchEnabled=!0,this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gameStart,this),this.addChild(this.btnStart),this.btnBack=this.createBitmapByName("btn_back_png"),this.btnBack.x=(this.stageW-this.btnStart.width)/2,this.btnBack.y=(this.stageH-this.btnStart.height)/2,this.btnBack.touchEnabled=!0,this.liftSpr.graphics.beginFill(16777215,0),this.liftSpr.graphics.drawRect(0,0,this.stageW/2,this.stageH),this.liftSpr.graphics.endFill(),this.addChild(this.liftSpr),this.rightSpr.graphics.beginFill(16777215,0),this.rightSpr.graphics.drawRect(0,0,this.stageW/2,this.stageH),this.rightSpr.graphics.endFill(),this.rightSpr.x=this.stageW/2,this.addChild(this.rightSpr);for(var e=0;4>e;++e)this.RoadPosition[e]=this.stageW/8+e*this.stageW/4;this.creatBall()},i.prototype.createBitmapByName=function(t){var e=new egret.Bitmap,i=RES.getRes(t);return e.texture=i,e},i.prototype.gameStart=function(){this.myScore=0,this.myScoreText.text=this.myScore+"米",this.myScoreText.x=this.stageW/2-this.myScoreText.x/2,this.myScoreText.y=10,this.addChild(this.myScoreText),this.removeChild(this.btnStart),this.bg.start(),this.liftSpr.touchEnabled=!0,this.rightSpr.touchEnabled=!0,this.liftSpr.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.moveLiftBall,this),this.liftSpr.addEventListener(egret.TouchEvent.TOUCH_END,this.moveLiftBall,this),this.liftSpr.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onLiftMoveIng,this),this.rightSpr.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.mvoeRightBall,this),this.rightSpr.addEventListener(egret.TouchEvent.TOUCH_END,this.mvoeRightBall,this),this.rightSpr.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onRightMoveIng,this),this.addEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this)},i.prototype.creatBall=function(){this.rightBall=t.MyObject.produce("car_png"),this.liftBall=t.MyObject.produce("car_png"),this.initBallPoition(),this.addChildAt(this.rightBall,this.numChildren-1),this.addChildAt(this.liftBall,this.numChildren-1)},i.prototype.initBallPoition=function(){this.rightBall.x=this.RoadPosition[2]-this.rightBall.width/2,this.rightBall.y=3*(this.stageH-this.rightBall.height)/4,this.liftBall.x=this.RoadPosition[1]-this.liftBall.width/2,this.liftBall.y=3*(this.stageH-this.liftBall.height)/4},i.prototype.creatObstacle=function(){var e=t.MyObject.produce("obstacle_1_png"),i=t.MyObject.produce("obstacle_1_png");i.x=1==this.obstaclePosition[this.obstaclePosCnt]||2==this.obstaclePosition[this.obstaclePosCnt]?this.RoadPosition[1]-e.width/2:this.RoadPosition[0]-e.width/2,e.x=2==this.obstaclePosition[this.obstaclePosCnt]||4==this.obstaclePosition[this.obstaclePosCnt]?this.RoadPosition[2]-e.width/2:this.RoadPosition[3]-e.width/2,e.y=-10,i.y=-10,this.addChildAt(e,this.numChildren-1),this.addChildAt(i,this.numChildren-1),this.obstacles.push(e),this.obstacles.push(i),this.obstaclePosCnt=++this.obstaclePosCnt%this.obstacles.length},i.prototype.moveLiftBall=function(){egret.log("点击左边"),this.liftBall.x>this.stageW/4?this.liftBall.x=this.RoadPosition[0]-this.liftBall.width/2:this.liftBall.x=this.RoadPosition[1]-this.liftBall.width/2},i.prototype.onLiftMoveIng=function(t){egret.log(t.stageX,t.stageY,this.stageW/2);var e=!0;e&&t.stageX>this.stageW/2&&(e=!1,this.moveLiftBall())},i.prototype.mvoeRightBall=function(){egret.log("点击右边"),this.rightBall.x<3*this.stageW/4?this.rightBall.x=this.RoadPosition[3]-this.rightBall.width/2:this.rightBall.x=this.RoadPosition[2]-this.rightBall.width/2},i.prototype.onRightMoveIng=function(t){egret.log(t.stageX,t.stageY);var e=!0;e&&t.stageX<this.stageW/2&&(e=!1,this.mvoeRightBall())},i.prototype.gameViewUpdate=function(e){var i=egret.getTimer(),r=1e3/(i-this._lastTime);this._lastTime=i,this.speed=60/r,++this.obstacleCnt/30==this.obstacleSpace[this.obstacleNum]&&(this.obstacleCnt=0,this.obstacleNum=++this.obstacleNum%this.obstacleSpace.length,this.creatObstacle());for(var s,n=this.obstacles.length,o=0;n>o;o++)s=this.obstacles[o],s.y>this.stageH&&(this.removeChild(s),t.MyObject.reclaim(s),this.obstacles.splice(o,1),o--,n--),s.y+=6*this.speed;this.gameHitTest(),this.myScore++,this.myScoreText.text=parseInt((this.myScore/30).toString())+"米"},i.prototype.gameHitTest=function(){for(var t=this.obstacles.length,e=0;t>e;++e)(this.hitTest(this.liftBall,this.obstacles[e])||this.hitTest(this.rightBall,this.obstacles[e]))&&this.gameOver()},i.prototype.hitTest=function(t,e){var i=t.getBounds(),r=e.getBounds();return i.x=t.x,i.y=t.y,r.x=e.x,r.y=e.y,i.intersects(r)},i.prototype.gameOver=function(){this.bg.pause(),this.removeEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this),this.liftSpr.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.moveLiftBall,this),this.liftSpr.removeEventListener(egret.TouchEvent.TOUCH_END,this.moveLiftBall,this),this.liftSpr.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onLiftMoveIng,this),this.rightSpr.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.mvoeRightBall,this),this.rightSpr.removeEventListener(egret.TouchEvent.TOUCH_END,this.mvoeRightBall,this),this.rightSpr.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onRightMoveIng,this),this.addChild(this.btnBack),this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnBackClick,this)},i.prototype.btnBackClick=function(){for(var e,i=this.obstacles.length,r=0;i>r;r++)e=this.obstacles[r],this.removeChild(e),t.MyObject.reclaim(e),this.obstacles.splice(r,1),r--,i--;this.addChild(this.btnStart),this.removeChild(this.btnBack),this.initBallPoition(),this.myScore=0,this.obstacleNum=0,this.obstaclePosCnt=0},i}(egret.DisplayObjectContainer);t.GameContainer=e,__reflect(e.prototype,"fighter.GameContainer")}(fighter||(fighter={}));var fighter;!function(t){var e=function(e){function i(t,i){var r=e.call(this)||this;return r.isLive=!0,r.textureName=i,r.bmp=new egret.Bitmap(t),r.addChild(r.bmp),r}return __extends(i,e),i.produce=function(e){null==t.MyObject.cacheDict[e]&&(t.MyObject.cacheDict[e]=[]);var i,r=t.MyObject.cacheDict[e];return i=r.length>0?r.pop():new t.MyObject(RES.getRes(e),e),i.isLive=!0,i},i.reclaim=function(e){var i=e.textureName;null==t.MyObject.cacheDict[i]&&(t.MyObject.cacheDict[i]=[]);var r=t.MyObject.cacheDict[i];-1==r.indexOf(e)&&r.push(e)},i.cacheDict={},i}(egret.DisplayObjectContainer);t.MyObject=e,__reflect(e.prototype,"fighter.MyObject")}(fighter||(fighter={}));