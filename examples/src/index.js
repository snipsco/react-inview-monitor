import React from 'react'
import ReactDOM from 'react-dom'

import ScrolledPastFixedNav from './components/ScrolledPastFixedNav'
import FadeInEffects from './components/FadeInEffects'
import LineSvgs from './components/LineSvgs'
import AutoplayExample from './components/AutoplayExample'
import MainHeader from './components/MainHeader'

ReactDOM.render(
  <div className="col-10 md-col-12 center mx-auto">
    <MainHeader />

    <main className="main py2">
      <section id="fixed-nav" className="max-width-3 mx-auto mb8">
        <ScrolledPastFixedNav
          sections={[
            { id: 'fade-in', label: 'fade in animations' },
            { id: 'line-svg', label: 'Start svg line path animation' },
            { id: 'autoplay', label: 'Autoplay video' }
          ]}
        />
      </section>

      <section id="fade-in" className="max-width-3 mx-auto mb8">
        <FadeInEffects />
      </section>

      <section id="line-svg" className="max-width-3 mx-auto mb8">
        <LineSvgs />
      </section>

      <section id="autoplay" className="max-width-3 mx-auto mb8">
        <AutoplayExample />
      </section>

      <section id="again" className="max-width-3 mx-auto mb8">
        <button
          type="button"
          onClick={() => {
            window.scrollTo(0, 0)
            window.location.reload()
          }}
        >
          <h2>Try again?</h2>
        </button>
      </section>
    </main>

    <footer className="py2 gray">
      Made with <span className="mr1">❤️</span> by{' '}
      <a target="_blank" href="https://snips.ai">
        Snips
      </a>. MIT Licensed.
    </footer>
  </div>,
  document.getElementById('react_div')
)
