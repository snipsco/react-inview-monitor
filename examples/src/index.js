import React from 'react'
import ReactDOM from 'react-dom'

import FadeInEffects from './components/FadeInEffects'
import LineSvgs from './components/LineSvgs'
import AutoplayExample from './components/AutoplayExample'

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

		<section className='max-width-3 mx-auto mb8'>
			<AutoplayExample />
		</section>

		<section className='max-width-3 mx-auto mb8'>
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

		<footer className='pt4 pb1'>
			Made with ❤️ by <a target='_blank' href='https://snips.ai'>Snips</a>
		</footer>

	</div>,
	document.getElementById('react_div')
)
