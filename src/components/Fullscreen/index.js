import React from 'react'
import styles from './index.module.css'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'

const FullScreen = (props) => {
  const { playlistIndex, videoIndex } = props.selectedVideo
  if (props.isPlaybackInProgress || playlistIndex === undefined || videoIndex === undefined) {
    return null
  }

  return (
    <div className={styles.FullScreen}></div>
  )
}

export default connect(mapStateToProps)(FullScreen)
