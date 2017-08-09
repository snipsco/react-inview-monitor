import React from 'react'
import Highlight from 'react-highlight'

import InViewMonitor from '../../../src/'
import Video from './Video'

import videoSource from '../base64video'


const AutoplayExample = () => (
  <div>
    <h2 className='mb2'>Autoplay video when in view</h2>

    <div className='left-align mb4'>
      <Highlight className='javascript'>
        {`// given a Video component that can be started by changing isPlaying prop,
// an autoplaying video via scroll is trivial:

return (
  <InViewMonitor
    childPropsOnScrollIntoView={{isPlaying: true}}
  >
    <Video src={videoSrc} />
  </InViewMonitor>
)`}
      </Highlight>
    </div>

    <div>
      <InViewMonitor
        childPropsOnScrollIntoView={{isPlaying: true}}
      >
        <Video
          src={videoSource}
        />
      </InViewMonitor>
    </div>
  </div>
)

export default AutoplayExample
