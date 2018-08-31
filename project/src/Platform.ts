/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform {
    //开放数据域
    openDataContext:any;
    //获取用户数据
    getUserInfo(): Promise<any>;
    //登陆
    login(): Promise<any>
    //分享
    showShareMenu(): Promise<any>
    shareAppMessage(title:string,imgurl:string): Promise<any>
    updateShareMenu(withticket): Promise<any>
    //带标志发送
    shareApp(title:string,imgurl:string): Promise<any>
    //显示广告
    showAD():void;
    //存储排行数据
    setUserCloudStorage(kvobj:any):void;
    getUserCloudStorage():void;
    //向数据域发消息
    sendShareData(kvobj:any):void;
    //获取启动参数
    getLaunchOptionsSync():any;

    setUserRelive(num:number):void;

    getUserRelive():Promise<any>
}

class DebugPlatform implements Platform {
    openDataContext:any;
    async getUserInfo() {
        return { nickName: "username" }
        
    }
    async login() {

    }

    async showAD(){
    }

    async setUserCloudStorage(kvobj:any){
        
    }
    async getUserCloudStorage(){
        
    }
    async showShareMenu(){

    }

    async shareAppMessage(title:string,imgurl:string): Promise<any>{}

    sendShareData(kvobj:any){}

    getLaunchOptionsSync():any{}

    async shareApp(title:string,imgurl:string): Promise<any>{}

    async updateShareMenu(withticket): Promise<any>{}
    
    async setUserRelive(num:number){

    }

    async getUserRelive():Promise<any>{

    }
}


if (!window.platform) {
    window.platform = new DebugPlatform();
}



declare let platform: Platform;

declare interface Window {

    platform: Platform
}





