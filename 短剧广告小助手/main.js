auto.waitFor();

window = floaty.rawWindow(<frame gravity="center"><text id="text" textSize="12sp" textColor="#f44336"/></frame>);
window.setPosition(device.width/3, 60);
window.setTouchable(false);
window.exitOnClose();
function debug(msg) {
    if(window) {ui.run(function(){window.text.setText(msg);});}
}

events.observeKey();
events.on("exit", function() {
    alert("脚本已结束");
});
events.onKeyDown("volume_down", function (event) {
    exit();
});


function clickItem(res, notes) {
    if (res == null) { return; }
    click(res.bounds().centerX(), res.bounds().centerY());
    debug(notes);
}

alert("使用方法[xfxuezhang.cn]：\n1. 在抖音、快手播放短剧\n2. 小助手检测短剧进入广告\n3. 倒计时结束自动点击跳过\n4. 按音量-可以退出脚本\n[仅支持广告短剧，不支持付费短剧]");
while(true) {
    var res = null;
    if(descContains("倒计时").exists() || textContains("后继续看剧").exists()) {
        debug("检测到正在倒计时...");
    }else if(res = textContains("解锁成功").findOnce() || textContains("已可继续看剧").findOnce()) {
        debug("检测到倒计时结束...");
        clickItem(res, "解锁完成!");
    }else if(res = textContains("解锁下一集").findOnce()) {
        debug("检测到解锁下一集...");
        clickItem(res, "点击了解锁!");
    }else if(res = textContains("免费解锁本集").findOnce()) {
        debug("检测到免费解锁本集...");
        clickItem(res, "点击了解锁!");
    }else if(res = textContains("看广告解锁").findOnce()) {
        debug("检测到看广告解锁...");
        clickItem(res, "点击了看广告!");
    }else if(textContains("已免费解锁本集").exists() && textContains("退出放弃解锁").exists()) {
        clickItem(textContains("退出放弃解锁").findOnce(), "先不解锁下集!");
    }
    sleep(2000);
    debug("正在检测中...");
}



