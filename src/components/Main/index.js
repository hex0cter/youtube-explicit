import React from 'react'
import Playlist from '../Playlist'
import Playback from '../Playback'
import ListPreview from '../ListPreview'
import styles from './index.module.css'
import axios from 'axios'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'

class Main extends React.Component {
  componentDidMount = async() => {
    const userIdentifier = this.props.userIdentifier
    const response = await axios.get(`https://47afj0sk74.execute-api.eu-north-1.amazonaws.com/dev/playlists?user=${userIdentifier}`)
    if (response.data === '') {
      console.log('This user does not exist:', userIdentifier)
      return
    }
    console.log('>>>> response', response)
  }

  render() {
    //TODO: map the Playlist using this.props.videoList
    return (
      <div className={styles.Main}>
        <Playback />
        <Playlist id="PL19XM-3U_aPtTMoaS8plg8i9gZhXtTAND" />
        <Playlist id="PLm7nLIjg0OcqThaoJeDBYt72HixUFrGu3" playToNextAutomatically/>
        <ListPreview />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Main)
