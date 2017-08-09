import React, { Component } from 'react'
import PropTypes from 'prop-types'

const NOOP_FN = () => {}

class Video extends Component {
  componentDidUpdate(prevProps) {
    const { src, isPlaying } = this.props
    if (prevProps.src !== src) {
      this._videoEl.load()
      // auto play when loading new this._videoEl
      this._videoEl.play()
    } else if (prevProps.isPlaying !== isPlaying) {
      if (isPlaying) {
        this._videoEl.play()
      } else {
        this._videoEl.pause()
      }
    }
  }
  render() {
    const { src } = this.props
    return (
      <video
        ref={el => {
          this._videoEl = el
        }}
        muted
        loop
      >
        <source src={src} type="video/mp4" />
        ))}
      </video>
    )
  }
}

Video.propTypes = {
  src: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool
}

export default Video
