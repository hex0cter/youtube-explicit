import React from 'react'
import Playlist from '../Playlist'
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
    const playlists = response.data.playlists
    this.props.onUpdatePlaylists(playlists)
  }

  render() {
    return (
      <div className={styles.Main}>
        <Playback />
        { this.props.playlists.map(playlist => <Playlist id={playlist} key={playlist}/>) }
        <ListPreview />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
