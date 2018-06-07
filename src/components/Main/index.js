import React from 'react'
import Playlist from '../Playlist'
import Playback from '../Playback'
import ListPreview from '../ListPreview'
import styles from './index.module.css'

class Main extends React.Component {
  render() {
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

export default Main
