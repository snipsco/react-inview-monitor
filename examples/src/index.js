import React from 'react'
import ReactDOM from 'react-dom'

import FadeInEffects from './components/FadeInEffects'

ReactDOM.render(
	<div className='col-10 md-col-12 center max-width-3 mx-auto'>
		<h1 className='mb1'>react-inview-monitor</h1>
		<a href='https://github.com/snipsco/react-inview-monitor'>Fork on github</a>
		<FadeInEffects />
	</div>,
	document.getElementById('react_div')
)
