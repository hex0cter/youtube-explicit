import React from 'react'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'

class Playback extends React.Component {
  videoEnded = () => {
    this.props.onUpdateListVisibilty(true)
  }

  videoPaused = () => {
    this.props.onUpdateListVisibilty(true)
  }

  videoStarted = () => {
    this.props.onUpdateListVisibilty(false)
  }

  render() {
    const width = window.screen.availWidth
    const height = width * 9 / 16
    console.log('size', width, height)
    const opts = {
      height,
      width,
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }

    if (!this.props.selectedVideo) {
      return null
    }
    const {playlistIndex, videoIndex} = this.props.selectedVideo
    const video = this.props.videoList[playlistIndex].items[videoIndex]
    console.log('>>>> video', video)

    return (
      <div>
        <YouTube
          videoId={video.snippet.resourceId.videoId}
          opts={opts}
          onPlay={this.videoStarted}
          onPause={this.videoPaused}
          onEnd={this.videoEnded}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playback)
