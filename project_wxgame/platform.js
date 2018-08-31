/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */

class WxgamePlatform {
    name = 'wxgame'

    login() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    resolve(res)
                }
            })
        })
    }

    getUserInfo() {
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                withCredentials: true, 
                success: function (res) {
                    var userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    var gender = userInfo.gender //性别 0：未知、1：男、2：女
                    var province = userInfo.province
                    var city = userInfo.city
                    var country = userInfo.country
                    resolve(userInfo);
                }
            })
        })
    }

    sendShareData(kvdata) {
        let openDataContext = wx.getOpenDataContext()
        openDataContext.postMessage(kvdata);
    }

    shareAppMessage(title, imageUrl) {
        return new Promise((resolve, reject) => {
            wx.shareAppMessage({
                title: title,
                imageUrl: imageUrl,
                success: res => {
                    resolve(true);
                },
                fail: res => {
                    console.log(res);
                    resolve(false);
                }
            })
        })
    }
    
    updateShareMenu(withShareTicket) {
        return new Promise((resolve, reject) => {
            wx.updateShareMenu({
                withShareTicket: withShareTicket,
                success: res => {
                    resolve(res)
                },
                fail: res => {
                    resolve(false)
                }
            })
        })
    }
    shareApp(title, imageUrl) {
        return this.updateShareMenu(true).then((res) => {
            if (res) {
                return new Promise((resolve, reject) => {
                    wx.shareAppMessage({
                        title: title,
                        imageUrl: imageUrl,
                        success: res => {
                            resolve(res);
                        },
                        fail: res => {
                            console.log(res);
                            resolve(false);
                        }
                    })
                })
            }
        });
    }



    setUserCloudStorage(KVDataList) {
        return new Promise((resolve, reject) => {
                wx.setUserCloudStorage({
                    KVDataList: KVDataList,
                    success: res => {
                        console.log('success', res);
                        let openDataContext = wx.getOpenDataContext();
                        openDataContext.postMessage({
                            type: 'updateMaxScore',
                        });
                        resolve(res);
                    },
                    fail: res => {
                        console.log('fail', res);
                    }
                })
        })
    }

    getLaunchOptionsSync() {
        return wx.getLaunchOptionsSync();
    }

    showAD() {
        oldBannerAd.destroy()
        let newBannerAd = wx.createBannerAd({
            adUnitId: 'xxxx',
            style: {
                left: 10,
                top: 76,
                width: screenWidth
            }
        })
        newBannerAd.show()
    }

    getUserRelive() {
        return new Promise((resolve, reject) => {
            wx.getStorage({
                key: 'relive',
                success: function(res) {
                    resolve(res.data)
                },
                fail: function(res) {
                    resolve(false);
                }
            })
        })
    }
    
    setUserRelive(number) {
        wx.setStorage({
            key: 'relive',
            data: number,
        })
    }

    navigateToMiniProgram() {
        wx.navigateToMiniProgram({
            appId: '',
        })
    }
    
    openDataContext = new WxgameOpenDataContext();
}

class WxgameOpenDataContext {

    createDisplayObject(type, width, height) {
        const bitmapdata = new egret.BitmapData(sharedCanvas);
        bitmapdata.$deleteSource = false;
        const texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        const bitmap = new egret.Bitmap(texture);
        bitmap.width = width;
        bitmap.height = height;

        egret.startTick((timeStarmp) => {
            egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
            bitmapdata.webGLTexture = null;
            return false;
        }, this);
        return bitmap;
    }


    postMessage(data) {
        const openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage(data);
    }
}


window.platform = new WxgamePlatform(); 