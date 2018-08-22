/**
 * 微信开放数据域
 * 使用 Canvas2DAPI 在 SharedCanvas 渲染一个排行榜，
 * 并在主域中渲染此 SharedCanvas
 */







/**
 * 资源加载组，将所需资源地址以及引用名进行注册
 * 之后可通过assets.引用名方式进行获取
 */
const assetsUrl = {
    icon: "openDataContext/assets/icon.png",
    box: "openDataContext/assets/box.png",
    panel: "openDataContext/assets/panel.png",
    button_l: "openDataContext/assets/button_l.png",
    button_r: "openDataContext/assets/button_r.png",
    title: "openDataContext/assets/rankingtitle.png",
    close: "openDataContext/assets/close.png"
};

/**
 * 资源加载组，将所需资源地址以及引用名进行注册
 * 之后可通过assets.引用名方式进行获取
 */
let assets = {};
console.log();
/**
 * canvas 大小
 * 这里暂时写死
 * 需要从主域传入
 */
let canvasWidth;
let canvasHeight;

let userScore = 0;

//获取canvas渲染上下文
const context = sharedCanvas.getContext("2d");
context.globalCompositeOperation = "source-over";


/**
 * 所有头像数据
 * 包括姓名，头像图片，得分
 * 排位序号i会根据parge*perPageNum+i+1进行计算
 */
var totalGroup = [
    //{
    //     key: 1,
    //     name: "1111111111",
    //     url: assets.icon,
    //     scroes: 10000
    //   },
    //   {
    //     key: 2,
    //     name: "2222222222",
    //     url: assets.icon,
    //     scroes: 9000
    //   },
    //   {
    //     key: 3,
    //     name: "3333333",
    //     url: assets.icon,
    //     scroes: 8000
    //   },
    //   {
    //     key: 4,
    //     name: "4444444",
    //     url: assets.icon,
    //     scroes: 7000
    //   },
    //   {
    //     key: 5,
    //     name: "55555555",
    //     url: assets.icon,
    //     scroes: 6000
    //   },

];

/**
 * 创建排行榜
 */
function drawRankPanel() {
    //绘制背景
    context_drawImage(assets.panel, offsetX_rankToBorder, offsetY_rankToBorder, rankWidth, rankHeight);
    //绘制标题
    const title = assets.title;
    //根据title的宽高计算一下位置;
    const titleX = offsetX_rankToBorder + (rankWidth - title.width) / 2;
    const titleY = offsetY_rankToBorder + title.height + 40;
    context_drawImage(title, titleX, titleY);
    //获取当前要渲染的数据组

    //起始id
    const startID = perPageMaxNum * page;
    currentGroup = totalGroup.slice(startID, startID + perPageMaxNum);
    //创建头像Bar
    drawRankByGroup(currentGroup);
    //创建按钮
    drawButton();
    drawCloseButton();
}
/**
 * 根据屏幕大小初始化所有绘制数据
 */
function init() {
    //排行榜绘制数据初始化,可以在此处进行修改
    rankWidth = stageWidth * 4 / 5;
    rankHeight = stageHeight * 4 / 5;
    barWidth = rankWidth * 4 / 5;
    barHeight = rankWidth / perPageMaxNum;
    offsetX_rankToBorder = (stageWidth - rankWidth) / 2;
    offsetY_rankToBorder = (stageHeight - rankHeight) / 2;
    preOffsetY = (rankHeight - barHeight) / (perPageMaxNum + 1);
    fontSize = Math.floor(stageWidth / 25);
    startX = offsetX_rankToBorder + (rankWidth - barWidth) / 2;
    startY = offsetY_rankToBorder + preOffsetY;
    avatarSize = barHeight - 10;
    intervalX = barWidth / 20;
    textOffsetY = (barHeight + fontSize) / 2;
    textMaxSize = barWidth / 3;
    indexWidth = context.measureText("99").width;

    //按钮绘制数据初始化
    buttonWidth = barWidth / 3;
    buttonHeight = barHeight / 2;
    buttonOffset = rankWidth / 3;
    lastButtonX = offsetX_rankToBorder + buttonOffset - buttonWidth;
    nextButtonX = offsetX_rankToBorder + 2 * buttonOffset;
    nextButtonY = lastButtonY = offsetY_rankToBorder + rankHeight - 50 - buttonHeight;
    let data = wx.getSystemInfoSync();
    canvasWidth = data.windowWidth;
    canvasHeight = data.windowHeight;
    //关闭按钮
    closeBtnWidth = barHeight / 2;
    closeBtnHeight = barHeight / 2;
    closeBtnX = offsetX_rankToBorder + rankWidth - closeBtnWidth / 2;
    closeBtnY = offsetY_rankToBorder - closeBtnWidth / 2;
}

function drawCloseButton() {
    context_drawImage(assets.close, closeBtnX, closeBtnY, closeBtnWidth, closeBtnHeight);
}

/**
 * 创建两个点击按钮
 */
function drawButton() {
    context_drawImage(assets.button_r, nextButtonX, nextButtonY, buttonWidth, buttonHeight);
    context_drawImage(assets.button_l, lastButtonX, lastButtonY, buttonWidth, buttonHeight);
}


/**
 * 根据当前绘制组绘制排行榜
 */
function drawRankByGroup(currentGroup) {
    for (let i = 0; i < currentGroup.length; i++) {
        const data = currentGroup[i];
        drawByData(data, i);
    }
}

/**
 * 根据绘制信息以及当前i绘制元素
 */
function drawByData(data, i) {
    let x = startX;
    //绘制底框
    context_drawImage(assets.box, startX, startY + i * preOffsetY, barWidth, barHeight);
    x += 10;
    //设置字体
    context.font = fontSize + "px Arial";
    context.fillStyle = "0xffffff";
    //绘制序号
    context.fillText(data.key + 1 + "", x, startY + i * preOffsetY + textOffsetY, textMaxSize);
    x += indexWidth + intervalX;
    //绘制头像
    var image = wx.createImage();
    image.src = data.url
    image.onload = function () {
        renderDirty = true;
    }
    context.drawImage(image, x, startY + i * preOffsetY + (barHeight - avatarSize) / 2, avatarSize, avatarSize);
    x += avatarSize + intervalX;
    //context_drawImage(assets.icon, x, startY + i * preOffsetY + (barHeight - avatarSize) / 2, avatarSize, avatarSize);
    //x += avatarSize + intervalX;
    //绘制名称
    context.fillText(data.name + "", x, startY + i * preOffsetY + textOffsetY, textMaxSize);
    x += textMaxSize + intervalX;
    //绘制分数
    context.fillText(parseInt(data.scroes) + "米", x, startY + i * preOffsetY + textOffsetY, textMaxSize);
}

/**
 * 点击处理
 */
function onTouchEnd(event) {
    let x = event.clientX * sharedCanvas.width / canvasWidth;
    let y = event.clientY * sharedCanvas.height / canvasHeight;
    if (x > lastButtonX && x < lastButtonX + buttonWidth &&
        y > lastButtonY && y < lastButtonY + buttonHeight) {
        //在last按钮的范围内
        if (page > 0) {
            buttonClick(0);

        }
    }
    if (x > nextButtonX && x < nextButtonX + buttonWidth &&
        y > nextButtonY && y < nextButtonY + buttonHeight) {
        //在next按钮的范围内
        if ((page + 1) * perPageMaxNum < totalGroup.length) {
            buttonClick(1);
        }
    }
    if (x > closeBtnX && x < closeBtnX + closeBtnWidth &&
        y > closeBtnY && y < closeBtnY + closeBtnHeight) {
        
        cancelAnimationFrame(requestAnimationFrameID);
        requestAnimationFrameID = null;
        context.clearRect(offsetX_rankToBorder - closeBtnWidth / 2, offsetY_rankToBorder - closeBtnWidth / 2, rankWidth + closeBtnWidth ,rankHeight + closeBtnHeight);
        console.log("close");
    }
}
/**
 * 根据传入的buttonKey 执行点击处理
 * 0 为上一页按钮
 * 1 为下一页按钮
 */
function buttonClick(buttonKey) {
    let old_buttonY;
    if (buttonKey == 0) {
        //上一页按钮
        old_buttonY = lastButtonY;
        lastButtonY += 10;
        page--;
        renderDirty = true;
        console.log('上一页' + page);
        setTimeout(() => {
            lastButtonY = old_buttonY;
            //重新渲染必须标脏
            renderDirty = true;
        }, 100);
    } else if (buttonKey == 1) {
        //下一页按钮
        old_buttonY = nextButtonY;
        nextButtonY += 10;
        page++;
        renderDirty = true;
        console.log('下一页' + page);
        setTimeout(() => {
            nextButtonY = old_buttonY;
            //重新渲染必须标脏
            renderDirty = true;
        }, 100);
    }

}

/////////////////////////////////////////////////////////////////// 相关缓存数据

///////////////////////////////////数据相关/////////////////////////////////////

/**
 * 渲染标脏量
 * 会在被标脏（true）后重新渲染
 */
let renderDirty = true;

/**
 * 当前绘制组
 */
let currentGroup = [];
/**
 * 每页最多显示个数
 */
let perPageMaxNum = 5;
/**
 * 当前页数,默认0为第一页
 */
let page = 0;
///////////////////////////////////绘制相关///////////////////////////////
/**
 * 舞台大小
 */
let stageWidth;
let stageHeight;
/**
 * 排行榜大小
 */
let rankWidth;
let rankHeight;

/**
 * 每个头像条目的大小
 */
let barWidth;
let barHeight;
/**
 * 条目与排行榜边界的水平距离
 */
let offsetX_barToRank
/**
 * 绘制排行榜起始点X
 */
let startX;
/**
 * 绘制排行榜起始点Y
 */
let startY;
/**
 * 每行Y轴间隔offsetY
 */
let preOffsetY;
/**
 * 按钮大小
 */
let buttonWidth;
let buttonHeight;
/**关闭按钮 */
let closeBtnX;
let closeBtnY;
let closeBtnWidth;
let closeBtnHeight;
/**
 * 上一页按钮X坐标
 */
let lastButtonX;
/**
 * 下一页按钮x坐标
 */
let nextButtonX;
/**
 * 上一页按钮y坐标
 */
let lastButtonY;
/**
 * 下一页按钮y坐标
 */
let nextButtonY;
/**
 * 两个按钮的间距
 */
let buttonOffset;

/**
 * 字体大小
 */
let fontSize;
/**
 * 文本文字Y轴偏移量
 * 可以使文本相对于图片大小居中
 */
let textOffsetY;
/**
 * 头像大小
 */
let avatarSize;
/**
 * 名字文本最大宽度，名称会根据
 */
let textMaxSize;
/**
 * 绘制元素之间的间隔量
 */
let intervalX;
/**
 * 排行榜与舞台边界的水平距离
 */
let offsetX_rankToBorder;
/**
 * 排行榜与舞台边界的竖直距离
 */
let offsetY_rankToBorder;
/**
 * 绘制排名的最大宽度
 */
let indexWidth;

//////////////////////////////////////////////////////////
/**
 * 监听点击
 */
wx.onTouchEnd((event) => {
    const l = event.changedTouches.length;
    for (let i = 0; i < l; i++) {
        onTouchEnd(event.changedTouches[i]);
    }
});


/**
 * 是否加载过资源的标记量
 */
let hasLoadRes;

/**
 * 资源加载
 */
function preloadAssets() {
    let preloaded = 0;
    let count = 0;
    for (let asset in assetsUrl) {
        count++;
        const img = wx.createImage();
        img.onload = () => {
            preloaded++;
            if (preloaded == count) {
                // console.log("加载完成");
                hasLoadRes = true;
            }

        }
        img.src = assetsUrl[asset];
        assets[asset] = img;
    }
}


/**
 * 绘制屏幕
 * 这个函数会在加载完所有资源之后被调用
 */
function createScene() {
    if (sharedCanvas.width && sharedCanvas.height) {
        // console.log('初始化完成')
        stageWidth = sharedCanvas.width;
        stageHeight = sharedCanvas.height;
        init();
        return true;
    } else {
        console.log('创建开放数据域失败，请检查是否加载开放数据域资源');
        return false;
    }
}


//记录requestAnimationFrame的ID
let requestAnimationFrameID;
let hasCreateScene;
let myScore = undefined;



/**
 * 增加来自主域的监听函数
 */
function addOpenDataContextListener() {
    console.log('增加监听函数')
    wx.onMessage((data) => {
        console.log(data);
        if (data.command == 'open') {
            if (!hasCreateScene) {
                //创建并初始化
                hasCreateScene = createScene();
            }
            totalGroup = [];
            page = 0;
            renderDirty = true;
            //创建并初始化
            if (data.type == "friend") {
                setFirendList();
            }
            else if (data.type == "group") {
                setGroupList(data.groupid);
            }
            requestAnimationFrameID = requestAnimationFrame(loop);
        } else if (data.command == 'close' && requestAnimationFrameID) {
            cancelAnimationFrame(requestAnimationFrameID);
            requestAnimationFrameID = null
        } else if (data.command == 'loadRes' && !hasLoadRes) {
            /**
             * 加载资源函数
             * 只需要加载一次
             */
            // console.log('加载资源')
            preloadAssets();
        } else if (data.command == 'getUserCloudStorage') {
            getUserCloudStorageInfo();
        } else if (data.command == 'setUserCloudStorage') {
            console.log("chen", parseInt(data.type), userScore);
            if (data.type != "" && parseInt(data.type) > userScore) {
                userScore = parseInt(data.type);
                setUserCloudStorageInfo([{ key: "score", value: data.type }]);
            }
        }
    });
}

addOpenDataContextListener();

function setGroupList(groupid) {
    wx.getGroupCloudStorage({
        shareTicket: groupid,
        keyList: ["score"],
        success: res => {
            console.log("getFriendCloudStorage", res);
            if (!res.data) { return; }
            kvlist2totogroup(res.data);
        },
        fail: err => {
            console.log(err);
        },
        complete: () => {
        }
    });
}

function setFirendList() {
    wx.getFriendCloudStorage({
        keyList: ["score"],
        success: res => {
            console.log("getFriendCloudStorage", res);
            if (!res.data) { return; }
            console.log("qqq", 1);
            kvlist2totogroup(res.data);

        },
        fail: err => {
            console.log(err);
        },
        complete: () => {
        }
    });
}

function getUserCloudStorageInfo() {
    wx.getUserCloudStorage({
        keyList: ["score"],
        success: res => {
            console.log("getUserCloudStorageInfo", res);
            if (!res) { return; }
            userScore = res.KVDataList[0].value;
        },
        fail: err => {
            console.log(err);
        },
        complete: () => {
        }
    })
}

function setUserCloudStorageInfo(KVDataList) {
    return new Promise((resolve, reject) => {
        wx.setUserCloudStorage({
            KVDataList: KVDataList,
            success: res => {
                console.log('setUserCloudStorage success', res);
                resolve(res);
            },
            fail: res => {
                console.log('fail', res);
            }
        })
    })
}

//把微信的数据转化成我们的数据
function kvlist2totogroup(reslist) {
    let dataList = [];
    reslist.forEach((data) => {
        if (data.KVDataList.length > 0) {
            dataList.push(data);
        }
    });
    if (dataList.length === 0) {
        return;
    }
    dataList.sort((a, b) => {
        return a.KVDataList[0].value - b.KVDataList[0].value;
    });
    totalGroup = [];
    for (let i = 0; i < dataList.length; i++) {
        for (let j = i + 1; j < dataList.length; j++) {
            if (parseInt(dataList[i].KVDataList[0].value) < parseInt(dataList[j].KVDataList[0].value)) {
                let tmp = dataList[i];
                dataList[i] = dataList[j];
                dataList[j] = tmp;
            }
        }
    }
    for (var i = 0; i < dataList.length; i++) {
        var obj = {};
        obj.key = i;
        obj.name = dataList[i].nickname;
        obj.url = dataList[i].avatarUrl;
        obj.scroes = dataList[i].KVDataList[0].value;
        totalGroup.push(obj);
    }
    renderDirty = true;
}
/**
 * 循环函数
 * 每帧判断一下是否需要渲染
 * 如果被标脏，则重新渲染
 */
function loop() {
    if (renderDirty) {
        // console.log(`stageWidth :${stageWidth}   stageHeight:${stageHeight}`)
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
        drawRankPanel();
        renderDirty = false;
    }
    requestAnimationFrameID = requestAnimationFrame(loop);
}

/**
 * 图片绘制函数
 */
function context_drawImage(image, x, y, width, height) {
    if (image.width != 0 && image.height != 0 && context) {
        if (width && height) {
            context.drawImage(image, x, y, width, height);
        } else {
            context.drawImage(image, x, y);
        }
    }
}