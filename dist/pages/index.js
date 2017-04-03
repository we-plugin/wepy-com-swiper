'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _swiper = require('./../components/swiper.js');

var _swiper2 = _interopRequireDefault(_swiper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: 'test'
    }, _this.$props = { "weSwiper": { "v-bind:option.once": "swiper" } }, _this.$events = {}, _this.components = {
      weSwiper: _swiper2.default
    }, _this.data = {
      swiper: {
        direction: 'vertical',
        slideLength: 3,
        /**
         * swiper初始化后执行
         * @param swiper
         */
        onInit: function onInit(weswiper) {},

        /**
         * 手指碰触slide时执行
         * @param swiper
         * @param event
         */
        onTouchStart: function onTouchStart(weswiper, event) {},

        /**
         * 手指碰触slide并且滑动时执行
         * @param swiper
         * @param event
         */
        onTouchMove: function onTouchMove(weswiper, event) {},

        /**
         * 手指离开slide时执行
         * @param swiper
         * @param event
         */
        onTouchEnd: function onTouchEnd(weswiper, event) {},

        /**
         *  slide达到过渡条件时执行
         */
        onSlideChangeStart: function onSlideChangeStart(weswiper) {},

        /**
         *  swiper从一个slide过渡到另一个slide结束时执行
         */
        onSlideChangeEnd: function onSlideChangeEnd(weswiper) {},

        /**
         *  过渡时触发
         */
        onTransitionStart: function onTransitionStart(weswiper) {},

        /**
         *  过渡结束时执行
         */
        onTransitionEnd: function onTransitionEnd(weswiper) {},

        /**
         *  手指触碰swiper并且拖动slide时执行
         */
        onSlideMove: function onSlideMove(weswiper) {},

        /**
         * slide达到过渡条件 且规定了方向 向前（右、下）切换时执行
         */
        onSlideNextStart: function onSlideNextStart(weswiper) {},

        /**
         *  slide达到过渡条件 且规定了方向 向前（右、下）切换结束时执行
         */
        onSlideNextEnd: function onSlideNextEnd(weswiper) {},

        /**
         *  slide达到过渡条件 且规定了方向 向前（左、上）切换时执行
         */
        onSlidePrevStart: function onSlidePrevStart(swiper) {},

        /**
         *  slide达到过渡条件 且规定了方向 向前（左、上）切换结束时执行
         */
        onSlidePrevEnd: function onSlidePrevEnd(weswiper) {}
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
      var _this2 = this;

      setTimeout(function () {
        return _this2.$invoke('weSwiper', 'slideTo', 2);
      }, 3000);
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwid2VTd2lwZXIiLCJkYXRhIiwic3dpcGVyIiwiZGlyZWN0aW9uIiwic2xpZGVMZW5ndGgiLCJvbkluaXQiLCJ3ZXN3aXBlciIsIm9uVG91Y2hTdGFydCIsImV2ZW50Iiwib25Ub3VjaE1vdmUiLCJvblRvdWNoRW5kIiwib25TbGlkZUNoYW5nZVN0YXJ0Iiwib25TbGlkZUNoYW5nZUVuZCIsIm9uVHJhbnNpdGlvblN0YXJ0Iiwib25UcmFuc2l0aW9uRW5kIiwib25TbGlkZU1vdmUiLCJvblNsaWRlTmV4dFN0YXJ0Iiwib25TbGlkZU5leHRFbmQiLCJvblNsaWRlUHJldlN0YXJ0Iiwib25TbGlkZVByZXZFbmQiLCJzZXRUaW1lb3V0IiwiJGludm9rZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMsc0JBQXFCLFFBQXRCLEVBQVosRSxRQUNaQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDUkM7QUFEUSxLLFFBSVZDLEksR0FBTztBQUNMQyxjQUFRO0FBQ05DLG1CQUFXLFVBREw7QUFFTkMscUJBQWEsQ0FGUDtBQUdOOzs7O0FBSUFDLGNBUE0sa0JBT0VDLFFBUEYsRUFPWSxDQUVqQixDQVRLOztBQVVOOzs7OztBQUtBQyxvQkFmTSx3QkFlUUQsUUFmUixFQWVrQkUsS0FmbEIsRUFleUIsQ0FFOUIsQ0FqQks7O0FBa0JOOzs7OztBQUtBQyxtQkF2Qk0sdUJBdUJPSCxRQXZCUCxFQXVCaUJFLEtBdkJqQixFQXVCd0IsQ0FFN0IsQ0F6Qks7O0FBMEJOOzs7OztBQUtBRSxrQkEvQk0sc0JBK0JNSixRQS9CTixFQStCZ0JFLEtBL0JoQixFQStCdUIsQ0FFNUIsQ0FqQ0s7O0FBa0NOOzs7QUFHQUcsMEJBckNNLDhCQXFDY0wsUUFyQ2QsRUFxQ3dCLENBRTdCLENBdkNLOztBQXdDTjs7O0FBR0FNLHdCQTNDTSw0QkEyQ1lOLFFBM0NaLEVBMkNzQixDQUUzQixDQTdDSzs7QUE4Q047OztBQUdBTyx5QkFqRE0sNkJBaURhUCxRQWpEYixFQWlEdUIsQ0FFNUIsQ0FuREs7O0FBb0ROOzs7QUFHQVEsdUJBdkRNLDJCQXVEV1IsUUF2RFgsRUF1RHFCLENBRTFCLENBekRLOztBQTBETjs7O0FBR0FTLG1CQTdETSx1QkE2RE9ULFFBN0RQLEVBNkRpQixDQUV0QixDQS9ESzs7QUFnRU47OztBQUdBVSx3QkFuRU0sNEJBbUVZVixRQW5FWixFQW1Fc0IsQ0FFM0IsQ0FyRUs7O0FBc0VOOzs7QUFHQVcsc0JBekVNLDBCQXlFVVgsUUF6RVYsRUF5RW9CLENBRXpCLENBM0VLOztBQTRFTjs7O0FBR0FZLHdCQS9FTSw0QkErRVloQixNQS9FWixFQStFb0IsQ0FFekIsQ0FqRks7O0FBa0ZOOzs7QUFHQWlCLHNCQXJGTSwwQkFxRlViLFFBckZWLEVBcUZvQixDQUV6QjtBQXZGSztBQURILEs7Ozs7OzZCQTJGRTtBQUFBOztBQUNQYyxpQkFBVztBQUFBLGVBQUssT0FBS0MsT0FBTCxDQUFhLFVBQWIsRUFBeUIsU0FBekIsRUFBb0MsQ0FBcEMsQ0FBTDtBQUFBLE9BQVgsRUFBd0QsSUFBeEQ7QUFDRDs7OztFQXZHZ0MsZUFBS0MsSTs7a0JBQW5CNUIsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IHdlU3dpcGVyIGZyb20gJy4uL2NvbXBvbmVudHMvc3dpcGVyJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICd0ZXN0J1xyXG4gICAgfVxyXG4gICAkcHJvcHMgPSB7XCJ3ZVN3aXBlclwiOntcInYtYmluZDpvcHRpb24ub25jZVwiOlwic3dpcGVyXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgd2VTd2lwZXI6IHdlU3dpcGVyXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgc3dpcGVyOiB7XHJcbiAgICAgICAgZGlyZWN0aW9uOiAndmVydGljYWwnLFxyXG4gICAgICAgIHNsaWRlTGVuZ3RoOiAzLFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHN3aXBlcuWIneWni+WMluWQjuaJp+ihjFxyXG4gICAgICAgICAqIEBwYXJhbSBzd2lwZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkluaXQgKHdlc3dpcGVyKSB7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5omL5oyH56Kw6Kemc2xpZGXml7bmiafooYxcclxuICAgICAgICAgKiBAcGFyYW0gc3dpcGVyXHJcbiAgICAgICAgICogQHBhcmFtIGV2ZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25Ub3VjaFN0YXJ0ICh3ZXN3aXBlciwgZXZlbnQpIHtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmiYvmjIfnorDop6ZzbGlkZeW5tuS4lOa7keWKqOaXtuaJp+ihjFxyXG4gICAgICAgICAqIEBwYXJhbSBzd2lwZXJcclxuICAgICAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBvblRvdWNoTW92ZSAod2Vzd2lwZXIsIGV2ZW50KSB7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5omL5oyH56a75byAc2xpZGXml7bmiafooYxcclxuICAgICAgICAgKiBAcGFyYW0gc3dpcGVyXHJcbiAgICAgICAgICogQHBhcmFtIGV2ZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25Ub3VjaEVuZCAod2Vzd2lwZXIsIGV2ZW50KSB7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu25pe25omn6KGMXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25TbGlkZUNoYW5nZVN0YXJ0ICh3ZXN3aXBlcikge1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBzd2lwZXLku47kuIDkuKpzbGlkZei/h+a4oeWIsOWPpuS4gOS4qnNsaWRl57uT5p2f5pe25omn6KGMXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25TbGlkZUNoYW5nZUVuZCAod2Vzd2lwZXIpIHtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAg6L+H5rih5pe26Kem5Y+RXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25UcmFuc2l0aW9uU3RhcnQgKHdlc3dpcGVyKSB7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIOi/h+a4oee7k+adn+aXtuaJp+ihjFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uVHJhbnNpdGlvbkVuZCAod2Vzd2lwZXIpIHtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAg5omL5oyH6Kem56Kwc3dpcGVy5bm25LiU5ouW5Yqoc2xpZGXml7bmiafooYxcclxuICAgICAgICAgKi9cclxuICAgICAgICBvblNsaWRlTW92ZSAod2Vzd2lwZXIpIHtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5Y+z44CB5LiL77yJ5YiH5o2i5pe25omn6KGMXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25TbGlkZU5leHRTdGFydCAod2Vzd2lwZXIpIHtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgc2xpZGXovr7liLDov4fmuKHmnaHku7Yg5LiU6KeE5a6a5LqG5pa55ZCRIOWQkeWJje+8iOWPs+OAgeS4i++8ieWIh+aNoue7k+adn+aXtuaJp+ihjFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uU2xpZGVOZXh0RW5kICh3ZXN3aXBlcikge1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5bem44CB5LiK77yJ5YiH5o2i5pe25omn6KGMXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25TbGlkZVByZXZTdGFydCAoc3dpcGVyKSB7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu2IOS4lOinhOWumuS6huaWueWQkSDlkJHliY3vvIjlt6bjgIHkuIrvvInliIfmjaLnu5PmnZ/ml7bmiafooYxcclxuICAgICAgICAgKi9cclxuICAgICAgICBvblNsaWRlUHJldkVuZCAod2Vzd2lwZXIpIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT50aGlzLiRpbnZva2UoJ3dlU3dpcGVyJywgJ3NsaWRlVG8nLCAyKSwgMzAwMClcclxuICAgIH1cclxuICB9XHJcbiJdfQ==