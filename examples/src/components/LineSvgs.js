import React from 'react'

import ScrollAnimateInLineSvg from './ScrollAnimateInLineSvg'
import Fridge from './icon-elements/Fridge'
import Laundry from './icon-elements/Laundry'
import Speaker from './icon-elements/Speaker'
import Thermostat from './icon-elements/Thermostat'
import Lightbulb from './icon-elements/Lightbulb'

const LineSvgs = () => (
  <div>
    <h2 className='mb4'>Line svg effects triggered by scrolling into view</h2>

    <div className='flex justify-between'>
      <ScrollAnimateInLineSvg SvgElement={<Fridge />} />
      <ScrollAnimateInLineSvg SvgElement={<Speaker />} />
      <ScrollAnimateInLineSvg SvgElement={<Thermostat />} />
      <ScrollAnimateInLineSvg SvgElement={<Lightbulb />} />
      <ScrollAnimateInLineSvg SvgElement={<Laundry />} />
    </div>
  </div>
)

export default LineSvgs
