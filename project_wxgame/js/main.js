var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            //console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        platform.sendShareData({ command: "load" });
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    Main.prototype.onResizeStage = function (e) {
        if (e === void 0) { e = null; }
        Config.StageWidth = this.stage.stageWidth;
        Config.StageHeight = this.stage.stageHeight;
        Config.StageHalfWidth = this.stage.stageWidth / 2;
        Config.StageHalfHeight = this.stage.stageHeight / 2;
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        this.onResizeStage();
        this.addEventListener(egret.Event.RESIZE, this.onResizeStage, this);
        this.addChild(fighter.GameContainer.Inst);
        fighter.GameContainer.Inst.Init();
        platform.sendShareData({ command: "loadRes" });
        platform.sendShareData({ command: "getUserCloudStorage" });
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.showAD = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.setUserCloudStorage = function (kvobj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.getUserCloudStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.showShareMenu = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.shareAppMessage = function (title, imgurl) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    DebugPlatform.prototype.sendShareData = function (kvobj) { };
    DebugPlatform.prototype.getLaunchOptionsSync = function () { };
    DebugPlatform.prototype.shareApp = function (title, imgurl) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    DebugPlatform.prototype.updateShareMenu = function (withticket) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
var Config = (function () {
    function Config() {
    }
    Config.UserInfo = { nickName: "名字没搞到", avatarUrl: "" };
    Config.IsFirst = false;
    return Config;
}());
__reflect(Config.prototype, "Config");
var fighter;
(function (fighter) {
    var BgMap = (function (_super) {
        __extends(BgMap, _super);
        function BgMap() {
            var _this = _super.call(this) || this;
            /**控制滚动速度*/
            _this.speed = 10;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        BgMap.prototype.onAddToStage = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            var texture = this.createBitmapByName("sea_bg_png");
            this.textureHeight = texture.height; //保留原始纹理的高度，用于后续的计算
            this.rowCount = Math.ceil(this.stageH / this.textureHeight) + 1; //计算在当前屏幕中，需要的图片数量
            //egret.log(this.rowCount);
            this.bmpArr = [];
            //创建这些图片，并设置y坐标，让它们连接起来
            for (var i = 0; i < this.rowCount; i++) {
                var bgBmp = this.createBitmapByName("sea_bg_png");
                bgBmp.y = this.textureHeight * i - (this.textureHeight * this.rowCount - this.stageH);
                this.bmpArr.push(bgBmp);
                this.addChild(bgBmp);
            }
            //egret.log(this.stage.stageHeight);
        };
        BgMap.prototype.createBitmapByName = function (name) {
            var result = new egret.Bitmap();
            var texture = RES.getRes(name);
            result.texture = texture;
            return result;
        };
        /**开始滚动*/
        BgMap.prototype.start = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        };
        /**逐帧运动*/
        BgMap.prototype.enterFrameHandler = function (event) {
            if ((fighter.GameContainer.myScore / 30) % 80 == 0 && fighter.GameContainer.myScore != 0)
                this.speed = this.speed * 6 / 5;
            else if (fighter.GameContainer.myScore < 80)
                this.speed = 10;
            for (var i = 0; i < this.rowCount; i++) {
                var bgBmp = this.bmpArr[i];
                bgBmp.y += (this.speed + fighter.GameContainer.addspeed);
                //判断超出屏幕后，回到队首，这样来实现循环反复
                if (bgBmp.y > this.stageH) {
                    bgBmp.y = this.bmpArr[0].y - this.textureHeight;
                    this.bmpArr.pop();
                    this.bmpArr.unshift(bgBmp);
                }
            }
        };
        /**暂停滚动*/
        BgMap.prototype.pause = function () {
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        };
        return BgMap;
    }(egret.DisplayObjectContainer));
    fighter.BgMap = BgMap;
    __reflect(BgMap.prototype, "fighter.BgMap");
})(fighter || (fighter = {}));
var fighter;
(function (fighter) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            return _super.call(this) || this;
        }
        Button.prototype.Init = function (url, txt, touchfun, thisobj) {
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
        };
        Button.prototype.onTab = function (e) {
            if (this._callback) {
                this._callback.call(this._thisObj);
            }
        };
        Button.prototype.onBegin = function (e) {
            this.scaleX = this.scaleY = 0.9;
        };
        Button.prototype.onEnd = function (e) {
            this.onCancle();
        };
        Button.prototype.onCancle = function (e) {
            if (e === void 0) { e = null; }
            this.scaleX = this.scaleY = 1;
        };
        return Button;
    }(egret.Sprite));
    fighter.Button = Button;
    __reflect(Button.prototype, "fighter.Button");
})(fighter || (fighter = {}));
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
            //创建开始界面
            this._ui = new fighter.UI();
            this.addChild(this._ui);
            this._ui.Init();
            //创建返回按钮
            this.btnBack = this.createBitmapByName("btn_back_png");
            this.btnBack.x = (this.stageW - this.btnBack.width) / 2;
            this.btnBack.y = this.stageH * 6 / 7;
            this.btnBack.touchEnabled = true;
            this.btnBack.visible = false;
            this.addChild(this.btnBack);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_END, this.btnBackClick, this);
            //创建复活按钮
            this.btnReLive = this.createBitmapByName("btn_relive_png");
            this.btnReLive.x = (this.stageW - this.btnReLive.width) / 2;
            this.btnReLive.y = (this.stageH - this.btnReLive.height) * 8 / 10;
            this.btnReLive.touchEnabled = true;
            this.btnReLive.visible = false;
            this.addChild(this.btnReLive);
            this.btnReLive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reLiveClick, this);
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
            if (this._ui._bgmFlag)
                this.soundChannel = this.soundBgm.play(0, -1);
            //小球
            this.creatBall();
            GameContainer.myScore = 0;
            this._ui._myScoreText.text = GameContainer.myScore + "米";
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
            this.addChildAt(this.rightBall, 1);
            //egret.log("添加小球", this.numChildren);
            this.addChildAt(this.liftBall, 1);
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
            this.addChildAt(rightObstacle, 1);
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
                if (e.stageX <= this.stageW / 2) {
                    this.liftBall.x = this.RoadPosition[0] - this.liftBall.width / 2;
                }
                else if (e.stageX > this.stageW / 2) {
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
            this.reLiveText.text = this.reLiveTimer + "";
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
            if (this.stage.frameRate < 45) {
                egret.log("帧率" + this.stage.frameRate);
                egret.log(GameContainer.myScore, this.speed, GameContainer.addspeed, parseFloat(((this.obstacleCnt * this.speed) / 300).toFixed(1)));
                egret.log(this.obstacles.length);
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
        GameContainer.prototype.sleep = function (time) {
            return new Promise(function (resolve) { return setTimeout(resolve, time); });
        };
        /**游戏结束 */
        GameContainer.prototype.gameOver = function () {
            var _this = this;
            this.bg.pause();
            this._ui._shpTextCon.text = parseInt((GameContainer.myScore / 30).toString()) + "米";
            this.sleep(1000).then(function () {
                _this._ui.pause();
                _this.btnBack.visible = true;
                if (_this.reLive)
                    _this.btnReLive.visible = true;
            });
            this.soundChannel.stop();
            if (this._ui._bgmFlag)
                this.soundDead.play(0, 1);
            this.liftBall.gotoAndPlay(1, 1);
            this.rightBall.gotoAndPlay(1, 1);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveIng, this);
        };
        /**复活 */
        GameContainer.prototype.reLiveClick = function () {
            this._ui.Run();
            this.reLive = false;
            this.btnBack.visible = false;
            this.btnReLive.visible = false;
            this.liftBall.filters = [this.glowFilter];
            this.rightBall.filters = [this.glowFilter];
            this.bg.start();
            if (this._ui._bgmFlag)
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
            platform.sendShareData({ command: "setUserCloudStorage", type: parseInt((GameContainer.myScore / 30).toString()) + "" });
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
            this.btnBack.visible = false;
            if (this.reLive == true)
                this.btnReLive.visible = false;
            this.removeChild(this.liftBall);
            this.removeChild(this.rightBall);
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
var fighter;
(function (fighter) {
    var MyObject = (function (_super) {
        __extends(MyObject, _super);
        function MyObject(texture, textureName) {
            var _this = _super.call(this) || this;
            /**是否存在*/
            _this.isLive = true;
            _this.textureName = textureName;
            _this.bmp = new egret.Bitmap(texture);
            _this.addChild(_this.bmp);
            return _this;
        }
        /**生产*/
        MyObject.produce = function (textureName) {
            if (fighter.MyObject.cacheDict[textureName] == null)
                fighter.MyObject.cacheDict[textureName] = [];
            var dict = fighter.MyObject.cacheDict[textureName];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new fighter.MyObject(RES.getRes(textureName), textureName);
            }
            theFighter.isLive = true;
            return theFighter;
        };
        /**回收*/
        MyObject.reclaim = function (theFighter) {
            var textureName = theFighter.textureName;
            if (fighter.MyObject.cacheDict[textureName] == null)
                fighter.MyObject.cacheDict[textureName] = [];
            var dict = fighter.MyObject.cacheDict[textureName];
            if (dict.indexOf(theFighter) == -1)
                dict.push(theFighter);
        };
        MyObject.cacheDict = {};
        return MyObject;
    }(egret.DisplayObjectContainer));
    fighter.MyObject = MyObject;
    __reflect(MyObject.prototype, "fighter.MyObject");
})(fighter || (fighter = {}));
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
            this._mask = new egret.Shape();
            this._mask.graphics.beginFill(0x000000, 0.3);
            this._mask.graphics.drawRect(0, 0, Config.StageWidth, Config.StageHeight);
            this._mask.graphics.endFill();
            this.addChild(this._mask);
            this._shp.graphics.lineStyle(10, 0x636363);
            this._shp.graphics.beginFill(0xFFFAF0, 1);
            this._shp.graphics.drawRect(Config.StageWidth / 8, Config.StageHeight / 3, Config.StageWidth * 3 / 4, Config.StageHeight / 3);
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
            this._bgmIcon = this.createBitmapByName("bgm_open_png");
            this._bgmIcon.x = 40;
            this._bgmIcon.y = 20;
            this._bgmIcon.touchEnabled = true;
            this._bgmIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bgmControl, this);
            this.addChild(this._bgmIcon);
            this._bgmFlag = true;
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
                if (child == this._shp || child == this._shpTextTitle || child == this._shpTextCon || child == this._mask)
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
                if (child == this._myScoreText || child == this._myScoreTextBg || child == this._shp || child == this._shpTextTitle || child == this._shpTextCon)
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
;window.Main = Main;