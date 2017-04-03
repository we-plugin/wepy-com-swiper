'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var device = wx.getSystemInfoSync(); //  获取设备信息
var DEFAULT = {
  /**
   * 必填项
   */
  slideLength: 0, //  由于目前无法直接获取slide页数，目前只能通过参数写入
  /**
   * 可选参数
   */
  width: device.windowWidth,
  height: device.windowHeight,
  direction: 'horizontal',
  initialSlide: 0,
  speed: 300,
  timingFunction: 'ease', //  过渡动画速度曲线
  autoplay: 0, //  自动播放间隔，设置为0时不自动播放
  directionViewName: 'directionClass', //  对应视图中direction类名
  animationViewName: 'animationData', //  对应视图中animation属性名
  /**
   * 事件回调
   * @type {[type]}
   */
  onInit: null, //  swiper初始化时执行
  onTouchStart: null, //  手指碰触slide时执行
  onTouchMove: null, //  手指碰触slide并且滑动时执行
  onTouchEnd: null, //  手指离开slide时执行
  onSlideChangeStart: null, //  slide达到过渡条件时执行
  onSlideChangeEnd: null, //  swiper从一个slide过渡到另一个slide结束时执行
  onTransitionStart: null, //  过渡时触发
  onTransitionEnd: null, //  过渡结束时执行
  onSlideMove: null, //  手指触碰swiper并且拖动slide时执行
  onSlideNextStart: null, //  slide达到过渡条件 且规定了方向 向前（右、下）切换时执行
  onSlideNextEnd: null, //  slide达到过渡条件 且规定了方向 向前（右、下）切换结束时执行
  onSlidePrevStart: null, //  slide达到过渡条件 且规定了方向 向前（左、上）切换时执行
  onSlidePrevEnd: null //  slide达到过渡条件 且规定了方向 向前（左、上）切换结束时执行
};

var weSwiper = function (_wepy$component) {
  _inherits(weSwiper, _wepy$component);

  function weSwiper() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, weSwiper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = weSwiper.__proto__ || Object.getPrototypeOf(weSwiper)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      directionClass: 'we-container-horizontal',
      animationData: null
    }, _this.props = {
      option: Object
    }, _this.methods = {
      touchstart: function touchstart(e) {
        var onTouchStart = this.onTouchStart,
            XORY = this.XORY,
            activeIndex = this.activeIndex,
            rectDistance = this.rectDistance;

        var touch = e.changedTouches[0];
        var distance = touch['client' + XORY];
        var translate = -activeIndex * rectDistance;

        this['touchStart' + XORY] = distance;
        this['translate' + XORY] = translate;
        this.touchStartTime = new Date().getTime();

        typeof onTouchStart === 'function' && onTouchStart(this, e); //  当手指碰触到slide时执行

        this.slideAnimation(translate, 0);
      },
      touchmove: function touchmove(e) {
        var onTouchMove = this.onTouchMove,
            XORY = this.XORY,
            onSlideMove = this.onSlideMove;

        var touch = e.changedTouches[0];
        var distance = touch['client' + XORY];
        var tmpMove = this['translate' + XORY] + distance - this['touchStart' + XORY];

        typeof onTouchMove === 'function' && onTouchMove(this, e); //  手指碰触slide并且滑动时执行

        this.slideAnimation(tmpMove, 0);

        typeof onSlideMove === 'function' && onSlideMove(this);
      },
      touchend: function touchend(e) {
        var onTouchEnd = this.onTouchEnd,
            XORY = this.XORY,
            speed = this.speed,
            touchStartTime = this.touchStartTime,
            rectDistance = this.rectDistance;

        var touch = e.changedTouches[0];
        var distance = touch['client' + XORY];
        var touchEndTime = new Date().getTime();

        var action = this.action(touchStartTime, touchEndTime, this['touchStart' + XORY], distance, rectDistance);

        typeof onTouchEnd === 'function' && onTouchEnd(this, e); //  手指离开slide时执行

        this[action](true, speed);
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(weSwiper, [{
    key: 'action',


    /**
     * 切换控制器
     * @param touchStartTime： 手指触碰slide时的时间戳
     * @param et： 手指离开slide时的时间戳
     * @param from： 手指触碰slide时的屏幕位置
     * @param to： 手指离开slide时的屏幕位置
     * @param wrapperDistance： slide滑动方向上的容器长度
     * @returns {*}
     */
    value: function action(touchStartTime, touchEndTime, from, to, wrapperDistance) {
      var activeIndex = this.activeIndex,
          slideLength = this.slideLength,
          onTransitionStart = this.onTransitionStart;

      var deltaTime = touchEndTime - touchStartTime; //  手指触摸时长
      var distance = Math.abs(to - from); //  滑动距离

      var k = distance / deltaTime;

      if (to > from) {
        typeof onTransitionStart === 'function' && onTransitionStart(self); // slide达到过渡条件时执行
        return k > 0.3 || distance > wrapperDistance / 2 ? activeIndex === 0 ? 'slideBack' : 'slidePrev' : 'slideBack';
      }

      if (to < from) {
        typeof onTransitionStart === 'function' && onTransitionStart(self); // slide达到过渡条件时执行
        return k > 0.3 || distance > wrapperDistance / 2 ? activeIndex === slideLength - 1 ? 'slideBack' : 'slideNext' : 'slideBack';
      }

      if (to = from) {
        return 'slideBack';
      }
    }

    /**
     * 切换至下一个slide
     * @param runCallbacks： 可选，boolean，设置为false时不会触发onSlideChange回调函数
     * @param speed: 可选，num(单位ms)，切换速度
     */

  }, {
    key: 'slideNext',
    value: function slideNext() {
      var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

      var self = this;
      var onSlideNextStart = self.onSlideNextStart,
          onSlideNextEnd = self.onSlideNextEnd;


      typeof onSlideNextStart === 'function' && onSlideNextStart(self); // slide达到过渡条件时执行

      self.slideTo(self.activeIndex + 1, speed, runCallbacks);

      typeof onSlideNextEnd === 'function' && setTimeout(function () {
        onSlideNextEnd(self);
      }, speed); //  slide过渡结束后执行
    }

    /**
     * 切换至上一个slide
     * @param runCallbacks： 可选，boolean，设置为false时不会触发onSlideChange回调函数
     * @param speed: 可选，num(单位ms)，切换速度
     */

  }, {
    key: 'slidePrev',
    value: function slidePrev() {
      var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

      var self = this;
      var onSlidePrevStart = self.onSlidePrevStart,
          onSlidePrevEnd = self.onSlidePrevEnd;


      typeof onSlidePrevStart === 'function' && onSlidePrevStart(self); // slide达到过渡条件时执行

      self.slideTo(self.activeIndex - 1, speed, runCallbacks);

      typeof onSlidePrevEnd === 'function' && setTimeout(function () {
        onSlidePrevEnd(self);
      }, speed); //  slide过渡结束后执行
    }

    /**
     * 回弹
     * @param runCallbacks: 可选，boolean，设置为false时不会触发onSlideChange回调函数
     * @param speed: 可选，num(单位ms)，切换速度
     */

  }, {
    key: 'slideBack',
    value: function slideBack() {
      var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

      var self = this;
      var XORY = self.XORY,
          activeIndex = self.activeIndex,
          rectDistance = self.rectDistance,
          onTransitionEnd = self.onTransitionEnd;


      var translate = -activeIndex * rectDistance;

      self.slideAnimation(translate, speed);

      typeof onTransitionEnd === 'function' && setTimeout(function () {
        onTransitionEnd(self);
      }, speed); //  slide过渡结束后执行
    }

    /**
     * 切换到指定slide
     * @param index：必选，num，指定将要切换到的slide的索引
     * @param speed：可选，num(单位ms)，切换速度
     * @param runCallbacks：可选，boolean，设置为false时不会触发onSlideChange回调函数
     */

  }, {
    key: 'slideTo',
    value: function slideTo(index) {
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
      var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var self = this;
      var slideLength = self.slideLength,
          activeIndex = self.activeIndex,
          rectDistance = self.rectDistance,
          onSlideChangeStart = self.onSlideChangeStart,
          onSlideChangeEnd = self.onSlideChangeEnd,
          onTransitionEnd = self.onTransitionEnd,
          consoleException = self.consoleException;


      try {
        if (typeof index !== 'number') throw 'paramType'; //  参数类型错误
        if (index < 0 || index > slideLength - 1) throw 'bound'; //  越界

        var translate = -index * rectDistance;
        self.previousIndex = activeIndex;
        self.activeIndex = index;
        self.isBeginning = self.activeIndex === self.initialSlide;
        self.isEnd = self.activeIndex === self.slideLength - 1;

        runCallbacks && typeof onSlideChangeStart === 'function' && onSlideChangeStart(self); // slide达到过渡条件时执行

        self.slideAnimation(translate, speed);

        runCallbacks && typeof onSlideChangeEnd === 'function' && setTimeout(function () {
          onSlideChangeEnd(self);
        }, speed); //  swiper从一个slide过渡到另一个slide结束后执行
        typeof onTransitionEnd === 'function' && setTimeout(function () {
          onTransitionEnd(self);
        }, speed); //  slide过渡结束后执行
      } catch (err) {
        consoleException(err, 'slideTo[Function]');
      }
    }

    /**
     * 平移动画
     * @param translate：平移位置
     * @param speed：过渡时长
     * @param timingFunction：过渡类型
     */

  }, {
    key: 'slideAnimation',
    value: function slideAnimation() {
      var translate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
      var timingFunction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ease';

      var REG = {
        TRANSLATE: /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/,
        SPEED: /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/,
        TIMINGFUNCTION: /linear|ease|ease-in|ease-in-out|ease-out|step-start|step-end/
      };

      var XORY = this.XORY,
          animationViewName = this.animationViewName,
          consoleException = this.consoleException;

      try {
        /**
         * 异常处理
         */
        if (!REG.TRANSLATE.test(translate)) throw 'paramType';
        if (!REG.SPEED.test(speed)) throw 'paramType';
        if (!REG.TIMINGFUNCTION.test(timingFunction)) throw 'paramType';
        /**
         * 创建一个动画实例
         */
        var animation = wx.createAnimation({
          transformOrigin: '50% 50%',
          duration: speed,
          timingFunction: timingFunction,
          delay: 0
        });

        animation['translate' + XORY](translate).step(); //  动画描述

        this.syncView(animationViewName, animation); //  同步动画到视图
      } catch (err) {
        consoleException(err, 'slideAnimation[Function]');
      }
    }

    /**
     * 同步设置到视图
     * @param DEFAULT：默认参数
     * @param param：构造参数
     */

  }, {
    key: 'syncView',
    value: function syncView(viewName, prop) {
      this['' + viewName] = prop;
      this.$apply();
    }

    /**
     * 错误对照
     */

  }, {
    key: 'consoleException',
    value: function consoleException(type, place) {
      var ERROR = {
        'paramType': '参数类型错误',
        'bound': '参数越界'
      };
      console.log('%c' + place + ':' + ERROR[type], 'color: red');
    }

    /**
     * 初始化配置
     */

  }, {
    key: 'initSwiper',
    value: function initSwiper(param) {
      var _this2 = this;

      var speed = param.speed,
          initialSlide = param.initialSlide,
          direction = param.direction,
          autoplay = param.autoplay,
          directionViewName = param.directionViewName;


      var directionClass = direction === 'horizontal' ? 'we-container-horizontal' : 'we-container-vertical';
      this.syncView(directionViewName, directionClass);
      this.rectDistance = direction === 'horizontal' ? this.width : this.height;
      this.XORY = direction === 'horizontal' ? 'X' : 'Y';
      this.activeIndex = initialSlide; //  将初始页码赋给activeIndex
      this.noSwiper = false; //  阻止手势滑动
      this.previousIndex = initialSlide; //  返回上一个活动块的索引，切换前的索引
      this.slideTo(initialSlide, 0);
      typeof autoplay === 'number' && autoplay > 0 && setInterval(function () {
        if (_this2.isEnd) {
          _this2.slideTo(0, speed);
        } else {
          _this2.slideTo(_this2.activeIndex + 1, speed);
        }
      }, autoplay);
      /**
       * 处理callback
       */
      var onInit = this.onInit;

      typeof onInit === 'function' && onInit(this);
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var option = this.option;

      var CONFIG = Object.assign(this, DEFAULT, option);

      this.initSwiper(CONFIG);
    }
  }]);

  return weSwiper;
}(_wepy2.default.component);

exports.default = weSwiper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXBlci5qcyJdLCJuYW1lcyI6WyJkZXZpY2UiLCJ3eCIsImdldFN5c3RlbUluZm9TeW5jIiwiREVGQVVMVCIsInNsaWRlTGVuZ3RoIiwid2lkdGgiLCJ3aW5kb3dXaWR0aCIsImhlaWdodCIsIndpbmRvd0hlaWdodCIsImRpcmVjdGlvbiIsImluaXRpYWxTbGlkZSIsInNwZWVkIiwidGltaW5nRnVuY3Rpb24iLCJhdXRvcGxheSIsImRpcmVjdGlvblZpZXdOYW1lIiwiYW5pbWF0aW9uVmlld05hbWUiLCJvbkluaXQiLCJvblRvdWNoU3RhcnQiLCJvblRvdWNoTW92ZSIsIm9uVG91Y2hFbmQiLCJvblNsaWRlQ2hhbmdlU3RhcnQiLCJvblNsaWRlQ2hhbmdlRW5kIiwib25UcmFuc2l0aW9uU3RhcnQiLCJvblRyYW5zaXRpb25FbmQiLCJvblNsaWRlTW92ZSIsIm9uU2xpZGVOZXh0U3RhcnQiLCJvblNsaWRlTmV4dEVuZCIsIm9uU2xpZGVQcmV2U3RhcnQiLCJvblNsaWRlUHJldkVuZCIsIndlU3dpcGVyIiwiZGF0YSIsImRpcmVjdGlvbkNsYXNzIiwiYW5pbWF0aW9uRGF0YSIsInByb3BzIiwib3B0aW9uIiwiT2JqZWN0IiwibWV0aG9kcyIsInRvdWNoc3RhcnQiLCJlIiwiWE9SWSIsImFjdGl2ZUluZGV4IiwicmVjdERpc3RhbmNlIiwidG91Y2giLCJjaGFuZ2VkVG91Y2hlcyIsImRpc3RhbmNlIiwidHJhbnNsYXRlIiwidG91Y2hTdGFydFRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsInNsaWRlQW5pbWF0aW9uIiwidG91Y2htb3ZlIiwidG1wTW92ZSIsInRvdWNoZW5kIiwidG91Y2hFbmRUaW1lIiwiYWN0aW9uIiwiZXZlbnRzIiwiZnJvbSIsInRvIiwid3JhcHBlckRpc3RhbmNlIiwiZGVsdGFUaW1lIiwiTWF0aCIsImFicyIsImsiLCJzZWxmIiwicnVuQ2FsbGJhY2tzIiwic2xpZGVUbyIsInNldFRpbWVvdXQiLCJpbmRleCIsImNvbnNvbGVFeGNlcHRpb24iLCJwcmV2aW91c0luZGV4IiwiaXNCZWdpbm5pbmciLCJpc0VuZCIsImVyciIsIlJFRyIsIlRSQU5TTEFURSIsIlNQRUVEIiwiVElNSU5HRlVOQ1RJT04iLCJ0ZXN0IiwiYW5pbWF0aW9uIiwiY3JlYXRlQW5pbWF0aW9uIiwidHJhbnNmb3JtT3JpZ2luIiwiZHVyYXRpb24iLCJkZWxheSIsInN0ZXAiLCJzeW5jVmlldyIsInZpZXdOYW1lIiwicHJvcCIsIiRhcHBseSIsInR5cGUiLCJwbGFjZSIsIkVSUk9SIiwiY29uc29sZSIsImxvZyIsInBhcmFtIiwibm9Td2lwZXIiLCJzZXRJbnRlcnZhbCIsIkNPTkZJRyIsImFzc2lnbiIsImluaXRTd2lwZXIiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFNBQVNDLEdBQUdDLGlCQUFILEVBQWYsQyxDQUF1QztBQUN2QyxJQUFNQyxVQUFVO0FBQ2Q7OztBQUdBQyxlQUFhLENBSkMsRUFJd0I7QUFDdEM7OztBQUdBQyxTQUFPTCxPQUFPTSxXQVJBO0FBU2RDLFVBQVFQLE9BQU9RLFlBVEQ7QUFVZEMsYUFBVyxZQVZHO0FBV2RDLGdCQUFjLENBWEE7QUFZZEMsU0FBTyxHQVpPO0FBYWRDLGtCQUFnQixNQWJGLEVBYXdCO0FBQ3RDQyxZQUFVLENBZEksRUFjd0I7QUFDdENDLHFCQUFtQixnQkFmTCxFQWV5QjtBQUN2Q0MscUJBQW1CLGVBaEJMLEVBZ0J3QjtBQUN0Qzs7OztBQUlBQyxVQUFRLElBckJNLEVBcUJ3QjtBQUN0Q0MsZ0JBQWMsSUF0QkEsRUFzQndCO0FBQ3RDQyxlQUFhLElBdkJDLEVBdUJ3QjtBQUN0Q0MsY0FBWSxJQXhCRSxFQXdCd0I7QUFDdENDLHNCQUFvQixJQXpCTixFQXlCd0I7QUFDdENDLG9CQUFrQixJQTFCSixFQTBCd0I7QUFDdENDLHFCQUFtQixJQTNCTCxFQTJCd0I7QUFDdENDLG1CQUFpQixJQTVCSCxFQTRCd0I7QUFDdENDLGVBQWEsSUE3QkMsRUE2QndCO0FBQ3RD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QjtBQUNBLGFBQU9HLFFBQVAsS0FBb0IsUUFBcEIsSUFBZ0NBLFdBQVcsQ0FBM0MsSUFBZ0RrRixZQUFZLFlBQU07QUFDaEUsWUFBSSxPQUFLeEIsS0FBVCxFQUFnQjtBQUNkLGlCQUFLTixPQUFMLENBQWEsQ0FBYixFQUFnQnRELEtBQWhCO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsaUJBQUtzRCxPQUFMLENBQWEsT0FBS3pCLFdBQUwsR0FBbUIsQ0FBaEMsRUFBbUM3QixLQUFuQztBQUNEO0FBQ0YsT0FOK0MsRUFNN0NFLFFBTjZDLENBQWhEO0FBT0E7OztBQXhCaUIsVUEyQlRHLE1BM0JTLEdBMkJFLElBM0JGLENBMkJUQSxNQTNCUzs7QUE0QmpCLGFBQU9BLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0NBLE9BQU8sSUFBUCxDQUFoQztBQUNEOzs7NkJBRVM7QUFBQSxVQUNBa0IsTUFEQSxHQUNXLElBRFgsQ0FDQUEsTUFEQTs7QUFFUixVQUFNOEQsU0FBUzdELE9BQU84RCxNQUFQLENBQWMsSUFBZCxFQUFvQjlGLE9BQXBCLEVBQThCK0IsTUFBOUIsQ0FBZjs7QUFFQSxXQUFLZ0UsVUFBTCxDQUFnQkYsTUFBaEI7QUFDRDs7OztFQWhTbUMsZUFBS0csUzs7a0JBQXRCdEUsUSIsImZpbGUiOiJzd2lwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmNvbnN0IGRldmljZSA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCkgIC8vICDojrflj5borr7lpIfkv6Hmga9cbmNvbnN0IERFRkFVTFQgPSB7XG4gIC8qKlxuICAgKiDlv4XloavpoblcbiAgICovXG4gIHNsaWRlTGVuZ3RoOiAwLCAgICAgICAgICAgICAgICAgICAgICAgLy8gIOeUseS6juebruWJjeaXoOazleebtOaOpeiOt+WPlnNsaWRl6aG15pWw77yM55uu5YmN5Y+q6IO96YCa6L+H5Y+C5pWw5YaZ5YWlXG4gIC8qKlxuICAgKiDlj6/pgInlj4LmlbBcbiAgICovXG4gIHdpZHRoOiBkZXZpY2Uud2luZG93V2lkdGgsXG4gIGhlaWdodDogZGV2aWNlLndpbmRvd0hlaWdodCxcbiAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gIGluaXRpYWxTbGlkZTogMCxcbiAgc3BlZWQ6IDMwMCxcbiAgdGltaW5nRnVuY3Rpb246ICdlYXNlJywgICAgICAgICAgICAgICAvLyAg6L+H5rih5Yqo55S76YCf5bqm5puy57q/XG4gIGF1dG9wbGF5OiAwLCAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIOiHquWKqOaSreaUvumXtOmalO+8jOiuvue9ruS4ujDml7bkuI3oh6rliqjmkq3mlL5cbiAgZGlyZWN0aW9uVmlld05hbWU6ICdkaXJlY3Rpb25DbGFzcycsICAgLy8gIOWvueW6lOinhuWbvuS4rWRpcmVjdGlvbuexu+WQjVxuICBhbmltYXRpb25WaWV3TmFtZTogJ2FuaW1hdGlvbkRhdGEnLCAgIC8vICDlr7nlupTop4blm77kuK1hbmltYXRpb27lsZ7mgKflkI1cbiAgLyoqXG4gICAqIOS6i+S7tuWbnuiwg1xuICAgKiBAdHlwZSB7W3R5cGVdfVxuICAgKi9cbiAgb25Jbml0OiBudWxsLCAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgc3dpcGVy5Yid5aeL5YyW5pe25omn6KGMXG4gIG9uVG91Y2hTdGFydDogbnVsbCwgICAgICAgICAgICAgICAgICAgLy8gIOaJi+aMh+eisOinpnNsaWRl5pe25omn6KGMXG4gIG9uVG91Y2hNb3ZlOiBudWxsLCAgICAgICAgICAgICAgICAgICAgLy8gIOaJi+aMh+eisOinpnNsaWRl5bm25LiU5ruR5Yqo5pe25omn6KGMXG4gIG9uVG91Y2hFbmQ6IG51bGwsICAgICAgICAgICAgICAgICAgICAgLy8gIOaJi+aMh+emu+W8gHNsaWRl5pe25omn6KGMXG4gIG9uU2xpZGVDaGFuZ2VTdGFydDogbnVsbCwgICAgICAgICAgICAgLy8gIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu25pe25omn6KGMXG4gIG9uU2xpZGVDaGFuZ2VFbmQ6IG51bGwsICAgICAgICAgICAgICAgLy8gIHN3aXBlcuS7juS4gOS4qnNsaWRl6L+H5rih5Yiw5Y+m5LiA5Liqc2xpZGXnu5PmnZ/ml7bmiafooYxcbiAgb25UcmFuc2l0aW9uU3RhcnQ6IG51bGwsICAgICAgICAgICAgICAvLyAg6L+H5rih5pe26Kem5Y+RXG4gIG9uVHJhbnNpdGlvbkVuZDogbnVsbCwgICAgICAgICAgICAgICAgLy8gIOi/h+a4oee7k+adn+aXtuaJp+ihjFxuICBvblNsaWRlTW92ZTogbnVsbCwgICAgICAgICAgICAgICAgICAgIC8vICDmiYvmjIfop6bnorBzd2lwZXLlubbkuJTmi5bliqhzbGlkZeaXtuaJp+ihjFxuICBvblNsaWRlTmV4dFN0YXJ0OiBudWxsLCAgICAgICAgICAgICAgIC8vICBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5Y+z44CB5LiL77yJ5YiH5o2i5pe25omn6KGMXG4gIG9uU2xpZGVOZXh0RW5kOiBudWxsLCAgICAgICAgICAgICAgICAgLy8gIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu2IOS4lOinhOWumuS6huaWueWQkSDlkJHliY3vvIjlj7PjgIHkuIvvvInliIfmjaLnu5PmnZ/ml7bmiafooYxcbiAgb25TbGlkZVByZXZTdGFydDogbnVsbCwgICAgICAgICAgICAgICAvLyAgc2xpZGXovr7liLDov4fmuKHmnaHku7Yg5LiU6KeE5a6a5LqG5pa55ZCRIOWQkeWJje+8iOW3puOAgeS4iu+8ieWIh+aNouaXtuaJp+ihjFxuICBvblNsaWRlUHJldkVuZDogbnVsbCAgICAgICAgICAgICAgICAgIC8vICBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5bem44CB5LiK77yJ5YiH5o2i57uT5p2f5pe25omn6KGMXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHdlU3dpcGVyIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBkYXRhID0ge1xuICAgIGRpcmVjdGlvbkNsYXNzOiAnd2UtY29udGFpbmVyLWhvcml6b250YWwnLFxuICAgIGFuaW1hdGlvbkRhdGE6IG51bGxcbiAgfVxuXG4gIHByb3BzID0ge1xuICAgIG9wdGlvbjogT2JqZWN0XG4gIH1cblxuICBtZXRob2RzID0ge1xuICAgIHRvdWNoc3RhcnQgKGUpIHtcbiAgICAgIGNvbnN0IHsgb25Ub3VjaFN0YXJ0LCBYT1JZLCBhY3RpdmVJbmRleCwgcmVjdERpc3RhbmNlIH0gPSB0aGlzXG4gICAgICBjb25zdCB0b3VjaCA9IGUuY2hhbmdlZFRvdWNoZXNbMF1cbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gdG91Y2hbYGNsaWVudCR7WE9SWX1gXVxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gIC0gYWN0aXZlSW5kZXggKiByZWN0RGlzdGFuY2VcblxuICAgICAgdGhpc1tgdG91Y2hTdGFydCR7WE9SWX1gXSA9IGRpc3RhbmNlXG4gICAgICB0aGlzW2B0cmFuc2xhdGUke1hPUll9YF0gPSB0cmFuc2xhdGVcbiAgICAgIHRoaXMudG91Y2hTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuXG4gICAgICB0eXBlb2Ygb25Ub3VjaFN0YXJ0ID09PSAnZnVuY3Rpb24nICYmIG9uVG91Y2hTdGFydCh0aGlzLCBlKSAvLyAg5b2T5omL5oyH56Kw6Kem5Yiwc2xpZGXml7bmiafooYxcblxuICAgICAgdGhpcy5zbGlkZUFuaW1hdGlvbih0cmFuc2xhdGUsIDApXG4gICAgfSxcblxuICAgIHRvdWNobW92ZSAoZSkge1xuICAgICAgY29uc3QgeyBvblRvdWNoTW92ZSwgWE9SWSwgb25TbGlkZU1vdmUgfSA9IHRoaXNcbiAgICAgIGNvbnN0IHRvdWNoID0gZS5jaGFuZ2VkVG91Y2hlc1swXVxuICAgICAgY29uc3QgZGlzdGFuY2UgPSB0b3VjaFtgY2xpZW50JHtYT1JZfWBdXG4gICAgICBjb25zdCB0bXBNb3ZlID0gdGhpc1tgdHJhbnNsYXRlJHtYT1JZfWBdICsgZGlzdGFuY2UgLSB0aGlzW2B0b3VjaFN0YXJ0JHtYT1JZfWBdXG5cbiAgICAgIHR5cGVvZiBvblRvdWNoTW92ZSA9PT0gJ2Z1bmN0aW9uJyAmJiBvblRvdWNoTW92ZSh0aGlzLCBlKSAvLyAg5omL5oyH56Kw6Kemc2xpZGXlubbkuJTmu5Hliqjml7bmiafooYxcblxuICAgICAgdGhpcy5zbGlkZUFuaW1hdGlvbih0bXBNb3ZlLCAwKVxuXG4gICAgICB0eXBlb2Ygb25TbGlkZU1vdmUgPT09ICdmdW5jdGlvbicgJiYgb25TbGlkZU1vdmUodGhpcylcbiAgICB9LFxuXG4gICAgdG91Y2hlbmQgKGUpIHtcbiAgICAgIGNvbnN0IHsgb25Ub3VjaEVuZCwgWE9SWSwgc3BlZWQsIHRvdWNoU3RhcnRUaW1lLCByZWN0RGlzdGFuY2UgfSA9IHRoaXNcbiAgICAgIGNvbnN0IHRvdWNoID0gZS5jaGFuZ2VkVG91Y2hlc1swXVxuICAgICAgY29uc3QgZGlzdGFuY2UgPSB0b3VjaFtgY2xpZW50JHtYT1JZfWBdXG4gICAgICBjb25zdCB0b3VjaEVuZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuXG4gICAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmFjdGlvbih0b3VjaFN0YXJ0VGltZSwgdG91Y2hFbmRUaW1lLCB0aGlzW2B0b3VjaFN0YXJ0JHtYT1JZfWBdLCBkaXN0YW5jZSwgcmVjdERpc3RhbmNlKVxuXG4gICAgICB0eXBlb2Ygb25Ub3VjaEVuZCA9PT0gJ2Z1bmN0aW9uJyAmJiBvblRvdWNoRW5kKHRoaXMsIGUpIC8vICDmiYvmjIfnprvlvIBzbGlkZeaXtuaJp+ihjFxuXG4gICAgICB0aGlzW2FjdGlvbl0odHJ1ZSwgc3BlZWQpXG4gICAgfVxuICB9XG5cbiAgZXZlbnRzID0ge31cblxuICAvKipcbiAgICog5YiH5o2i5o6n5Yi25ZmoXG4gICAqIEBwYXJhbSB0b3VjaFN0YXJ0VGltZe+8miDmiYvmjIfop6bnorBzbGlkZeaXtueahOaXtumXtOaIs1xuICAgKiBAcGFyYW0gZXTvvJog5omL5oyH56a75byAc2xpZGXml7bnmoTml7bpl7TmiLNcbiAgICogQHBhcmFtIGZyb23vvJog5omL5oyH6Kem56Kwc2xpZGXml7bnmoTlsY/luZXkvY3nva5cbiAgICogQHBhcmFtIHRv77yaIOaJi+aMh+emu+W8gHNsaWRl5pe255qE5bGP5bmV5L2N572uXG4gICAqIEBwYXJhbSB3cmFwcGVyRGlzdGFuY2XvvJogc2xpZGXmu5HliqjmlrnlkJHkuIrnmoTlrrnlmajplb/luqZcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBhY3Rpb24gKHRvdWNoU3RhcnRUaW1lLCB0b3VjaEVuZFRpbWUsIGZyb20sIHRvLCB3cmFwcGVyRGlzdGFuY2UpIHtcbiAgICBjb25zdCB7XG4gICAgICBhY3RpdmVJbmRleCxcbiAgICAgIHNsaWRlTGVuZ3RoLFxuICAgICAgb25UcmFuc2l0aW9uU3RhcnQgfSA9IHRoaXNcbiAgICBjb25zdCBkZWx0YVRpbWUgPSB0b3VjaEVuZFRpbWUgLSB0b3VjaFN0YXJ0VGltZSAgLy8gIOaJi+aMh+inpuaRuOaXtumVv1xuICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5hYnModG8gLSBmcm9tKSAgLy8gIOa7keWKqOi3neemu1xuXG4gICAgY29uc3QgayA9IGRpc3RhbmNlIC8gZGVsdGFUaW1lXG5cbiAgICBpZiAodG8gPiBmcm9tKSB7XG4gICAgICB0eXBlb2Ygb25UcmFuc2l0aW9uU3RhcnQgPT09ICdmdW5jdGlvbicgJiYgb25UcmFuc2l0aW9uU3RhcnQoc2VsZikgIC8vIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu25pe25omn6KGMXG4gICAgICByZXR1cm4gKGsgPiAwLjMgfHwgZGlzdGFuY2UgPiB3cmFwcGVyRGlzdGFuY2UgLyAyKSA/IChhY3RpdmVJbmRleCA9PT0gMCA/ICdzbGlkZUJhY2snIDogJ3NsaWRlUHJldicpIDogJ3NsaWRlQmFjaydcbiAgICB9XG5cbiAgICBpZiAodG8gPCBmcm9tKSB7XG4gICAgICB0eXBlb2Ygb25UcmFuc2l0aW9uU3RhcnQgPT09ICdmdW5jdGlvbicgJiYgb25UcmFuc2l0aW9uU3RhcnQoc2VsZikgIC8vIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu25pe25omn6KGMXG4gICAgICByZXR1cm4gKGsgPiAwLjMgfHwgZGlzdGFuY2UgPiB3cmFwcGVyRGlzdGFuY2UgLyAyKSA/IChhY3RpdmVJbmRleCA9PT0gc2xpZGVMZW5ndGggLSAxID8gJ3NsaWRlQmFjaycgOiAnc2xpZGVOZXh0JykgOiAnc2xpZGVCYWNrJ1xuICAgIH1cblxuICAgIGlmICh0byA9IGZyb20pIHtcbiAgICAgIHJldHVybiAnc2xpZGVCYWNrJ1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIOWIh+aNouiHs+S4i+S4gOS4qnNsaWRlXG4gICAqIEBwYXJhbSBydW5DYWxsYmFja3PvvJog5Y+v6YCJ77yMYm9vbGVhbu+8jOiuvue9ruS4umZhbHNl5pe25LiN5Lya6Kem5Y+Rb25TbGlkZUNoYW5nZeWbnuiwg+WHveaVsFxuICAgKiBAcGFyYW0gc3BlZWQ6IOWPr+mAie+8jG51bSjljZXkvY1tcynvvIzliIfmjaLpgJ/luqZcbiAgICovXG4gIHNsaWRlTmV4dCAocnVuQ2FsbGJhY2tzID0gZmFsc2UsIHNwZWVkID0gMzAwKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICBjb25zdCB7XG4gICAgICBvblNsaWRlTmV4dFN0YXJ0LFxuICAgICAgb25TbGlkZU5leHRFbmRcbiAgICB9ID0gc2VsZlxuXG4gICAgdHlwZW9mIG9uU2xpZGVOZXh0U3RhcnQgPT09ICdmdW5jdGlvbicgJiYgb25TbGlkZU5leHRTdGFydChzZWxmKSAgLy8gc2xpZGXovr7liLDov4fmuKHmnaHku7bml7bmiafooYxcblxuICAgIHNlbGYuc2xpZGVUbyhzZWxmLmFjdGl2ZUluZGV4ICsgMSwgc3BlZWQsIHJ1bkNhbGxiYWNrcylcblxuICAgIHR5cGVvZiBvblNsaWRlTmV4dEVuZCA9PT0gJ2Z1bmN0aW9uJyAmJiBzZXRUaW1lb3V0KCgpID0+IHsgb25TbGlkZU5leHRFbmQoc2VsZikgfSwgc3BlZWQpICAvLyAgc2xpZGXov4fmuKHnu5PmnZ/lkI7miafooYxcbiAgfVxuXG4gIC8qKlxuICAgKiDliIfmjaLoh7PkuIrkuIDkuKpzbGlkZVxuICAgKiBAcGFyYW0gcnVuQ2FsbGJhY2tz77yaIOWPr+mAie+8jGJvb2xlYW7vvIzorr7nva7kuLpmYWxzZeaXtuS4jeS8muinpuWPkW9uU2xpZGVDaGFuZ2Xlm57osIPlh73mlbBcbiAgICogQHBhcmFtIHNwZWVkOiDlj6/pgInvvIxudW0o5Y2V5L2NbXMp77yM5YiH5o2i6YCf5bqmXG4gICAqL1xuICBzbGlkZVByZXYgKHJ1bkNhbGxiYWNrcyA9IGZhbHNlLCBzcGVlZCA9IDMwMCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgY29uc3Qge1xuICAgICAgb25TbGlkZVByZXZTdGFydCxcbiAgICAgIG9uU2xpZGVQcmV2RW5kXG4gICAgfSA9IHNlbGZcblxuICAgIHR5cGVvZiBvblNsaWRlUHJldlN0YXJ0ID09PSAnZnVuY3Rpb24nICYmIG9uU2xpZGVQcmV2U3RhcnQoc2VsZikgIC8vIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu25pe25omn6KGMXG5cbiAgICBzZWxmLnNsaWRlVG8oc2VsZi5hY3RpdmVJbmRleCAtIDEsIHNwZWVkLCBydW5DYWxsYmFja3MpXG5cbiAgICB0eXBlb2Ygb25TbGlkZVByZXZFbmQgPT09ICdmdW5jdGlvbicgJiYgc2V0VGltZW91dCgoKSA9PiB7IG9uU2xpZGVQcmV2RW5kKHNlbGYpIH0sIHNwZWVkKSAgLy8gIHNsaWRl6L+H5rih57uT5p2f5ZCO5omn6KGMXG4gIH1cblxuICAvKipcbiAgICog5Zue5by5XG4gICAqIEBwYXJhbSBydW5DYWxsYmFja3M6IOWPr+mAie+8jGJvb2xlYW7vvIzorr7nva7kuLpmYWxzZeaXtuS4jeS8muinpuWPkW9uU2xpZGVDaGFuZ2Xlm57osIPlh73mlbBcbiAgICogQHBhcmFtIHNwZWVkOiDlj6/pgInvvIxudW0o5Y2V5L2NbXMp77yM5YiH5o2i6YCf5bqmXG4gICAqL1xuICBzbGlkZUJhY2sgKHJ1bkNhbGxiYWNrcyA9IGZhbHNlLCBzcGVlZCA9IDMwMCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgY29uc3Qge1xuICAgICAgWE9SWSxcbiAgICAgIGFjdGl2ZUluZGV4LFxuICAgICAgcmVjdERpc3RhbmNlLFxuICAgICAgb25UcmFuc2l0aW9uRW5kXG4gICAgfSA9IHNlbGZcblxuICAgIGNvbnN0IHRyYW5zbGF0ZSA9IC0gYWN0aXZlSW5kZXggKiByZWN0RGlzdGFuY2VcblxuICAgIHNlbGYuc2xpZGVBbmltYXRpb24odHJhbnNsYXRlLCBzcGVlZClcblxuICAgIHR5cGVvZiBvblRyYW5zaXRpb25FbmQgPT09ICdmdW5jdGlvbicgJiYgc2V0VGltZW91dCgoKSA9PiB7IG9uVHJhbnNpdGlvbkVuZChzZWxmKSB9LCBzcGVlZCkgIC8vICBzbGlkZei/h+a4oee7k+adn+WQjuaJp+ihjFxuICB9XG5cbiAgLyoqXG4gICAqIOWIh+aNouWIsOaMh+WumnNsaWRlXG4gICAqIEBwYXJhbSBpbmRleO+8muW/hemAie+8jG51be+8jOaMh+WumuWwhuimgeWIh+aNouWIsOeahHNsaWRl55qE57Si5byVXG4gICAqIEBwYXJhbSBzcGVlZO+8muWPr+mAie+8jG51bSjljZXkvY1tcynvvIzliIfmjaLpgJ/luqZcbiAgICogQHBhcmFtIHJ1bkNhbGxiYWNrc++8muWPr+mAie+8jGJvb2xlYW7vvIzorr7nva7kuLpmYWxzZeaXtuS4jeS8muinpuWPkW9uU2xpZGVDaGFuZ2Xlm57osIPlh73mlbBcbiAgICovXG4gIHNsaWRlVG8gKGluZGV4LCBzcGVlZCA9IDMwMCwgcnVuQ2FsbGJhY2tzID0gZmFsc2UpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgIGNvbnN0IHtcbiAgICAgIHNsaWRlTGVuZ3RoLFxuICAgICAgYWN0aXZlSW5kZXgsXG4gICAgICByZWN0RGlzdGFuY2UsXG4gICAgICBvblNsaWRlQ2hhbmdlU3RhcnQsXG4gICAgICBvblNsaWRlQ2hhbmdlRW5kLFxuICAgICAgb25UcmFuc2l0aW9uRW5kLFxuICAgICAgY29uc29sZUV4Y2VwdGlvblxuICAgIH0gPSBzZWxmXG5cbiAgICB0cnkge1xuICAgICAgaWYgKHR5cGVvZiAgaW5kZXggIT09ICdudW1iZXInKSB0aHJvdyAncGFyYW1UeXBlJyAvLyAg5Y+C5pWw57G75Z6L6ZSZ6K+vXG4gICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gc2xpZGVMZW5ndGggLSAxKSB0aHJvdyAnYm91bmQnICAgLy8gIOi2iueVjFxuXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSAtIGluZGV4ICogcmVjdERpc3RhbmNlXG4gICAgICBzZWxmLnByZXZpb3VzSW5kZXggPSBhY3RpdmVJbmRleFxuICAgICAgc2VsZi5hY3RpdmVJbmRleCA9IGluZGV4XG4gICAgICBzZWxmLmlzQmVnaW5uaW5nID0gc2VsZi5hY3RpdmVJbmRleCA9PT0gc2VsZi5pbml0aWFsU2xpZGVcbiAgICAgIHNlbGYuaXNFbmQgPSBzZWxmLmFjdGl2ZUluZGV4ID09PSBzZWxmLnNsaWRlTGVuZ3RoIC0gMVxuXG4gICAgICBydW5DYWxsYmFja3MgJiYgdHlwZW9mIG9uU2xpZGVDaGFuZ2VTdGFydCA9PT0gJ2Z1bmN0aW9uJyAmJiBvblNsaWRlQ2hhbmdlU3RhcnQoc2VsZikgIC8vIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu25pe25omn6KGMXG5cbiAgICAgIHNlbGYuc2xpZGVBbmltYXRpb24odHJhbnNsYXRlLCBzcGVlZClcblxuICAgICAgcnVuQ2FsbGJhY2tzICYmICB0eXBlb2Ygb25TbGlkZUNoYW5nZUVuZCA9PT0gJ2Z1bmN0aW9uJyAmJiBzZXRUaW1lb3V0KCgpID0+IHsgb25TbGlkZUNoYW5nZUVuZChzZWxmKSB9LCBzcGVlZCkgIC8vICBzd2lwZXLku47kuIDkuKpzbGlkZei/h+a4oeWIsOWPpuS4gOS4qnNsaWRl57uT5p2f5ZCO5omn6KGMXG4gICAgICB0eXBlb2Ygb25UcmFuc2l0aW9uRW5kID09PSAnZnVuY3Rpb24nICYmIHNldFRpbWVvdXQoKCkgPT4geyBvblRyYW5zaXRpb25FbmQoc2VsZikgfSwgc3BlZWQpICAvLyAgc2xpZGXov4fmuKHnu5PmnZ/lkI7miafooYxcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGVFeGNlcHRpb24oZXJyLCAnc2xpZGVUb1tGdW5jdGlvbl0nKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDlubPnp7vliqjnlLtcbiAgICogQHBhcmFtIHRyYW5zbGF0Ze+8muW5s+enu+S9jee9rlxuICAgKiBAcGFyYW0gc3BlZWTvvJrov4fmuKHml7bplb9cbiAgICogQHBhcmFtIHRpbWluZ0Z1bmN0aW9u77ya6L+H5rih57G75Z6LXG4gICAqL1xuICBzbGlkZUFuaW1hdGlvbiAodHJhbnNsYXRlID0gMCwgc3BlZWQgPSAzMDAsIHRpbWluZ0Z1bmN0aW9uID0gJ2Vhc2UnKSB7XG4gICAgY29uc3QgUkVHID0ge1xuICAgICAgVFJBTlNMQVRFOiAvXigwfFsxLTldWzAtOV0qfC1bMS05XVswLTldKikkLyxcbiAgICAgIFNQRUVEOiAvXigwfFsxLTldWzAtOV0qfC1bMS05XVswLTldKikkLyxcbiAgICAgIFRJTUlOR0ZVTkNUSU9OOiAvbGluZWFyfGVhc2V8ZWFzZS1pbnxlYXNlLWluLW91dHxlYXNlLW91dHxzdGVwLXN0YXJ0fHN0ZXAtZW5kL1xuICAgIH1cblxuICAgIGNvbnN0IHsgWE9SWSwgYW5pbWF0aW9uVmlld05hbWUsIGNvbnNvbGVFeGNlcHRpb24gfSA9IHRoaXNcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiDlvILluLjlpITnkIZcbiAgICAgICAqL1xuICAgICAgaWYoIVJFRy5UUkFOU0xBVEUudGVzdCh0cmFuc2xhdGUpKSB0aHJvdyAncGFyYW1UeXBlJ1xuICAgICAgaWYoIVJFRy5TUEVFRC50ZXN0KHNwZWVkKSkgdGhyb3cgJ3BhcmFtVHlwZSdcbiAgICAgIGlmKCFSRUcuVElNSU5HRlVOQ1RJT04udGVzdCh0aW1pbmdGdW5jdGlvbikpIHRocm93ICdwYXJhbVR5cGUnXG4gICAgICAvKipcbiAgICAgICAqIOWIm+W7uuS4gOS4quWKqOeUu+WunuS+i1xuICAgICAgICovXG4gICAgICBjb25zdCBhbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oe1xuICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICc1MCUgNTAlJyxcbiAgICAgICAgZHVyYXRpb246IHNwZWVkLFxuICAgICAgICB0aW1pbmdGdW5jdGlvbixcbiAgICAgICAgZGVsYXk6IDBcbiAgICAgIH0pXG5cbiAgICAgIGFuaW1hdGlvbltgdHJhbnNsYXRlJHtYT1JZfWBdKHRyYW5zbGF0ZSkuc3RlcCgpICAvLyAg5Yqo55S75o+P6L+wXG5cbiAgICAgIHRoaXMuc3luY1ZpZXcoYW5pbWF0aW9uVmlld05hbWUsIGFuaW1hdGlvbikgIC8vICDlkIzmraXliqjnlLvliLDop4blm75cblxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZUV4Y2VwdGlvbihlcnIsICdzbGlkZUFuaW1hdGlvbltGdW5jdGlvbl0nKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDlkIzmraXorr7nva7liLDop4blm75cbiAgICogQHBhcmFtIERFRkFVTFTvvJrpu5jorqTlj4LmlbBcbiAgICogQHBhcmFtIHBhcmFt77ya5p6E6YCg5Y+C5pWwXG4gICAqL1xuICBzeW5jVmlldyAodmlld05hbWUsIHByb3ApIHtcbiAgICAgIHRoaXNbYCR7dmlld05hbWV9YF09IHByb3BcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuXG4gIC8qKlxuICAgKiDplJnor6/lr7nnhadcbiAgICovXG4gIGNvbnNvbGVFeGNlcHRpb24gKHR5cGUsIHBsYWNlKSB7XG4gICAgY29uc3QgRVJST1IgPSB7XG4gICAgICAncGFyYW1UeXBlJzogJ+WPguaVsOexu+Wei+mUmeivrycsXG4gICAgICAnYm91bmQnOiAn5Y+C5pWw6LaK55WMJ1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgJWMke3BsYWNlfToke0VSUk9SW3R5cGVdfWAsICdjb2xvcjogcmVkJylcbiAgfVxuXG4gIC8qKlxuICAgKiDliJ3lp4vljJbphY3nva5cbiAgICovXG4gIGluaXRTd2lwZXIgKHBhcmFtKSB7XG4gICAgY29uc3Qge1xuICAgICAgc3BlZWQsXG4gICAgICBpbml0aWFsU2xpZGUsXG4gICAgICBkaXJlY3Rpb24sXG4gICAgICBhdXRvcGxheSxcbiAgICAgIGRpcmVjdGlvblZpZXdOYW1lXG4gICAgfSA9IHBhcmFtXG5cbiAgICBjb25zdCBkaXJlY3Rpb25DbGFzcyA9IGRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnID8gJ3dlLWNvbnRhaW5lci1ob3Jpem9udGFsJyA6ICd3ZS1jb250YWluZXItdmVydGljYWwnXG4gICAgdGhpcy5zeW5jVmlldyhkaXJlY3Rpb25WaWV3TmFtZSwgZGlyZWN0aW9uQ2xhc3MpXG4gICAgdGhpcy5yZWN0RGlzdGFuY2UgPSBkaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyA/IHRoaXMud2lkdGggOiB0aGlzLmhlaWdodFxuICAgIHRoaXMuWE9SWSA9IGRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnID8gJ1gnIDogJ1knXG4gICAgdGhpcy5hY3RpdmVJbmRleCA9IGluaXRpYWxTbGlkZSAgLy8gIOWwhuWIneWni+mhteeggei1i+e7mWFjdGl2ZUluZGV4XG4gICAgdGhpcy5ub1N3aXBlciA9IGZhbHNlICAvLyAg6Zi75q2i5omL5Yq/5ruR5YqoXG4gICAgdGhpcy5wcmV2aW91c0luZGV4ID0gaW5pdGlhbFNsaWRlICAvLyAg6L+U5Zue5LiK5LiA5Liq5rS75Yqo5Z2X55qE57Si5byV77yM5YiH5o2i5YmN55qE57Si5byVXG4gICAgdGhpcy5zbGlkZVRvKGluaXRpYWxTbGlkZSwgMClcbiAgICB0eXBlb2YgYXV0b3BsYXkgPT09ICdudW1iZXInICYmIGF1dG9wbGF5ID4gMCAmJiBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc0VuZCkge1xuICAgICAgICB0aGlzLnNsaWRlVG8oMCwgc3BlZWQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNsaWRlVG8odGhpcy5hY3RpdmVJbmRleCArIDEsIHNwZWVkKVxuICAgICAgfVxuICAgIH0sIGF1dG9wbGF5KVxuICAgIC8qKlxuICAgICAqIOWkhOeQhmNhbGxiYWNrXG4gICAgICovXG4gICAgY29uc3QgeyBvbkluaXQgfSA9IHRoaXNcbiAgICB0eXBlb2Ygb25Jbml0ID09PSAnZnVuY3Rpb24nICYmIG9uSW5pdCh0aGlzKVxuICB9XG5cbiAgb25Mb2FkICgpIHtcbiAgICBjb25zdCB7IG9wdGlvbiB9ID0gdGhpc1xuICAgIGNvbnN0IENPTkZJRyA9IE9iamVjdC5hc3NpZ24odGhpcywgREVGQVVMVCAsIG9wdGlvbilcblxuICAgIHRoaXMuaW5pdFN3aXBlcihDT05GSUcpXG4gIH1cbn1cbiJdfQ==