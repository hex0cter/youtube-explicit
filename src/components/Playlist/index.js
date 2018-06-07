import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'

class Playlist extends React.Component {
  componentDidMount = async() => {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${this.props.id}&key=AIzaSyBVrfMofoyGgP8KcCyHF9PSKQsayy7qNpI&maxResults=50`)
    const items = response.data.items
    this.props.onAppendVideoToList({items, playToNextAutomatically: this.props.playToNextAutomatically || false})
  }

  render() {
    return null
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
