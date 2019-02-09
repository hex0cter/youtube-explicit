import React from 'react'
import YouTubePlayer from 'react-player/lib/players/YouTube'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'
import styles from './index.module.css'

class Playback extends React.Component {
  justToNextClip = () => {
    const { playlistIndex, videoIndex } = this.props.selectedVideo
    const shouldAutoPlay = this.props.videoList[playlistIndex].shouldAutoPlay

    this.props.onUpdatePlaybackProgress(0)
    if (shouldAutoPlay && videoIndex < this.props.videoList[playlistIndex].items.length - 1) {
      this.props.onUpdateSelectedVideo({playlistIndex, videoIndex: videoIndex + 1})
    } else {
      this.props.onUpdateSelectedVideo({})
    }
    this.props.onUpdateIsPlaybackInProgress(false)
  }

  videoReady = () => {
    const player = this.player.player
    this.props.onUpdatePlayer(player)
  }

  videoEnded = () => {
    this.justToNextClip()
  }

  videoPaused = () => {
    this.props.onUpdateIsPlaybackInProgress(false)
  }

  videoStarted = () => {
    this.props.onUpdateIsPlaybackInProgress(true)
  }

  videoProgress =({playedSeconds}) => {
    this.props.onUpdatePlaybackProgress(playedSeconds)
  }

  videoError = () => {
    this.justToNextClip()
  }

  ref = (player) => {
    console.log('player params', player)
    if (!player) {
      this.props.onUpdatePlayer(null)
    } else {
      this.player = player.player.player
    }
  }

  render() {
    const { playlistIndex, videoIndex } = this.props.selectedVideo
    if (playlistIndex === undefined || videoIndex === undefined) {
      return null
    }

    const video = this.props.videoList[playlistIndex].items[videoIndex]

    return (
      <div className={styles.Playback} style={{height: `${window.innerHeight}px`, lineHeight: `${window.innerHeight}px`}}>
        <YouTubePlayer
          url={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
          playing
          controls={false}
          ref={this.ref}
          config={{ playerVars: { start: this.props.playbackProgress, modestbranding: 1 } }}
          width='100%'
          height='100%'
          onReady={this.videoReady}
          onPlay={this.videoStarted}
          onPause={this.videoPaused}
          onEnded={this.videoEnded}
          onProgress={this.videoProgress}
          onError={this.videoError}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playback)
