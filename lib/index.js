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

var InviewMonitor = function (_Component) {
  _inherits(InviewMonitor, _Component);

  function InviewMonitor(props) {
    _classCallCheck(this, InviewMonitor);

    var _this = _possibleConstructorReturn(this, (InviewMonitor.__proto__ || Object.getPrototypeOf(InviewMonitor)).call(this));

    _this.state = {
      className: props.classNameInitial || ''
    };
    _this._handleScroll = _this._handleScroll.bind(_this);
    return _this;
  }

  _createClass(InviewMonitor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          useInviewMonitor = _props.useInviewMonitor,
          mountInitDelayTime = _props.mountInitDelayTime,
          intoViewRatioShownThreshold = _props.intoViewRatioShownThreshold;

      if (!useInviewMonitor || typeof useInviewMonitor === 'function' && !useInviewMonitor()) {
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
        var elementHeight = _this2._element.getBoundingClientRect().height;
        var elementHeightThreshold = elementHeight * (1 - intoViewRatioShownThreshold);
        // when element is just above the bottom of the screen
        _this2._scrollIntoViewThreshold = elementOffsetTop - window.innerHeight * (1 - intoViewRatioShownThreshold);
        console.log('elementOffsetTop - (window.innerHeight * (1 - intoViewRatioShownThreshold))', _this2._scrollIntoViewThreshold);

        _this2._alt = elementOffsetTop - elementHeightThreshold;
        console.log('this._alt', _this2._alt);
        // better to convert to below:
        // this._scrollIntoViewThreshold = elementOffsetTop - window.innerHeight - elementHeightThreshold
        // when bottom of element is just at the top of the screen (about to be scrolled past)
        _this2._scrollOutOffViewThreshold = elementOffsetTop + elementHeight - elementHeightThreshold;

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
          childPropsOnScrollIntoView = _props2.childPropsOnScrollIntoView,
          classNameScrolledPastView = _props2.classNameScrolledPastView,
          classNameInitial = _props2.classNameInitial;


      console.log(yOffset);
      if (yOffset > this._scrollIntoViewThreshold) {
        console.log('======NOW======', yOffset);
        if (classNameOnScrollIntoView || childPropsOnScrollIntoView) {
          this.setState({
            className: classNameOnScrollIntoView,
            childProps: childPropsOnScrollIntoView
          });
          window.removeEventListener('scroll', this._throttledScroll);
        }
      }
      if (classNameScrolledPastView) {
        var currentlyScrolledPast = yOffset > this._scrollOutOffViewThreshold;
        if (currentlyScrolledPast && !this._scrolledPast) {
          this.setState({
            className: classNameScrolledPastView
          });
          this._scrolledPast = true;
        } else if (!currentlyScrolledPast && this._scrolledPast) {
          this.setState({
            className: classNameInitial
          });
          this._scrolledPast = false;
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

  return InviewMonitor;
}(_react.Component);

InviewMonitor.propTypes = {
  // Common usage: first set vis-hidden for classNameInitial,
  classNameInitial: _propTypes2.default.string,
  // then use animate classes in onScrollIntoView, to trigger fade in etc animations
  classNameOnScrollIntoView: _propTypes2.default.string,
  // can be used for fixed navigation etc
  classNameScrolledPastView: _propTypes2.default.string,

  // another use for the InviewMonitor is to start passing a prop into an element
  // only when it has been scrolled into view; f.e. to autoplay a video.
  childPropsOnScrollIntoView: _propTypes2.default.object,

  // whether to run any scroll monintoring at all;
  // because easier to toggle this prop, then toggle not using the component at all.
  useInviewMonitor: _propTypes2.default.func,

  mountInitDelayTime: _propTypes2.default.number,
  intoViewRatioShownThreshold: _propTypes2.default.number
};
InviewMonitor.defaultProps = {
  useInviewMonitor: function useInviewMonitor() {
    return true;
  },
  mountInitDelayTime: 0,
  // how much of the element should have be into view before it's considered
  // scrolled into view? default is 15%
  intoViewRatioShownThreshold: 0.15
};

exports.default = InviewMonitor;