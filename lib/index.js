'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
      className: props.classNameNotInView,
      childProps: props.childPropsNotInView
    };
    _this.onIntersectionAll = _this.onIntersectionAll.bind(_this);
    _this.onIntersection = _this.onIntersection.bind(_this);
    return _this;
  }

  _createClass(InviewMonitor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!window.IntersectionObserver) {
        console.error('react-inview-monitor found no support for IntersectionObserver.\nPerhaps use a polyfill like: https://cdn.polyfill.io/v2/polyfill.js?features=IntersectionObserver ?');
        return;
      }
      var _props = this.props,
          useInviewMonitor = _props.useInviewMonitor,
          intoViewMargin = _props.intoViewMargin;

      if (!this._element || !useInviewMonitor || typeof useInviewMonitor === 'function' && !useInviewMonitor()) {
        return;
      }
      var options = {
        rootMargin: intoViewMargin
        // any performance benefits from trying to re-use the observer?
        // possible enhancement to add later on.
      };this.observer = new window.IntersectionObserver(this.onIntersectionAll, options);
      this.observer.observe(this._element);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.observer && this.observer.disconnect();
    }
  }, {
    key: 'onIntersectionAll',
    value: function onIntersectionAll(entries) {
      entries.forEach(this.onIntersection);
    }
  }, {
    key: 'onIntersection',
    value: function onIntersection(entry) {
      if (entry.target !== this._element) {
        // this check only makes sense as long as we _dont_ share the same observer
        // between component instances.
        return;
      }
      var _props2 = this.props,
          classNameNotInView = _props2.classNameNotInView,
          classNameInView = _props2.classNameInView,
          classNameAboveView = _props2.classNameAboveView,
          classNameNotAboveView = _props2.classNameNotAboveView,
          toggleClassNameOnInView = _props2.toggleClassNameOnInView,
          childPropsInView = _props2.childPropsInView,
          childPropsNotInView = _props2.childPropsNotInView,
          toggleChildPropsOnInView = _props2.toggleChildPropsOnInView,
          onInView = _props2.onInView,
          onNotInView = _props2.onNotInView,
          repeatOnInView = _props2.repeatOnInView;


      var nowInView = entry.isIntersecting;
      var toggleBehavior = (classNameInView || classNameAboveView) && toggleClassNameOnInView || childPropsInView && toggleChildPropsOnInView || (onInView || onNotInView) && repeatOnInView;

      if (nowInView && !toggleBehavior) {
        this.setState({
          className: classNameInView,
          childProps: childPropsInView
        });
        if (onInView && typeof onInView === 'function') {
          onInView(entry);
        }
        this.observer.unobserve(entry.target);
        // is there any point trying to determine whether observer is now
        // no longer observering anything, and hence should be disconnected,
        // or is this kind of automatic?
        // To be investigated.
        return;
      }

      if (toggleBehavior) {
        // Check if we scrolled past view
        if (classNameAboveView) {
          if (
          // we just left the view
          !nowInView &&
          // are we now above it (i.e. scrolled past)
          entry.boundingClientRect.top <= 0) {
            this.setState({
              className: classNameAboveView
            });
          } else {
            this.setState({
              className: classNameNotAboveView || ''
            });
          }
          return;
        }

        // check regular in/out of view
        if (nowInView) {
          // just entered view
          this.setState({
            className: classNameInView,
            childProps: childPropsInView
          });
          if (onInView && typeof onInView === 'function') {
            onInView(entry);
          }
        } else {
          // just left view
          this.setState({
            className: classNameNotInView,
            childProps: childPropsNotInView
          });
          if (onNotInView && typeof onNotInView === 'function') {
            onNotInView(entry);
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          childProps = _state.childProps,
          className = _state.className;
      var _props3 = this.props,
          useInviewMonitor = _props3.useInviewMonitor,
          children = _props3.children;

      if (childProps && Object.keys(childProps).length) {
        children = _react2.default.cloneElement(children, childProps);
      }
      return _react2.default.createElement(
        'div',
        {
          className: className,
          ref: function ref(e) {
            if (e) {
              _this2._element = e;
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
  // common usage: animate classes in onScrollIntoView, to trigger fade in etc animations
  classNameInView: _propTypes2.default.string,
  // can be used to hide elements to be animated in.
  classNameNotInView: _propTypes2.default.string,
  // can be used as a trigger for "scrolled past view", f.e. for sticky headers
  classNameAboveView: _propTypes2.default.string,
  classNameNotAboveView: _propTypes2.default.string,
  // can be used to switch classes on/off, for fixed navigation based on scroll point, etc
  toggleClassNameOnInView: _propTypes2.default.bool,

  // another use for the InviewMonitor is to start passing a prop into an element
  // only when it has been scrolled into view; f.e. to autoplay a video.
  childPropsInView: _propTypes2.default.object,
  childPropsNotInView: _propTypes2.default.object,
  // can be used to turn prop(s) on/off based of on view, f.e. stop/start video/sound
  toggleChildPropsOnInView: _propTypes2.default.bool,

  // can be used to track elements coming into view
  onInView: _propTypes2.default.func,
  onNotInView: _propTypes2.default.func,
  repeatOnInView: _propTypes2.default.bool,

  // whether to run any scroll monintoring at all;
  // because easier to toggle this prop, then toggle not using the component at all.
  useInviewMonitor: _propTypes2.default.func,

  intoViewMargin: _propTypes2.default.string
};
InviewMonitor.defaultProps = {
  classNameNotInView: '',
  childPropsNotInView: {},
  useInviewMonitor: function useInviewMonitor() {
    return true;
  },
  intoViewMargin: '-20%'
};

exports.default = InviewMonitor;