import React from 'react'
import styles from './index.module.css'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import * as modes from '../Main/modes'

const AdMask = (props) => {
  const style = (props.isPlaybackInProgress || props.uiMode === modes.LIST_PREVIEW_MODE) ?
    styles.AdMaskShort : styles.AdMaskTall

  return (
    <div className={style}></div>
  )
}

export default connect(mapStateToProps)(AdMask)
