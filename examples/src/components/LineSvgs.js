import React from 'react'

import ScrollAnimateInLineSvg from './ScrollAnimateInLineSvg'
import Fridge from './icon-elements/Fridge'
import Laundry from './icon-elements/Laundry'
import Speaker from './icon-elements/Speaker'
import Thermostat from './icon-elements/Thermostat'
import Lightbulb from './icon-elements/Lightbulb'

const LineSvgs = () => (
  <div>
    <h2 className='mb2'>SVG line animations triggered by scroll into view</h2>

    <div className='left-align mb4'>
      <pre className='mb2'><code>
        {`
// each svg icon below uses ScrollAnimateInLineSvg,
// which accepts an Component that renders an svg using paths (not fills).

const ScrollAnimateInLineSvg = ({SvgElement}) => (
<InViewMonitor
  classNameInitial='vis-hidden'
  classNameOnScrollIntoView=''
  childPropsOnScrollIntoView={{animate: true}}
>
  <MtSvgLines
    duration={1500}
    fade
  >
    {SvgElement}
  </MtSvgLines>
</InViewMonitor>
)`}
      </code></pre>
      The magic 🎩 for automatically adding line animations to SVGs handled by{' '}
      <a target='blank' href='https://github.com/moarwick/react-mt-svg-lines/'>react-mt-svg-lines</a>.
    </div>

    <div className='mb4'>
      <ScrollAnimateInLineSvg SvgElement={<Thermostat />} />
    </div>
    <div className='mb4'>
      <ScrollAnimateInLineSvg SvgElement={<Lightbulb />} />
    </div>
    <div className='mb4'>
      <ScrollAnimateInLineSvg SvgElement={<Laundry />} />
    </div>
  </div>
)

export default LineSvgs
