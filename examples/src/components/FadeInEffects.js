import React from 'react'

// import InViewMonitor from 'react-inview-monitor'
import InViewMonitor from '../../../src/'

const COLORS = [
  '#3A78D5',
  '#9F61FD',
  '#D96CBF',
  '#EA5054',
  '#F4A16A',
  '#FDE169',
  '#93F18D',
  '#7FE8C5',
  '#96ECF8',
  '#71BDFC'
]

const FadeInItem = ({idx, fadeInClass = 'fadeInUp'}) => (
  <InViewMonitor
    key={idx}
    classNameInitial='col-3 vis-hidden'
    classNameOnScrollIntoView={`col-3 fadeineffects__item animated ${fadeInClass}`}
  >
    <div
      className='rounded'
      style={{
        height: '200px',
        backgroundColor: COLORS[idx]
      }}
    />
  </InViewMonitor>
)

const FadeInEffects = () => (
  <div style={{marginTop: '50vh'}}>
    <h2 className='mb4'>Scroll into view animations</h2>

    <div className='flex justify-between mb2'>
      <FadeInItem idx={0}/>
      <FadeInItem idx={1}/>
      <FadeInItem idx={2}/>
    </div>

    <div className='flex justify-between mb2'>
      <FadeInItem idx={3} fadeInClass='fadeInLeft'/>
      <FadeInItem idx={4} fadeInClass='fadeInLeft'/>
      <FadeInItem idx={5} fadeInClass='fadeInLeft'/>
    </div>

    <div className='flex justify-between mb2'>
      <FadeInItem idx={6} fadeInClass='fadeInRight'/>
      <FadeInItem idx={7} fadeInClass='fadeInRight'/>
      <FadeInItem idx={8} fadeInClass='fadeInRight'/>
    </div>

    <div className='flex justify-between mb2'>
      <FadeInItem idx={0}/>
      <FadeInItem idx={1}/>
      <FadeInItem idx={2}/>
    </div>

    <div className='flex justify-between mb2'>
      <FadeInItem idx={3} fadeInClass='fadeInLeft'/>
      <FadeInItem idx={4} fadeInClass='fadeInLeft'/>
      <FadeInItem idx={5} fadeInClass='fadeInLeft'/>
    </div>

    <div className='flex justify-between mb2'>
      <FadeInItem idx={6} fadeInClass='fadeInRight'/>
      <FadeInItem idx={7} fadeInClass='fadeInRight'/>
      <FadeInItem idx={8} fadeInClass='fadeInRight'/>
    </div>
  </div>
)

export default FadeInEffects
