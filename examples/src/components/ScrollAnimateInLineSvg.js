import React from 'react'
import MtSvgLines from 'react-mt-svg-lines'

import InViewMonitor from '../../../src/'

const ScrollAnimateInLineSvg = ({ SvgElement }) =>
  <InViewMonitor
    classNameNotInView="vis-hidden"
    classNameInView=""
    childPropsInView={{ animate: true }}
  >
    <MtSvgLines duration={1500} fade>
      {SvgElement}
    </MtSvgLines>
  </InViewMonitor>

export default ScrollAnimateInLineSvg
