if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}
//添加slide监听、添加横屏监
document.addEventListener('touchmove', function(e) {
    e.preventDefault()
})

function $(selector) {
    return document.querySelector(selector)
}

function $$(selector) {
    return document.querySelectorAll(selector)
}
function isClassContain(el,className){
    var flag;
    if(el.classList){
        flag = el.classList.contains(className);
    }else{
        flag = el.className.indexOf(className) > 0 ? true : false;
    }
    return flag;
}

function removeClassName(el,className){
    var classList = el.className;
    if(el.classList){
        el.classList.remove(className);
    }else{
        el.className = el.className.replace(className,'');
    }
}
function addClassName(el,className){
    var classList = el.className;
    if(el.classList){
        el.classList.add(className);
    }else{
        el.className = el.className + ' ' + className;
    }
}
// PageSlide
var PageSlide = function(el, swipe, options) {
    this.options = options || {}
    this.current = 0
    this.pageX
    this.pageY
    this.height
    this.width
    this.flag
    this.move

    this.$el = el
    this.swipe = swipe || 'X'
    this.resize().init().bindEvents()
}

PageSlide.prototype.init = function(i) {
    var current = i ? this.$el.children[i] : this.$el.firstElementChild
    //alert(1)
    if (!current) throw 'ERROR';

    addClassName(current,'moving')
    current.style.webkitTransform = current.style.msTransform = current.style.transform = 'translate3d(0,0,0)'
    setTimeout(function() {
        removeClassName(current,'moving')
        addClassName(current,'play')
    }, 3e2)

    return this
}

PageSlide.prototype.bindEvents = function() {
    var self = this
    var eventsList = 'touchstart touchmove touchend touchcancel MSPointerDown MSPointerMove MSPointerCancel MSPointerUp pointerdown pointermove pointercancel pointerup'
    //alert(1)
//    window.addEventListener('resize orientationchange', this.resize.bind(this), false)

    eventsList.split(' ').forEach(function(evn) {
        self.$el.addEventListener(evn, self[evn].bind(self), false)
    })
}

PageSlide.prototype.getCurrent = function() {
    return this.$el.children[this.current]
}

PageSlide.prototype.resize = function() {
    this.width = this.$el.parentNode.clientWidth
    this.height = this.$el.parentNode.clientHeight
    //alert(this.height)
    return this
}

PageSlide.prototype.random = function() {
    var count = this.$el.children.length
    var current = this.current
    var arr = []
    var num

    for (var i = 0; i < count; i++) {
        if (i !== current) arr.push(i.toString())
    }

    num = Math.floor(Math.random() * arr.length)
    this.go(+arr[num])
}

PageSlide.prototype.touchstart = PageSlide.prototype.pointerdown = PageSlide.prototype.MSPointerDown = PageSlide.prototype.mousedown =  function(e) {
    if(e.target.getAttribute('class') == 'nomove') return false;
    var touches = null;
    if (e.touches) {
        touches = e.touches[0];
    }

    //touch start initializing
    this.flag = null
    this.move = 0

    //record coordinates
    this.pageX = touches ? touches.pageX : e.x
    this.pageY = touches ? touches.pageY : e.y
}

PageSlide.prototype.touchmove = PageSlide.prototype.pointermove = PageSlide.prototype.MSPointerMove = PageSlide.prototype.mousemove =  function(e) {
    if(e.target.getAttribute('class') == 'nomove') return false;
    var touches = null;
    if (e.touches) {
        touches = e.touches[0];
    }
    var X = (touches ? touches.pageX : e.x) - this.pageX
    var Y = (touches ? touches.pageY : e.y) - this.pageY

    var current = this.getCurrent()
    var next = current.nextElementSibling
    var prev = current.previousElementSibling

    //add moving styled

    if (!this.flag) {
        this.flag = Math.abs(X) > Math.abs(Y) ? 'X' : 'Y'

        if (this.flag === this.swipe) {
//            current.classList.add('moving')
//            next && next.classList.add('moving')
//            prev && prev.classList.add('moving')
            addClassName(current,'moving')
            next && addClassName(next,'moving')
            prev && addClassName(prev,'moving')
        }
    }

    if (this.flag === this.swipe) {
        e.preventDefault()
        e.stopPropagation()

        switch (this.swipe) {
            case 'X': //swipe horizontal
                this.move = X

                this.setX(current, X)
                next && (this.setX(next, X + this.width))
                prev && (this.setX(prev, X - this.width))
                break;
            case 'Y': //swipe vertical
                this.move = Y

                this.setY(current, Y)
                next && (this.setY(next, Y + this.height))
                prev && (this.setY(prev, Y - this.height))
                break;
        }
    }
}

PageSlide.prototype.touchend = PageSlide.prototype.pointerup = PageSlide.prototype.MSPointerUp = PageSlide.prototype.mouseup = function(e) {
    if(e.target.getAttribute('class') == 'nomove') return false;
    var minRange = 50
    var move = this.move
    var current = this.getCurrent()
    var next = current.nextElementSibling
    var prev = current.previousElementSibling
//    current.classList.remove('moving')
//    next && next.classList.remove('moving')
//    prev && prev.classList.remove('moving')
    removeClassName(current,'moving')
    next && removeClassName(next,'moving')
    prev && removeClassName(prev,'moving')

    if (!this.flag) return

    e.preventDefault()

    if (move < -minRange && next) return this.next()
    if (move > minRange && prev) return this.prev()
    this.reset()
}

PageSlide.prototype.touchcancel = PageSlide.prototype.pointercancel = PageSlide.prototype.MSPointerCancel = function(e) {
    var current = this.getCurrent()
    var next = current.nextElementSibling
    var prev = current.previousElementSibling

//    current.classList.remove('moving')
//    next && next.classList.remove('moving')
//    prev && prev.classList.remove('moving')
    removeClassName(current,'moving')
    next && removeClassName(next,'moving')
    prev && removeClassName(prev,'moving')
    this.reset()
}


PageSlide.prototype.setX = function(el, x, unit) {
    el && (el.style.webkitTransform = el.style.msTransform = el.style.transform = 'translate3d(' + x + (unit || 'px') + ',0,0)')
}

PageSlide.prototype.setY = function(el, y, unit) {
    el && (el.style.webkitTransform = el.style.msTransform = el.style.transform = 'translate3d(0,' + y + (unit || 'px') + ',0)')
}

PageSlide.prototype.setCurrent = function(el, i) {
    el && (el.style.webkitTransform = el.style.msTransform = el.style.transform = 'translate3d(0,0,0)')

    if (i) {
        this.current = i
        this.$current = this.$el.children[i]
    }
}

PageSlide.prototype.next = function() {
    this.go(this.current + 1)
}

PageSlide.prototype.prev = function() {
    this.go(this.current - 1)
}

PageSlide.prototype.reset = function() {
    var width = this.width
    var height = this.height
    var swipe = this.swipe
    var current = this.getCurrent()
    var prev = current.previousElementSibling
    var next = current.nextElementSibling

    this.setCurrent(current)
    prev && (this['set' + swipe](prev, -(swipe === 'X' ? width : height)))
    next && (this['set' + swipe](next, swipe === 'X' ? width : height))
}

PageSlide.prototype.go = function(i) {
    var current = this.getCurrent()
    var total = this.$el.childElementCount
    var target = this.$el.children[i]
    var d = i < this.current ? -1 : 1


    if (i === this.current || i < 0 || i >= total) return
    this.current = i

    this['set' + this.swipe](current, -d * (this.swipe === 'X' ? this.width : this.height))
    this.setCurrent(target, i)
    this.finish(current, target,i)
}

PageSlide.prototype.finish = function(curr, target,i) {
    this.flag = null
    var onFinish = this.options.onFinish
    setTimeout(function() {
//        curr && curr.classList.remove('play')
//        target && target.classList.add('play')
        curr && removeClassName(curr,'play')
        target && addClassName(target,'play')
        if (onFinish && (typeof onFinish === 'function')) onFinish.call(this, i)
    }, 3e2)
}

// Audio
function audioCtl() {
    var $audio = $('audio')
    var $audioContorl = $('.audio-c')
    if($audioContorl){
        $audioContorl.addEventListener('click', function() {
            if (isClassContain($audioContorl,'play')) {
//                $audioContorl.classList.remove('play')
                removeClassName($audioContorl,'play')
                $audio.pause()
            } else {
//                $audioContorl.classList.add('play')
                addClassName($audioContorl,'play')
                $audio.play()
            }
        })
    }
}
// 横屏提示
function resize() {
    var STYLESHEET = function() {
        var styleSheet = function() {
            //创建一个styleSheet,避免跨域问题
            var head = document.getElementsByTagName("head")[0];
            var style = document.createElement("style");
            style.type = "text/css";
            head.appendChild(style);
            return document.styleSheets[document.styleSheets.length - 1];
        }();

        function addStyleSheet(cssText) { /*动态添加css样式*/
            var oCss = styleSheet,
                cssRules = cssText.split('\r\n');
            var len = !!oCss.cssRules ? oCss.cssRules.length : 0; //不直接使用oCss.cssRules.length是因为跨域时返回null，所以用len避免错误
            for (var i = 0; i < cssRules.length; ++i) {
                oCss.insertRule(cssRules[i], len++);
            };
            return len;
        }
        return {
            add: addStyleSheet
        };
    }();

    var webkit = function() {
        //浏览器特有css样式的
        var css3_div = document.createElement("div");
        css3_div.style.cssText = '-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;';
        if (css3_div.style.webkitTransition) {
            return '-webkit-';
        } else if (css3_div.style.mozTransition) {
            return '-moz-';
        } else if (css3_div.style.oTransition) {
            return '-o-';
        } else if (css3_div.style.msTransition) {
            return '-ms-';
        } else {
            return '';
        }
    }();

    //横屏警告
    var warn = function() {
        var _warn = document.createElement("div"),
            _warn_wrp = document.createElement('div');
        _warn_wrp.style.cssText = 'position:absolute; width:100%; height:100%; overflow:hidden; left:0; top:0; z-index:9999; background-color:#f5f5f5; display:none;',
            _warn.style.cssText = 'position:absolute; left:50%; top:50%; width:250px; height:150px;font-size:1.6rem; margin:-75px 0 0 -125px; text-align:center; color:#aaa;';
        document.body.appendChild(_warn_wrp),
            _warn_wrp.appendChild(_warn);
        var _warn_text = document.createTextNode('为了更好的体验，请使用竖屏浏览');
        _warn.appendChild(document.createElement('br')),
            _warn.appendChild(_warn_text);

        var setCssText = function(wrp, icon, text) {
            //设置warn的样式
            if (typeof(wrp) == 'string') _warn.style.cssText = wrp;
            if (typeof(text) == 'string') _warn_text.nodeValue = text;
        }
        var show = function() {
            _warn_wrp.style.display = 'block';
        }
        var hide = function() {
            _warn_wrp.style.display = 'none';
        }
        return {
            show: show,
            hide: hide,
            setCssText: setCssText
        };
    }();
    var need_watch = 'onorientationchange' in window;
    var clientHeight = document.documentElement.clientHeight,
        clientWidth = document.documentElement.clientWidth;
    if (need_watch) {
        if (window.orientation != '0') warn.show();
        window.addEventListener('orientationchange', function() {
            if (window.orientation != '0') {
                warn.show();
            } else {
                warn.hide();
            }
        }, false);
    } else {
        if (clientHeight < clientWidth) warn.show();
    }
    //监听窗口变化
    window.addEventListener('resize', function() {

        clientHeight = document.documentElement.clientHeight, clientWidth = document.documentElement.clientWidth;
        if (pages){
            pages.width = clientWidth;
            pages.height = clientHeight;
        }
        if (!need_watch) { //没办监听orientationchange，用resize代替
            if (clientHeight < clientWidth) {
                warn.show();
            } else {
                warn.hide();
            }
        }
    }, false);
}
