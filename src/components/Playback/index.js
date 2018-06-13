import React from 'react'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'

class Playback extends React.Component {
  videoEnded = () => {
    const {playlistIndex, videoIndex} = this.props.selectedVideo
    const playToNextAutomatically = this.props.videoList[playlistIndex].playToNextAutomatically

    if (playToNextAutomatically && videoIndex < this.props.videoList[playlistIndex].items.length - 1) {
      this.props.onUpdateSelectedVideo({playlistIndex, videoIndex: videoIndex + 1})
    } else {
      this.props.onUpdateListVisibilty(true)
    }
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
    const opts = {
      height,
      width,
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }

    const {playlistIndex, videoIndex} = this.props.selectedVideo
    if(!playlistIndex && !videoIndex) {
      return null
    }

    const video = this.props.videoList[playlistIndex].items[videoIndex]
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
