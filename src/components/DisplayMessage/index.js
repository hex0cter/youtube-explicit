import React from 'react'
import styles from './index.module.css'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'

class DisplayMessage extends React.Component {
  constructor() {
    super()
    this.timer = null
  }

  componentDidUpdate = () => {
    console.log('>>>>', this.props)
    if(this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }

    this.timer = setTimeout(() => {
      this.props.onUpdateDisplayMessage('')
      // this.setState({timer: null})
    }, 10000)
  }

  render() {
    return (
      <div className={styles.DisplayMessage}>
        {this.props.displayMessage}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayMessage)
