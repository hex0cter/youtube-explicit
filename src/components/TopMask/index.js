import React from 'react'
import styles from './index.module.css'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'

class TopMask extends React.Component {
  handleClick = () => {
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
      <div className={styles.TopMask}></div>
    )
  }
}

export default connect(mapStateToProps)(TopMask)
