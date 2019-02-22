import React, { Component } from 'react'
import PropTypes from 'prop-types'

class InviewMonitor extends Component {
  constructor(props) {
    super()
    this.state = {
      className: props.classNameNotInView,
      childProps: props.childPropsNotInView
    }
    this.onIntersectionAll = this.onIntersectionAll.bind(this)
    this.onIntersection = this.onIntersection.bind(this)

    this.isFirstInView = true
  }
  componentDidMount() {
    if (!window.IntersectionObserver) {
      console.error(`react-inview-monitor found no support for IntersectionObserver.
Perhaps use a polyfill like: https://cdn.polyfill.io/v2/polyfill.js?features=IntersectionObserver ?`)
      return
    }
    const { useInviewMonitor, intoViewMargin } = this.props
    if (
      !this._element ||
      !useInviewMonitor ||
      (typeof useInviewMonitor === 'function' && !useInviewMonitor())
    ) {
      return
    }
    const options = {
      rootMargin: intoViewMargin
    }
    // any performance benefits from trying to re-use the observer?
    // possible enhancement to add later on.
    this.observer = new window.IntersectionObserver(
      this.onIntersectionAll,
      options
    )
    this.observer.observe(this._element)
  }
  componentWillUnmount() {
    this.observer && this.observer.disconnect()
  }
  onIntersectionAll(entries) {
    entries.forEach(this.onIntersection)
  }
  onIntersection(entry) {
    if (entry.target !== this._element) {
      // this check only makes sense as long as we _dont_ share the same observer
      // between component instances.
      return
    }
    const {
      classNameNotInView,
      classNameInView,
      classNameAboveView,
      classNameNotAboveView,
      toggleClassNameOnInView,
      childPropsInView,
      childPropsNotInView,
      toggleChildPropsOnInView,
      onInView,
      onNotInView,
      repeatOnInView
    } = this.props

    const nowInView = entry.isIntersecting
    const isFirstInView = nowInView && this.isFirstInView
    if (isFirstInView) {
      // single out just the first inView
      this.isFirstInView = false
    }

    const toggleClassBehavior =
      (typeof classNameInView === 'string' ||
        typeof classNameAboveView === 'string') &&
      toggleClassNameOnInView
    const tooglePropsBehavior = childPropsInView && toggleChildPropsOnInView
    const toggleOnInViewBehavior = (onInView || onNotInView) && repeatOnInView
    const toggleBehavior =
      toggleClassBehavior || tooglePropsBehavior || toggleOnInViewBehavior

    if (nowInView && !toggleBehavior) {
      const changes = {}
      if (typeof classNameInView === 'string')
        changes.className = classNameInView
      if (childPropsInView) changes.childProps = childPropsInView
      if (Object.keys(changes).length) {
        this.setState(changes)
      }
      if (onInView && typeof onInView === 'function') {
        onInView(entry)
      }
      this.observer.unobserve(entry.target)
      // is there any point trying to determine whether observer is now
      // no longer observering anything, and hence should be disconnected,
      // or is this kind of automatic?
      // To be investigated.
      return
    }

    if (toggleBehavior) {
      // Check if we scrolled past view
      if (typeof classNameAboveView === 'string') {
        if (
          // we just left the view
          !nowInView &&
          // are we now above it (i.e. scrolled past)
          entry.boundingClientRect.top <= 0
        ) {
          this.setState({
            className: classNameAboveView
          })
        } else {
          this.setState({
            className: classNameNotAboveView || ''
          })
        }
        return
      }

      // check regular in/out of view
      if (nowInView) {
        // just entered view
        const changes = {}
        if (toggleClassBehavior || isFirstInView)
          changes.className = classNameInView
        if (tooglePropsBehavior || isFirstInView)
          changes.childProps = childPropsInView
        if (Object.keys(changes).length) {
          this.setState(changes)
        }
        if (onInView && typeof onInView === 'function') {
          onInView(entry)
        }
      } else {
        // just left view
        const changes = {}
        if (toggleClassBehavior) changes.className = classNameNotInView
        if (tooglePropsBehavior) changes.childProps = childPropsNotInView
        if (Object.keys(changes).length) {
          this.setState(changes)
        }
        if (onNotInView && typeof onNotInView === 'function') {
          onNotInView(entry)
        }
      }
    }
  }
  render() {
    const { childProps, className } = this.state
    let { useInviewMonitor, children } = this.props
    if (childProps && Object.keys(childProps).length) {
      children = React.cloneElement(children, childProps)
    }
    return (
      <div
        className={className}
        ref={e => {
          if (e) {
            this._element = e
          }
        }}
      >
        {children}
      </div>
    )
  }
}

InviewMonitor.propTypes = {
  // common usage: animate classes in onScrollIntoView, to trigger fade in etc animations
  classNameInView: PropTypes.string,
  // can be used to hide elements to be animated in.
  classNameNotInView: PropTypes.string,
  // can be used as a trigger for "scrolled past view", f.e. for sticky headers
  classNameAboveView: PropTypes.string,
  classNameNotAboveView: PropTypes.string,
  // can be used to switch classes on/off, for fixed navigation based on scroll point, etc
  toggleClassNameOnInView: PropTypes.bool,

  // another use for the InviewMonitor is to start passing a prop into an element
  // only when it has been scrolled into view; f.e. to autoplay a video.
  childPropsInView: PropTypes.object,
  childPropsNotInView: PropTypes.object,
  // can be used to turn prop(s) on/off based of on view, f.e. stop/start video/sound
  toggleChildPropsOnInView: PropTypes.bool,

  // can be used to track elements coming into view
  onInView: PropTypes.func,
  onNotInView: PropTypes.func,
  repeatOnInView: PropTypes.bool,

  // whether to run any scroll monintoring at all;
  // because easier to toggle this prop, then toggle not using the component at all.
  useInviewMonitor: PropTypes.func,

  intoViewMargin: PropTypes.string
}
InviewMonitor.defaultProps = {
  classNameNotInView: '',
  childPropsNotInView: {},
  useInviewMonitor: () => true,
  intoViewMargin: '-20%'
}

export default InviewMonitor
