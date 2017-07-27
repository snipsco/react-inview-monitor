import React from 'react'
import ReactDOM from 'react-dom'

import ScrolledPastFixedNav from './components/ScrolledPastFixedNav'
import FadeInEffects from './components/FadeInEffects'
import LineSvgs from './components/LineSvgs'
import AutoplayExample from './components/AutoplayExample'

ReactDOM.render(
	<div className='col-10 md-col-12 center mx-auto'>
		<header style={{marginBottom: '60vh'}}>
			<h1 className='mb1'>react-inview-monitor</h1>
			<a href='https://github.com/snipsco/react-inview-monitor'>Fork on github</a>
		</header>

    <section id='fixed-nav' className='max-width-3 mx-auto mb8'>
			<ScrolledPastFixedNav
				sections={[
					{id:'fade-in', label:'fade in animations'},
					{id:'line-svg', label:'Start svg line path animation'},
					{id:'autoplay', label:'Autoplay video'},
				]}
			/>
		</section>

		<section id='fade-in' className='max-width-3 mx-auto mb8'>
			<FadeInEffects />
		</section>


		<section id='line-svg' className='max-width-3 mx-auto mb8'>
			<LineSvgs />
		</section>

		<section id='autoplay' className='max-width-3 mx-auto mb8'>
			<AutoplayExample />
		</section>

		<section id='again' className='max-width-3 mx-auto mb8'>
			<button
				type='button'
				onClick={() => {
					window.scrollTo(0,0)
					window.location.reload()
				}}
			>
				<h2>Try again?</h2>
			</button>
		</section>

		<footer className='pt4 pb1 gray' style={{marginTop:'1000px'}}>
			Made with <span className='mr1'>❤️</span> by <a target='_blank' href='https://snips.ai'>Snips</a>. MIT Licensed.
		</footer>

	</div>,
	document.getElementById('react_div')
)
