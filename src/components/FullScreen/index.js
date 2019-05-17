import React from 'react'
import styles from './index.module.css'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'
import * as modes from '../Main/modes'

class FullScreen extends React.Component {
  render() {
    if (this.props.uiMode === modes.UI_LIST_PREVIEW_MODE) {
      return null
    }

    return (
    <div className={this.props.isUserInteractionAllowed ? styles.FullScreen : styles.FullScreenOpaque}>{this.props.fullScreenText}</div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullScreen)
