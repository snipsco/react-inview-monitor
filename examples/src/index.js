import React from 'react'
import ReactDOM from 'react-dom'

import FadeInEffects from './components/FadeInEffects'
import LineSvgs from './components/LineSvgs'
import Laundry from './components/icon-elements/Laundry'

ReactDOM.render(
	<div className='col-10 md-col-12 center mx-auto'>
		<header style={{marginBottom: '50vh'}}>
			<h1 className='mb1'>react-inview-monitor</h1>
			<a href='https://github.com/snipsco/react-inview-monitor'>Fork on github</a>
		</header>

		<section className='max-width-3 mx-auto mb4'>
			<FadeInEffects />
		</section>

		<section className='max-width-4 mx-auto mb4'>
			<LineSvgs />
		</section>

	</div>,
	document.getElementById('react_div')
)
