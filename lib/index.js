'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

var _getElementOffset = require('./getElementOffset');

var _getElementOffset2 = _interopRequireDefault(_getElementOffset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollMonitor = function (_Component) {
  _inherits(ScrollMonitor, _Component);

  function ScrollMonitor(props) {
    _classCallCheck(this, ScrollMonitor);

    var _this = _possibleConstructorReturn(this, (ScrollMonitor.__proto__ || Object.getPrototypeOf(ScrollMonitor)).call(this));

    _this.state = {
      className: props.classNameInitial || ''
    };
    _this._handleScroll = _this._handleScroll.bind(_this);
    return _this;
  }

  _createClass(ScrollMonitor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          useScrollMonitor = _props.useScrollMonitor,
          mountInitDelayTime = _props.mountInitDelayTime,
          intoViewRatioShownThreshold = _props.intoViewRatioShownThreshold;

      if (!useScrollMonitor || typeof useScrollMonitor === 'function' && !useScrollMonitor()) {
        return;
      }
      // we are about to look into the DOM for positions of elements,
      // which we will then cache and re-use to assert whether we have
      // scrolled past them etc.
      // Hence this only works if the positions we get here are correct forever,
      // as long as this element stays mounted.
      // (although if this "fails" it will only cause the scrollIntoView props
      //  to be used too early, leading "only" to too early fade-in effects etc
      //  - not absolutely critical)
      // Reasonable to try to wait for images to load,
      // but hard to know generically how long this will take;
      // depends on the site, so let the user specify.
      setTimeout(function () {
        var elementOffsetTop = (0, _getElementOffset2.default)(_this2._element).top;
        // when element is just above the bottom of the screen
        _this2._scrollIntoViewThreshold = elementOffsetTop - window.innerHeight * (1 - intoViewRatioShownThreshold);
        // when element is scrolled past, so again completely out of the screen
        _this2._scrollOutOffViewThreshold = elementOffsetTop + _this2._element.getBoundingClientRect().height;

        _this2._throttledScroll = (0, _lodash2.default)(_this2._handleScroll, 100);
        window.addEventListener('scroll', _this2._throttledScroll);
        // in case user has scrolled already
        _this2._handleScroll();
      }, mountInitDelayTime);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this._throttledScroll);
    }
  }, {
    key: '_handleScroll',
    value: function _handleScroll() {
      var yOffset = window.pageYOffset;
      var _props2 = this.props,
          classNameOnScrollIntoView = _props2.classNameOnScrollIntoView,
          childPropsOnScrollIntoView = _props2.childPropsOnScrollIntoView;


      if (yOffset > this._scrollIntoViewThreshold) {
        if (classNameOnScrollIntoView || childPropsOnScrollIntoView) {
          this.setState({
            className: classNameOnScrollIntoView,
            childProps: childPropsOnScrollIntoView
          });
          window.removeEventListener('scroll', this._throttledScroll);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          childProps = _state.childProps,
          className = _state.className,
          style = _state.style;
      var children = this.props.children;

      if (childProps && Object.keys(childProps).length) {
        children = _react2.default.cloneElement(children, childProps);
      }
      return _react2.default.createElement(
        'div',
        {
          className: className,
          style: style,
          ref: function ref(e) {
            if (e) {
              _this3._element = e;
            }
          }
        },
        children
      );
    }
  }]);

  return ScrollMonitor;
}(_react.Component);

ScrollMonitor.propTypes = {
  // Common usage: first set vis-hidden for classNameInitial,
  classNameInitial: _propTypes2.default.string,
  // then use animate classes in onScrollIntoView, to trigger fade in etc animations
  classNameOnScrollIntoView: _propTypes2.default.string,

  // another use for the ScrollMonitor is to start passing a prop into an element
  // only when it has been scrolled into view; f.e. to autoplay a video.
  childPropsOnScrollIntoView: _propTypes2.default.object,

  // whether to run any scroll monintoring at all;
  // because easier to toggle this prop, then toggle not using the component at all.
  useScrollMonitor: _propTypes2.default.func,

  mountInitDelayTime: _propTypes2.default.number,
  intoViewRatioShownThreshold: _propTypes2.default.number
};
ScrollMonitor.defaultProps = {
  useScrollMonitor: function useScrollMonitor() {
    return true;
  },
  mountInitDelayTime: 0,
  // how much of the element should have be into view before it's considered
  // scrolled into view? default is 15%
  intoViewRatioShownThreshold: 0.15
};

exports.default = ScrollMonitor;