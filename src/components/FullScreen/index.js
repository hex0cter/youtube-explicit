import React from 'react'
import styles from './index.module.css'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'

class FullScreen extends React.Component {
  resumePlaying = () => {
    console.log('user can play again now')
    this.props.onUpdateStartRestTime(null)
    this.props.onUpdateStartPlayTime(null)
    this.props.onUpdateIsUserInteractionAllowed(true)
  }

  takeBreak = () => {
    console.log('user must take a break now')
    const currentTime = Date.now()
    this.props.onUpdateStartRestTime(currentTime)
    this.props.onUpdateStartPlayTime(null)

    if (this.props.player) {
      this.props.player.pauseVideo()
    }
    this.props.onUpdateIsUserInteractionAllowed(false)

    const restTime = this.props.minRestTime
    setTimeout(this.resumePlaying, restTime);
  }

  showPlayingLogs = () => {
    if (this.props.startPlayTime) {
      console.log('user has been playing for', (Date.now() - this.props.startPlayTime)/1000, 'seconds')
    }

    if (this.props.startRestTime) {
      console.log('user has been resting for', (Date.now() - this.props.startRestTime)/1000, 'seconds')
    }
  }

  handleClick = () => {
    const currentTime = Date.now()
    const maxPlayTime = this.props.maxPlayTime
    const restTime = this.props.minRestTime

    if (currentTime - this.props.startRestTime < restTime || !this.props.isUserInteractionAllowed) {
      console.log('User cannot watch yet')
      return
    }

    console.log('clicked')
    if (!this.props.startPlayTime) {
      console.log('Set initial start play time')
      this.props.onUpdateIsUserInteractionAllowed(true)
      this.props.onUpdateStartPlayTime(currentTime)
      this.props.onUpdateStartRestTime(null)
      setInterval(this.showPlayingLogs, 200);
      setTimeout(this.takeBreak, maxPlayTime)
    }

    if (!this.props.player) {
      return
    }

    if (this.props.isPlaybackInProgress) {
      this.props.player.pauseVideo()
    } else {
      this.props.player.playVideo()
    }
  }

  componentDidMount = () => {
    window.addEventListener('click',  this.handleClick);
  }

  render() {
    const { playlistIndex, videoIndex } = this.props.selectedVideo
    if (playlistIndex === undefined || videoIndex === undefined) {
      return null
    }

    return (
      <div className={this.props.isUserInteractionAllowed ? styles.FullScreen : styles.FullScreenOpaque}></div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullScreen)
