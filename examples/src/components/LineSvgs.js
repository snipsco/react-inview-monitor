import React from 'react'
import Highlight from 'react-highlight'

import ScrollAnimateInLineSvg from './ScrollAnimateInLineSvg'
import Fridge from './icon-elements/Fridge'
import Laundry from './icon-elements/Laundry'
import Speaker from './icon-elements/Speaker'
import Thermostat from './icon-elements/Thermostat'
import Lightbulb from './icon-elements/Lightbulb'

const LineSvgs = () =>
  <div>
    <h2 className="mb1">SVG line animations triggered by scroll into view</h2>
    <p className="mb2">
      each svg icon in the demo below uses the ScrollAnimateInLineSvg component,
      which accepts an Component that renders an svg using paths (not fills).
    </p>

    <div className="left-align mb4">
      <Highlight className="javascript">
        {`
const ScrollAnimateInLineSvg = ({SvgElement}) => (
<InViewMonitor
  classNameNotInView='vis-hidden'
  classNameInView=''
  childPropsInView={{animate: true}}
>
  <MtSvgLines
    duration={1500}
    fade
  >
    {SvgElement}
  </MtSvgLines>
</InViewMonitor>
)`}
      </Highlight>
      The magic 🎩 for automatically adding line animations to SVGs handled by{' '}
      <a target="blank" href="https://github.com/moarwick/react-mt-svg-lines/">
        react-mt-svg-lines
      </a>.
    </div>

    <div className="mb4">
      <ScrollAnimateInLineSvg SvgElement={<Thermostat />} />
    </div>
    <div className="mb4">
      <ScrollAnimateInLineSvg SvgElement={<Lightbulb />} />
    </div>
    <div className="mb4">
      <ScrollAnimateInLineSvg SvgElement={<Laundry />} />
    </div>
  </div>

export default LineSvgs
