import React from 'react'
import styles from './index.module.css'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'
import * as modes from '../Main/modes'

class BackBar extends React.Component {
  goBackToList = () => {
    // this.props.onUpdateSelectedVideo({})
    this.props.onUpdateUIMode(modes.UI_LIST_PREVIEW_MODE)
    this.props.onUpdatePlaybackProgress(0)
  }

  render() {
    if (this.props.uiMode === modes.UI_LIST_PREVIEW_MODE) {
      return null
    }

    const { playlistIndex, videoIndex } = this.props.selectedVideo
    const video = this.props.videoList[playlistIndex].items[videoIndex]
    const title = video.snippet.title
    return (
      <div className={this.props.isPlaybackInProgress ? styles.BackBarShort : styles.BackBarTall}>
       <div className={styles.Button} onClick={this.goBackToList}><span>BACK</span></div>
       <div className={styles.Title}>{title}</div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackBar)
