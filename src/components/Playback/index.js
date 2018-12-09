import React from 'react'
import YouTubePlayer from 'react-player/lib/players/YouTube'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'
import styles from './index.module.css'
import BackBar from '../BackBar'

class Playback extends React.Component {
  handleResize = (e) => {
    this.forceUpdate()
  }

  componentDidMount = () => {
    window.addEventListener('resize',  this.handleResize.bind(this));
  }

  videoEnded = () => {
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

  videoPaused = () => {
    this.props.onUpdateIsPlaybackInProgress(false)
  }

  videoStarted = () => {
    this.props.onUpdateIsPlaybackInProgress(true)
  }

  videoProgress =({playedSeconds}) => {
    this.props.onUpdatePlaybackProgress(playedSeconds)
  }

  render() {
    const { playlistIndex, videoIndex } = this.props.selectedVideo
    const video = this.props.videoList[playlistIndex].items[videoIndex]

    return (
      <div className={styles.Playback} style={{height: `${window.innerHeight}px`, lineHeight: `${window.innerHeight}px`}}>
        <BackBar />
        <YouTubePlayer
          url={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
          playing
          controls
          youtubeConfig={{ playerVars: { start: this.props.playbackProgress } }}
          width='100%'
          height='100%'
          onPlay={this.videoStarted}
          onPause={this.videoPaused}
          onEnded={this.videoEnded}
          onProgress={this.videoProgress}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playback)
