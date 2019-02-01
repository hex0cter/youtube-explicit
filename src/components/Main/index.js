import React from 'react'
import Playback from '../Playback'
import ListPreview from '../ListPreview'
import AdMask from '../AdMask'
import styles from './index.module.css'
import axios from 'axios'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'

class Main extends React.Component {
  componentDidMount = async() => {
    const userIdentifier = this.props.userIdentifier
    if (!userIdentifier) {
      return
    }

    const response = await axios.get(`https://api.solna.xyz/v1/playlists?user=${userIdentifier}`)
    if (response.data === '') {
      console.log('This user does not exist:', userIdentifier)
      return
    }

    const playlists = response.data.playlists
    const videoList = await Promise.all(playlists.map(async({id, isEnabled, shouldAutoPlay}) => {
      if (!isEnabled) {
        return null
      }
      let response
      try {
        response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&key=AIzaSyBVrfMofoyGgP8KcCyHF9PSKQsayy7qNpI&maxResults=50`)
      } catch {
        return null
      }
      const items = response.data.items
      return {
        id,
        items,
        shouldAutoPlay
      }
    }))

    this.props.onUpdateVideoList(videoList.filter(e => e !== null))
  }

  render() {
    return (
      <div className={styles.Main}>
        <AdMask />
        <Playback />
        <ListPreview />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
