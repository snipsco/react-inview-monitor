import React from 'react'
import Highlight from 'react-highlight'

import InViewMonitor from '../../../src/'

const ScrolledPastFixedNav = ({ sections }) =>
  <div>
    <h2 className="mb2">Fixed nav when scrolled past</h2>

    <div className="left-align mb4">
      <Highlight className="javascript">
        {`return (
  <InViewMonitor
    intoViewRatioShownThreshold={0}
    classNameInitial='tabs'
    classNameScrolledPastView='tabs tabs--fixed'
  >
    <TabsHere />
  </InViewMonitor>
)`}
      </Highlight>
    </div>

    <InViewMonitor
      intoViewRatioShownThreshold={0}
      classNameInitial="tabs"
      classNameScrolledPastView="tabs tabs--fixed"
    >
      <div className="tabs__body">
        {sections.map(({ id, label }) =>
          <a key={id} className="tabs__tab" href={`#${id}`}>
            {label}
          </a>
        )}
      </div>
    </InViewMonitor>
  </div>

export default ScrolledPastFixedNav
