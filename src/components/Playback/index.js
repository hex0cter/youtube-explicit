import React from 'react'
import YouTubePlayer from 'react-player/lib/players/YouTube'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'
import styles from './index.module.css'
import * as modes from '../Main/modes'
import { msToSeconds } from '../Main/utils'

class Playback extends React.Component {
  justToNextClip = () => {
    const { playlistIndex, videoIndex } = this.props.selectedVideo
    const shouldAutoPlay = this.props.videoList[playlistIndex].shouldAutoPlay

    this.props.onUpdatePlaybackProgress(0)
    if (shouldAutoPlay && videoIndex < this.props.videoList[playlistIndex].items.length - 1) {
      this.props.onUpdateSelectedVideo({playlistIndex, videoIndex: videoIndex + 1})
    } else {
      this.props.onUpdateUIMode(modes.UI_LIST_PREVIEW_MODE)
    }
    this.props.onUpdateIsPlaybackInProgress(false)
  }

  videoReady = () => {
    const player = this.player.player
    this.props.onUpdatePlayer(player)

    if (this.props.isUserInteractionAllowed) {
      player.playVideo()
    }
  }

  videoEnded = () => {
    this.justToNextClip()
  }

  videoPaused = () => {
    this.props.onUpdateIsPlaybackInProgress(false)
  }

  videoStarted = () => {
    this.props.onUpdateDisplayMessage(msToSeconds(this.props.playbackProgress * 1000))
    this.props.onUpdateIsPlaybackInProgress(true)

    if(!this.props.startPlayTime) {
      this.props.onUpdateStartPlayTime(null)
    }
}

  videoProgress =({playedSeconds}) => {
    this.props.onUpdatePlaybackProgress(playedSeconds)
  }

  videoError = () => {
    this.justToNextClip()
  }

  ref = (player) => {
    if (!player) {
      this.props.onUpdatePlayer(null)
    } else {
      this.player = player.player.player
    }
  }

  render() {
    if (this.props.uiMode === modes.UI_LIST_PREVIEW_MODE) {
      return null
    }

    const { playlistIndex, videoIndex } = this.props.selectedVideo
    const video = this.props.videoList[playlistIndex].items[videoIndex]
    const height = `${window.innerHeight + 3}px`

    return (
      <div className={styles.Playback} style={{height, lineHeight: height}}>
        <YouTubePlayer
          url={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
          playing={false}
          controls={true}
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
