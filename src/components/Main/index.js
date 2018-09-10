import React from 'react'
import Playback from '../Playback'
import ListPreview from '../ListPreview'
import styles from './index.module.css'
import axios from 'axios'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'

class Main extends React.Component {
  componentDidMount = async() => {
    const userIdentifier = this.props.userIdentifier
    const response = await axios.get(`https://api.solna.xyz/v1/playlists?user=${userIdentifier}`)
    if (response.data === '') {
      console.log('This user does not exist:', userIdentifier)
      return
    }

    const playlistIds = response.data.playlists
    const videoList = await Promise.all(playlistIds.map(async(id) => {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&key=AIzaSyBVrfMofoyGgP8KcCyHF9PSKQsayy7qNpI&maxResults=50`)
      const items = response.data.items
      return {
        id,
        items,
        playToNextAutomatically: true
      }
    }))

    this.props.onUpdateVideoList(videoList)
  }

  render() {
    const { playlistIndex, videoIndex } = this.props.selectedVideo
    return (
      <div className={styles.Main}>
        { playlistIndex !== undefined && videoIndex !== undefined ? <Playback /> : <ListPreview />}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
