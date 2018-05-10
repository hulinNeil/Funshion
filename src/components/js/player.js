"use strict";

var sound = "data:image/png;base64,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";
var sun = "data:image/png;base64,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";
var speed = "data:image/png;base64,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";
var backward = "data:image/png;base64,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";

var startX = null,
    startY = null,
    endX = null,
    endY = null,
    moveLength = null,
    direction = 'X',
    isFirstMove = true;
var video = null,
    videoLength = null,
    videoCurrentTime = null,
    videoCurrentTimeTom = null,
    videoCurrentTimeTo = null;
var base64Img = null /*图片*/,
    append_text = null /*文字*/,
    moveX = null,
    moveXlast = null,
    moveY = null,
    moveYlast = null,
    fullElement = null /*全屏元素,touchend不同重置*/,
    getSystemV = null /*声音*/,
    getSystemS = null /*亮度*/;
var startTime = null /*触摸屏幕的时间ms*/,
    moveTime = null /*此时正在触摸时的时间*/,
    moveLastTime = null /*上一次move的时间*/;
document.addEventListener('webkitfullscreenchange', function () {
  //监听
  fullElement = document.webkitFullscreenElement; //获取全屏元素
  if (fullElement) {
    document.addEventListener('touchstart', startF, true);
    document.addEventListener('touchmove', moveF, true);
    document.addEventListener('touchend', endF, true);
  } else {
    document.removeEventListener('touchstart', startF, true);
    document.removeEventListener('touchmove', moveF, true);
    document.removeEventListener('touchend', endF, true);
  }
});

function startF(e) {
  startTime = new Date().getTime();
  startX = e.touches[0].pageX, startY = e.touches[0].pageY;
  if (window.innerHeight - startY < 100) {
    return;
  }
  if (fullElement.tagName === 'VIDEO') {
    video = fullElement;
  } else {
    var target = fullElement;
    for (; target && target !== document; target = target.parentNode) {
      if (target.querySelector("video")) {
        video = target.querySelector("video");
        break;
      }
    }
  }
  videoLength = video.duration, videoCurrentTime = video.currentTime;
}
function moveF(e) {
  var mm = null; //单位滑动距离y
  if (!moveLastTime) {
    //得到时间，根据时间来设置滑动的距离
    moveLastTime = startTime;
  } else {
    moveLastTime = moveTime;
  }
  moveTime = new Date().getTime();
  endX = e.touches[0].pageX, endY = e.touches[0].pageY;
  if (window.innerHeight - endY < 100) {
    //如果得不到video或触摸距离在底部100px，则不滑动
    return;
  }
  if (!video) {
    if (fullElement.tagName === 'VIDEO') {
      video = fullElement;
    } else {
      var target = fullElement;
      for (; target && target !== document; target = target.parentNode) {
        if (target.querySelector("video")) {
          video = target.querySelector("video");
          break;
        }
      }
    }
    videoLength = video.duration, videoCurrentTime = video.currentTime;
  }

  if (isFirstMove) {
    //是move的第一次，下面判断方向；
    if (Math.abs(endX - startX) < Math.abs(endY - startY)) {
      direction = 'Y';
    }
    if (direction === 'X') {
      //处理第一次滑动的图片
      if (endX - startX >= 0) {
        base64Img = speed;
      } else {
        base64Img = backward;
      }
    } else {
      if (window.innerWidth / 2 > endY) {
        //是在左边滑动
        base64Img = sun;
      } else {
        base64Img = sound;
      }
    }
    isFirstMove = false;
  }
  if (direction === 'X') {
    moveLength = endX - startX;
  } else {
    moveLength = endY - startY;
    if (!moveYlast) {
      moveYlast = startY;
    }
    mm = endY - moveYlast;
    moveYlast = endY;
  }

  if (videoLength < 300 && direction === 'X') {
    moveLength = moveLength / 2;
  }

  videoCurrentTimeTo = videoCurrentTime + moveLength;

  if (direction === 'X') {
    if (videoCurrentTimeTo <= 0) {
      videoCurrentTimeTo = 0;
    } else if (videoCurrentTimeTo >= videoLength) {
      videoCurrentTimeTo = videoLength;
    }
    append_text = setTimeLength(videoCurrentTimeTo);
    if (endX - startX >= 0) {
      base64Img = speed;
    } else {
      base64Img = backward;
    }
  } else {
    if (window.innerWidth / 2 > endX) {
      base64Img = sun;
      append_text = setMark(moveLength, 'sun');
    } else {
      base64Img = sound;
      append_text = setMark(moveLength, 'sound');
    }
  }
  var WIN_W = window.innerWidth,
      _left = (WIN_W - 120) / 2;

  var html = "\n              <div style=\"box-sizing:content-box;width:100px;height:30px;padding:0 10px;line-height:30px;background:rgba(0,0,0,0.5);position:fixed;z-index:99999999999;top:50%;left:" + _left + "px;border-radius:20px;text-align:center;\">\n                  <img id=\"append_touch_img\" style=\"width:30px;height:30px;float:left;\" src=\"" + base64Img + "\"/>\n                  <span id=\"append_touch_text\" style=\"color:#ffffff;\">" + append_text + "</span>\n              </div>\n          ";
  if (!document.querySelector("#append_touch_div")) {
    var apend = document.createElement("div");
    apend.setAttribute("id", "append_touch_div");
    apend.innerHTML = html;
    video.parentNode.appendChild(apend);
  } else {
    var append_touch_text = document.querySelector("#append_touch_text");
    append_touch_text.innerText = append_text;
    if (direction == 'X') {
      document.querySelector("#append_touch_img").src = base64Img;
    }
  }
  e.preventDefault();
  e.stopPropagation();
}
function endF(e) {
  var apend = document.querySelector("#append_touch_div");
  if (apend) {
    if (direction === 'X') {
      video.currentTime = videoCurrentTimeTo;
    }
    startX = null, startY = null, endX = null, endY = null, moveLength = null, direction = 'X', isFirstMove = true;
    video = null, videoLength = null, videoCurrentTime = null, videoCurrentTimeTom = null, videoCurrentTimeTo = null;
    base64Img = null /*图片*/, append_text = null /*文字*/, moveX = null, moveXlast = null, moveY = null, moveYlast = null, getSystemV = null /*声音*/, getSystemS = null /*亮度*/;
    apend.remove();
  }
}
function setTimeLength(t) {
  var m = Math.floor(t / 60);
  m < 10 && (m = '0' + m);
  return m + ":" + (t % 60 / 100).toFixed(2).slice(-2);
}
function setMark(t, type) {
  var mark = 0;
  if (window.plus) {
    if (type === 'sun' && !getSystemS) {
      getSystemS = plus.screen.getBrightness(); /*设置亮度的api在流基座里面崩溃*/
    } else if (type === 'sound' && !getSystemV) {
      getSystemV = plus.device.getVolume(); /*取set的值然后保存显示*/
    }
    if (type === 'sun') {
      mark = getSystemS;
    } else {
      mark = getSystemV;
    }
    mark = (mark - t / 300).toFixed(2); /*3px转化为1个点0.01*/
    if (mark > 1) {
      mark = 1;
    } else if (mark < 0) {
      mark = 0;
    }
    if (type === 'sun') {
      plus.screen.setBrightness(mark);
    } else {
      plus.device.setVolume(mark);
    }
  }
  return Math.ceil(mark * 100) + '%';
}