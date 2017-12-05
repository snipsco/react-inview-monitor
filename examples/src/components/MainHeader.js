import React from 'react'

import GithubCorner from './GithubCorner'

const MainHeader = () =>
  <header className="main-header py4">
    <GithubCorner href="https://github.com/snipsco/react-inview-monitor" />

    <h1 className="mb1">react-inview-monitor</h1>
    <div className="h3 mb3">
      Declarative in-view scroll monitor for React JS
    </div>

    <div className="main-header__install-cta max-width-2 mx-auto border p1">
      $ yarn add react-inview-monitor
    </div>
  </header>

export default MainHeader
