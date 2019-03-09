import React from 'react'
import styles from './index.module.css'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'

const AdMask = (props) => {
  const { playlistIndex, videoIndex } = props.selectedVideo
  const style = (props.isPlaybackInProgress || playlistIndex === undefined || videoIndex === undefined) ?
    styles.AdMaskShort : styles.AdMaskTall

  return (
    <div className={style}></div>
  )
}

export default connect(mapStateToProps)(AdMask)
