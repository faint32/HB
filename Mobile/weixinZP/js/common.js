/**
 * Created by chendongge on 2014/10/22.
 */

function IsPC()
{
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}

var jumpPc = IsPC();
if(jumpPc!=false){
    window.location.href = "http://www.taqu.cn";
}

document.body.addEventListener('touchstart', function (e) {
    //console.log("target:"+e.target.className);
    e = e.changedTouches[0];
    onStart(e);
});

document.body.addEventListener('touchmove', function (e) {
    onMove(e.changedTouches[0], e);
});

document.body.addEventListener('touchend', function (e) {
    onEnd(e.changedTouches[0]);
});

// 翻转的绑定
window.onorientationchange = orientationChange;

function initPage(){
    pageWidth = $(window).width();
    pageHeight = $("#scene").height();
    pages = $("#scene section");
    $("#scene section").css({
        "width":pageWidth+"px",
        "height":pageHeight+"px"
    });
    secHeight = pageHeight * $("#scene section").length;
    lineHeight = 832 * secHeight / pageHeight;

    $("#box").addClass("drag");
}

function orientationChange(){
    initPage();
}

// 以下是拖动效果
var startX = 0,
    startY = 0,
    margin = 0;
var pages = null;
var curPage = 0;
var pageWidth = 0,
    pageHeight = 0;
var lineHeight = 0, secHeight = 0;
var targetElement = null;
var scrollPrevent = false, movePrevent = false, touchDown = false;


function onStart (e) {
    if(movePrevent == true){
        event.preventDefault();
        return false;
    }
    scrollPrevent = false;

    touchDown = true;

    // 起始点，页面位置
    startX = e.pageX;
    startY = e.pageY;
    //margin = parseInt($(".sec").css("top"));
    //-webkit-transform:translateY(0px)

    //matrix(1, 0, 0, 1, 0, 8)
    $("#box").addClass("drag");

    margin = $("#box").css("-webkit-transform");
    //margin = "matrix(1, 0, 0, 1, 0, -50)";
    margin = margin.replace("matrix(", "");
    margin = margin.replace(")", "");
    margin = margin.split(",");
    margin = parseInt(margin[5]);
}

function onMove (e, oe) {
    if(movePrevent == true || touchDown != true){
        event.preventDefault();
        return false;
    }
    event.preventDefault();
    if( scrollPrevent==false && e.pageY!=startY){
        var temp = margin + e.pageY - startY;
        $("#box").css("-webkit-transform", "matrix(1, 0, 0, 1, 0, "+temp+")");
    }
}

function onEnd (e) {
    if(movePrevent == true){
        event.preventDefault();
        return false;
    }

    touchDown = false;

    if( scrollPrevent==false ){
        // 抬起点，页面位置
        endX = e.pageX;
        endY = e.pageY;
        // swip 事件默认大于50px才会触发，小于这个就将页面归回
        if( Math.abs(endY-startY)<=50) {
            animatePage(curPage);
        }else{
            if(endY>startY){
                prevPage();
            }else{
                nextPage();
            }
        }
    }
    $("#box").removeClass("drag");
}

function prevPage(){
    var newPage = curPage - 1;
    animatePage(newPage);

}
function nextPage(){
    var newPage = curPage + 1;
    animatePage(newPage);
}

function animatePage(newPage ){
    if(newPage<0){
        newPage = 0;
    }
    if(newPage>$("#scene section").length-1){
        newPage = $("#scene section").length-1;
    }

    curPage = newPage;
    var newMarginTop = newPage * (-pageHeight);
    $("#box").css({
        "-webkit-transform" : "matrix(1, 0, 0, 1, 0, "+newMarginTop+")"
    });

    movePrevent = true;
    setTimeout("movePrevent=false;", 300 );

    // 每页动画
    if( !$(pages[curPage]).hasClass("section0" + (curPage+1) + "_show") ){
        $(pages[curPage]).addClass("section0" + (curPage+1) + "_show");
    }
    $(pages[curPage-1]).removeClass("section0" + (curPage) + "_show");
    $(pages[curPage+1]).removeClass("section0" + (curPage+2) + "_show");

//    pgvSendClick({hottag:'index.index.start_qzone'});
}



var queue        = new createjs.LoadQueue(),
    $state       = $('#state'),
    $progress    = $('#progress'),
    $progressbar = $('#progressbar .bar');


queue.on('complete',     onComplete);
queue.on('error',        onError);
queue.on('fileload',     onFileLoad);
queue.on('fileprogress', onFileProgress);
queue.on('progress',     onProgress);


queue.loadManifest([
    {
        id:   '1',
        src:  'http://xjbdocs.b0.upaiyun.com/post/weixinZP/images/se1Bg.png'
    },
    {
        id: '2',
        src: 'http://xjbdocs.b0.upaiyun.com/post/weixinZP/images/se1icon.png'
    },
    {
        id:   '3',
        src:  'http://xjbdocs.b0.upaiyun.com/post/weixinZP/images/se2icon.png'
    },
    {
        id:   '4',
        src:  'http://xjbdocs.b0.upaiyun.com/post/weixinZP/images/section2Bg.png'
    },
    {
        id:   '5',
        src:  'http://xjbdocs.b0.upaiyun.com/post/weixinZP/images/popup-icon.png'
    },
    {
        id:   '6',
        src:  'http://xjbdocs.b0.upaiyun.com/post/weixinZP/images/popup-guide.png'
    },
    {
        id:   '7',
        src:  'http://xjbdocs.b0.upaiyun.com/post/weixinZP/images/arrow.png'
    },
    {
        id:   '8',
        src:  'http://xjbdocs.b0.upaiyun.com/post/weixinZP/images/se3icon.png'
    },
    {
        id:   '9',
        src:  'http://xjbdocs.b0.upaiyun.com/post/weixinZP/images/se4icon.png'
    },
    {
        id:   '10',
        src:  'http://xjbdocs.b0.upaiyun.com/post/weixinZP/images/se4icon2.png'
    },
    {
        id:   '11',
        src:  'http://xjbdocs.b0.upaiyun.com/post/weixinZP/images/se5icon.png'
    },
    {
        id:   '12',
        src:  'http://xjbdocs.b0.upaiyun.com/post/weixinZP/images/se6icon.png'
    },
    {
        id:   '13',
        src:  'http://xjbdocs.b0.upaiyun.com/post/weixinZP/images/se6itemBg.png'
    },
    {
        id:   '14',
        src:  'http://xjbdocs.b0.upaiyun.com/post/weixinZP/images/section3Bg.png'
    },
    {
        id:   '15',
        src:  'http://xjbdocs.b0.upaiyun.com/post/weixinZP/images/section5Bg.png'
    }
]);


function closePreload(){
    $("#scene").removeClass("visibility-hidden");
    $("#preload").hide();
    animatePage(curPage);
}
function onComplete(event) {
//    console.log('Complete', event);
    $state.text( $state.text() + '[All loaded]' );
//    $progressbar.addClass('complete');
    setTimeout(closePreload,100);
}

function onError(event) {
//    console.log('Error', event);
    $state.text( $state.text() + '[' + event.item.id + ' errored] ');
}

function onFileLoad(event) {
//    console.log('File loaded', event);
    $state.text( $state.text() + '[' + event.item.id + ' loaded] ');
}

function onFileProgress(event) {
//    console.log('File progress', event);
}

function onProgress(event) {
    var progress = Math.round(event.loaded * 100);
//    console.log('General progress', Math.round(event.loaded) * 100, event);
    $progress.text(progress + '%');
    $progressbar.css({
        'width': progress + '%'
    });
}

// 视差
var scene = document.getElementById('scene');
var parallax = new Parallax(scene);


function onBridgeReady() {
    var mainTitle="他趣APP-情趣体验师",
        mainDesc="年薪25万！上班看片算绩效，回家撸管算加班。体验各种情趣用品，躺着就把钱赚了。",
        mainURL="http://xjbdocs.b0.upaiyun.com/post/weixinZP/index.html",
        mainImgUrl="http://xjbdocs.b0.upaiyun.com/post/weixinZP/images/sharelogo.jpg";

    //转发朋友圈
    WeixinJSBridge.on("menu:share:timeline", function(e) {
        var data = {
            img_url:mainImgUrl,
            img_width: "140",
            img_height: "140",
            link: mainURL,
            //desc这个属性要加上，虽然不会显示，但是不加暂时会导致无法转发至朋友圈，
            desc: mainDesc,
            title: mainTitle
        };
        WeixinJSBridge.invoke("shareTimeline", data, function(res) {
            if(res.err_msg=="share_timeline:ok"){
                $("#popup-guide").hide();
                $("#popup").show();
                $("#popup-rule").show();
            }
        });
    });
    //同步到微博
    WeixinJSBridge.on("menu:share:weibo", function() {
        WeixinJSBridge.invoke("shareWeibo", {
            "content": mainDesc,
            "url": mainURL
        }, function(res) {
            WeixinJSBridge.log(res.err_msg);
        });
    });
    //分享给朋友
    WeixinJSBridge.on('menu:share:appmessage', function(e) {
        var data = {
            img_url: mainImgUrl,
            img_width: "120",
            img_height: "120",
            link: mainURL,
            desc: mainDesc,
            title: mainTitle
        };
        WeixinJSBridge.invoke("sendAppMessage",data, function(res) {
//            WeixinJSBridge.log(res.err_msg)
            if(res.err_msg=="send_app_msg:ok"){
                $("#popup-guide").hide();
                $("#popup").show();
                $("#popup-rule").show();
            }
        });
    });
};
//执行
//当用户进行页面加载时,将Weixin浏览器定义的事件进行绑定。
if (typeof WeixinJSBridge === "undefined"){
    if (document.addEventListener){
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }
}else{
    onBridgeReady();
}

$(function(){
    initPage();
    $("#welfare-menu").find("li").on("click",function(){
        $(this).addClass("selected").siblings().removeClass("selected");
        $("#welfare>div").eq($(this).index()).addClass("welfare-show").siblings().removeClass("welfare-show");
    });
    $(".popup-close").on("click",function(){
        $(this).parent().hide();
        $(this).parent().parent().hide();
    });
    $("#menu-share,.se6-btn-share").on("click",function(){
        $("#popup").show();
        $("#popup-guide").show();
    });
    $("#popup-guide,#popup-down").on("click",function(){
        $(this).hide();
        $("#popup").hide();
    });
    $("#show-guide").on("click",function(){
        $("#popup-guide").show();
        $("#popup-apply").hide();
    });
});