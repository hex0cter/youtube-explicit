import React from 'react'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'
import styles from './index.module.css'

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
      this.props.onUpdateListVisibilty(true)
      this.props.onUpdateSelectedVideo({})
    }
  }

  videoPaused = () => {
    this.props.onUpdateListVisibilty(true)
  }

  videoStarted = () => {
    this.props.onUpdateListVisibilty(false)
  }

  editingUserIdentifier = (e) => {
    const userIdentifier = e.target.value
    this.props.onUpdateUserIdentifier(userIdentifier)
  }

  updateUserIdentifier = async() => {
    localStorage.setItem('userIdentifier', this.props.userIdentifier)
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
    if(playlistIndex === undefined && videoIndex === undefined) {
      return (
        <div className={styles.AppDescriptor}>
          <div className={styles.AppTitle}>YouTube Explicit<br/></div>
          <div>
            <input type='input' value={this.props.userIdentifier} onChange={this.editingUserIdentifier} placeholder='User identifier' />
            <button onClick={this.updateUserIdentifier}>Update</button>
          </div>
        </div>
      )
    }

    const video = this.props.videoList[playlistIndex].items[videoIndex]
    return (
      <div className={styles.Playback} style={{height: `${window.innerHeight}px`, lineHeight: `${window.innerHeight}px`}}>
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
