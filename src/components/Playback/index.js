import React from 'react'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'
import styles from './index.module.css'
import BackBar from '../BackBar'

class Playback extends React.Component {
  videoReady = (e) => {
    e.target.playVideo()
  }

  videoEnded = () => {
    const { playlistIndex, videoIndex } = this.props.selectedVideo
    const playToNextAutomatically = this.props.videoList[playlistIndex].playToNextAutomatically

    if (playToNextAutomatically && videoIndex < this.props.videoList[playlistIndex].items.length - 1) {
      this.props.onUpdateSelectedVideo({playlistIndex, videoIndex: videoIndex + 1})
    } else {
      this.props.onUpdateSelectedVideo({})
    }
    this.props.onUpdateIsPlaybackInProgress(false)
  }

  videoPaused = () => {
    this.props.onUpdateIsPlaybackInProgress(false)
  }

  videoStarted = () => {
    this.props.onUpdateIsPlaybackInProgress(true)
  }

  editingUserIdentifier = (e) => {
    const userIdentifier = e.target.value
    this.props.onUpdateUserIdentifier(userIdentifier)
  }

  updateUserIdentifier = async() => {
    const userIdentifier = this.props.userIdentifier.trim()
    localStorage.setItem('userIdentifier', userIdentifier)
    window.location.reload()
  }

  render() {
    const width = window.innerWidth + 4
    const height = width * 9 / 16
    const opts = {
      height,
      width,
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }

    const { playlistIndex, videoIndex } = this.props.selectedVideo
    const video = this.props.videoList[playlistIndex].items[videoIndex]

    return (
      <div className={styles.Playback} style={{height: `${window.innerHeight}px`, lineHeight: `${window.innerHeight}px`}}>
        <BackBar />
        <YouTube
          className={styles.YouTube}
          videoId={video.snippet.resourceId.videoId}
          opts={opts}
          onReady={this.videoReady}
          onPlay={this.videoStarted}
          onPause={this.videoPaused}
          onEnd={this.videoEnded}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playback)
