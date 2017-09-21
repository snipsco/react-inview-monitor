import React from 'react'
import Highlight from 'react-highlight'

import InViewMonitor from '../../../src/'
import Video from './Video'

import videoSource from '../base64video'

const AutoplayExample = () =>
  <div>
    <h2 className="mb2">Autoplay video when in view</h2>

    <div className="left-align mb4">
      <Highlight className="javascript">
        {`// given a Video component that can be started by changing isPlaying prop,
// an autoplaying video via scroll is trivial.
// the toggleChildPropsOnInView prop allows us to stop it again as soon as
// it goes out of view, saving CPU and increasing battery life for mobile devices! 💪

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
        <Video src={videoSource} />
      </InViewMonitor>
    </div>
  </div>

export default AutoplayExample
