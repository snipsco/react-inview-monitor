import React from 'react'
import ReactDOM from 'react-dom'

import FadeInEffects from './components/FadeInEffects'
import LineSvgs from './components/LineSvgs'

ReactDOM.render(
	<div className='col-10 md-col-12 center mx-auto'>
		<header style={{marginBottom: '50vh'}}>
			<h1 className='mb1'>react-inview-monitor</h1>
			<a href='https://github.com/snipsco/react-inview-monitor'>Fork on github</a>
		</header>

		<section className='max-width-3 mx-auto mb8'>
			<FadeInEffects />
		</section>

		<section className='max-width-3 mx-auto mb8'>
			<LineSvgs />
		</section>

		<section className='pt4 pb1'>
			Made with ❤️ by <a target='_blank' href='https://snips.ai'>Snips</a>
		</section>

	</div>,
	document.getElementById('react_div')
)
