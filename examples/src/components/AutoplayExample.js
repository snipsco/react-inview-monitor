import React from 'react'
import Highlight from 'react-highlight'

import InViewMonitor from '../../../src/'
import Video from './Video'

const AutoplayExample = () => (
  <div>
    <h2 className="mb1">Autoplay video when in view</h2>
    <p className="mb2">
      Given a Video component that can be started by changing a{' '}
      <code>isPlaying</code> prop, an autoplaying video via scroll is trivial.
      the <code>toggleChildPropsOnInView</code> prop allows us to stop it again
      as soon as it goes out of view, saving CPU and increasing battery life for
      mobile devices! 💪
    </p>

    <div className="left-align mb4">
      <Highlight className="javascript">
        {`
return (
  <InViewMonitor
    childPropsInView={{isPlaying: true}}
    toggleChildPropsOnInView={true}
    intoViewMargin='-100px' // large value just to demonstrate that it starts/stops
  >
    <Video src={videoSrc} />
  </InViewMonitor>
)`}
      </Highlight>
    </div>

    <div>
      <InViewMonitor
        childPropsInView={{ isPlaying: true }}
        toggleChildPropsOnInView={true}
        intoViewMargin="-100px"
      >
        <Video src="./birds.mp4" />
      </InViewMonitor>
    </div>
  </div>
)

export default AutoplayExample
