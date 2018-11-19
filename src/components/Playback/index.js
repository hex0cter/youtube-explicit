import React from 'react'
// import YouTube from 'react-youtube'
import YouTubePlayer from 'react-player/lib/players/YouTube'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'
import styles from './index.module.css'
import BackBar from '../BackBar'

class Playback extends React.Component {
  handleResize = (e) => {
    const width = e.target.innerWidth
    const height = e.target.innerHeight
    console.log('new window width', width, 'height', height)
    this.forceUpdate()
  }

  componentDidMount = () => {
    window.addEventListener('resize',  this.handleResize.bind(this));
  }

  videoReady = () => {
    console.log('vieo ready')
  }

  videoEnded = () => {
    const { playlistIndex, videoIndex } = this.props.selectedVideo
    const shouldAutoPlay = this.props.videoList[playlistIndex].shouldAutoPlay

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
    console.log('onPlay')
    this.props.onUpdateIsPlaybackInProgress(true)
  }

  videoProgress =({playedSeconds}) => {
    console.log('videoProgress', playedSeconds)
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
          onReady={this.videoReady}
          onPlay={this.videoStarted}
          onPause={this.videoPaused}
          onEnded={this.videoEnded}
          onProgress={this.videoProgress}
        />
        {/* <YouTube
          className={styles.YouTube}
          videoId={video.snippet.resourceId.videoId}
          opts={opts}
          onReady={this.videoReady}
          onPlay={this.videoStarted}
          onPause={this.videoPaused}
          onEnd={this.videoEnded}
          onStateChange={() => {console.log('on state change')}}
          onPlaybackRateChange={() => {console.log('on onPlaybackRateChange change')}}
        /> */}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playback)
