var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config = (function () {
    function Config() {
    }
    Config.UserInfo = { nickName: "名字没搞到", avatarUrl: "" };
    Config.IsFirst = false;
    return Config;
}());
__reflect(Config.prototype, "Config");
