'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _groupitem = require('./groupitem.js');

var _groupitem2 = _interopRequireDefault(_groupitem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Group = function (_wepy$component) {
  _inherits(Group, _wepy$component);

  function Group() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Group);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Group.__proto__ || Object.getPrototypeOf(Group)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      grouplist: {},
      index: {}
    }, _this.$props = { "groupitem": { "v-bind:gitem.once": { "for": "grouplist.list", "item": "item", "index": "index", "key": "key", "value": "item" } } }, _this.$events = {}, _this.components = {
      groupitem: _groupitem2.default
    }, _this.methods = {
      tap: function tap() {
        this.grouplist.name = 'Parent Random(' + Math.random() + ')';
        console.log('Clicked Group ' + this.$index + ', ID is ' + this.grouplist.id);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Group;
}(_wepy2.default.component);

exports.default = Group;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyb3VwLmpzIl0sIm5hbWVzIjpbIkdyb3VwIiwicHJvcHMiLCJncm91cGxpc3QiLCJpbmRleCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZ3JvdXBpdGVtIiwibWV0aG9kcyIsInRhcCIsIm5hbWUiLCJNYXRoIiwicmFuZG9tIiwiY29uc29sZSIsImxvZyIsIiRpbmRleCIsImlkIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsSyxHQUFRO0FBQ05DLGlCQUFXLEVBREw7QUFFTkMsYUFBTztBQUZELEssUUFLVEMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLHFCQUFvQixFQUFDLE9BQU0sZ0JBQVAsRUFBd0IsUUFBTyxNQUEvQixFQUFzQyxTQUFRLE9BQTlDLEVBQXNELE9BQU0sS0FBNUQsRUFBa0UsU0FBUSxNQUExRSxFQUFyQixFQUFiLEUsUUFDWkMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1JDO0FBRFEsSyxRQUdWQyxPLEdBQVU7QUFDUkMsU0FEUSxpQkFDRDtBQUNMLGFBQUtQLFNBQUwsQ0FBZVEsSUFBZixzQkFBdUNDLEtBQUtDLE1BQUwsRUFBdkM7QUFDQUMsZ0JBQVFDLEdBQVIsb0JBQTZCLEtBQUtDLE1BQWxDLGdCQUFtRCxLQUFLYixTQUFMLENBQWVjLEVBQWxFO0FBQ0Q7QUFKTyxLOzs7O0VBWHVCLGVBQUtDLFM7O2tCQUFuQmpCLEsiLCJmaWxlIjoiZ3JvdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBHcm91cEl0ZW0gZnJvbSAnLi9ncm91cGl0ZW0nXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICAgIGdyb3VwbGlzdDoge30sXHJcbiAgICAgIGluZGV4OiB7fVxyXG4gICAgfVxyXG5cclxuICAgJHByb3BzID0ge1wiZ3JvdXBpdGVtXCI6e1widi1iaW5kOmdpdGVtLm9uY2VcIjp7XCJmb3JcIjpcImdyb3VwbGlzdC5saXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCIsXCJ2YWx1ZVwiOlwiaXRlbVwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICBncm91cGl0ZW06IEdyb3VwSXRlbVxyXG4gICAgfVxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgdGFwICgpIHtcclxuICAgICAgICB0aGlzLmdyb3VwbGlzdC5uYW1lID0gYFBhcmVudCBSYW5kb20oJHtNYXRoLnJhbmRvbSgpfSlgXHJcbiAgICAgICAgY29uc29sZS5sb2coYENsaWNrZWQgR3JvdXAgJHt0aGlzLiRpbmRleH0sIElEIGlzICR7dGhpcy5ncm91cGxpc3QuaWR9YClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuIl19