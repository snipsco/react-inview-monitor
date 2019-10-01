# react-inview-monitor

[![NPM version](https://badge.fury.io/js/react-inview-monitor.svg)](https://www.npmjs.com/package/react-inview-monitor)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/snipsco/react-inview-monitor/blob/master/LICENSE.txt)

## Easy to use, declarative scroll into view component for animations and more
[See the demos for some example usage](https://snipsco.github.io/react-inview-monitor/).

There are other ~ scoll monitor libraries for React available, but none of them solved our use cases: to be able to declaratively configure animations and other effects to be
triggered when individual elements came into the view. Inspired by the [wow reveal animation library](http://mynameismatthieu.com/WOW/) we set out to get to the same ease of use but within react's code paradigm.

Note: this library is not an overly generic, comprehensive, or low-level solution to managing scrolling. If you desire to solve one of the use cases we've had in mind it should be an ease for you to get running. If you need something that doesn't quite fit this solution, or if you just you need more control, consider one of the following libraries:
- [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer)
- [react-scrollspy](https://github.com/makotot/react-scrollspy)
- [scrollmonitor-react](https://github.com/stutrek/scrollmonitor-react)

## Usage

### IntersectionObserver notes
This library uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) under the hood.

#### Support
 Until IntersectionObserver is supported in all modern browsers ([see support tables](https://caniuse.com/#search=intersectionObserver)) we recommend that you use it together with a polyfill, like the one from the following cdn _which only polyfills (downloads code) if necessary_:
https://cdn.polyfill.io/v2/polyfill.js?features=IntersectionObserver

⚠️ This polyfill currently requires that you set `html, body {height: 100%}` in your css for it to function correctly.

#### What not to use this library for
IntersectionObserver uses `requestIdleCallback` internally, sacrificing low-latency (more direct) pixel accurate updates for performance. This means that there's not guarantee that the in/out of view updates will happen exactly when the element goes in/out of view - they can be delayed until the browser is less busy. For regular usage this is not a problem, but if you need a very high level of accuracy, this library (and IntersectionObserver) is not for you.


### Reveal animation when scrolled into view
```jsx
<InViewMonitor
  classNameNotInView='vis-hidden'
  classNameInView='animated fadeInUp'
>
  <ElementToAnimateIn />
</InViewMonitor>
```
Note: these classes are not included. We are big fans of [animate.css](https://github.com/daneden/animate.css) for simple "just add water" animations.

### Send custom prop to children when scrolled into view
Can be used for example to auto play a video.
Toggle prop saves GPU and battery by stopping the video when no longer in view!
```jsx
<InViewMonitor
  childPropsInView={{isPlaying: true}}
  toggleChildPropsOnInView={true}
>
  <VideoPlayer />
</InViewMonitor>
```

[See these and more working examples on demo page](https://snipsco.github.io/react-inview-monitor/).


## Component properties

| Property | Type | Description
:---|:---|:---
| `classNameInView` | string | common use: add classes to animate in element |
| `classNameNotInView` | string | common use: visually hide element to be animated in. |
| `classNameAboveView` | string | apply class when scrolled past view, f.e. sticky header. |
| `classNameNotAboveView` | string | apply class when not scrolled past view. |
| `toggleClassNameOnInView` | boolean | Toggle between `classNameInView/classNameNotInView`, instead of just replacing the first time element comes into view and then removing monitoring. `default: false` |
| `childPropsInView` | object | props propagated to the child element. Can be used to start video, complex animations and more. |
| `childPropsNotInView` | object | `default: {}` |
| `toggleChildPropsOnInView` | boolean | Toggle between `childPropsInView/childPropsNotInView` instead of just add `childPropsInView` the first time element comes into view and then removing monitoring.. `default: false` |
| `onInView` | function | callback when in view, can be used for tracking. Receives [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) as argument. |
| `onNotInView` | function | callback when not in view. Receives [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) as argument. |
| `repeatOnInView` | boolean | Repeats callbacks for onInView/onNotInView, rather than firing just the first time. `default: false` |
| `intoViewMargin` | string - css margin | Margin added to viewport for area to consider “in view”, can be negative. Use f.e. with positive value for lazy loading content just before in view, or with negative to start fading in element just after in view. Must be `px` or `%`. Default: ‘-20%’.  |
| `useInviewMonitor` | func | Convenient function that can be used to dynamically disable the monitor, for example for mobile devices. |
| `threshold` | number | Value between 0 and 1 which indicate at what percentage of the target's visibility the observer's callback should be executed. `default: 0` |

## Contributing

Please see the [Contribution Guidelines](https://github.com/snipsco/react-scrolling-color-background/blob/master/CONTRIBUTING.md).

## Copyright
This component is provided by [Snips](https://snips.ai) as Open Source Software. See [LICENSE.txt](https://github.com/snipsco/react-inview-monitor/blob/master/LICENSE.txt) for more information.
