import React from 'react'
import styles from './index.module.css'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'
import shortid from 'shortid'
import axios from 'axios'
import PlaylistConfiguration from './PlaylistConfiguration'

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')

class Admin extends React.Component {
  generateNewUserIdentifier = () => {
    this.props.onUpdateUserIdentifier(shortid.generate())
  }

  changeUserIdentifier = (e) => {
    this.props.onUpdateUserIdentifier(e.target.value)
  }

  updatePlaylists = (e) => {
    this.props.onUpdatePlayLists(e.target.value.split('\n'))
  }

  submitPlaylists = async({playlists = this.props.playlists, userIdentifier = this.props.userIdentifier} = {}) => {
    if (!userIdentifier) {
      return
    }

    const trimedUserIdentifier = userIdentifier.trim()
    localStorage.setItem('userIdentifier', trimedUserIdentifier)

    const filteredPlaylists = playlists.filter(({id}) => id.length > 16)
    const params = {
      user: trimedUserIdentifier,
      playlists: filteredPlaylists
    }

    await axios.post(`https://api.solna.xyz/v1/playlists`, params)
  }

  fetchPlaylists = async() => {
    if (!this.props.userIdentifier) {
      return
    }

    const userIdentifier = this.props.userIdentifier.trim()
    localStorage.setItem('userIdentifier', userIdentifier)

    const response = await axios.get(`https://api.solna.xyz/v1/playlists?user=${userIdentifier}`)
    if (response.data === '') {
      console.log('This user does not exist:', userIdentifier)
      return
    }

    const playlists = response.data.playlists
    this.props.onUpdatePlayLists(playlists)
  }

  clonePlaylists = async() => {
    if (this.props.playlists.length === 0) {
      return
    }

    const userIdentifier = shortid.generate()
    await this.submitPlaylists({userIdentifier})
    this.props.onUpdateUserIdentifier(userIdentifier)
    console.log('cloned Playlists')
  }

  updateShouldPlaylistAutoPlay = async(id, shouldAutoPlay) => {
    const playlist = this.props.playlists.find(playlist => playlist.id === id)
    playlist.shouldAutoPlay = shouldAutoPlay
    this.forceUpdate()
    console.log('this.props', this.props)
    await this.submitPlaylists()
  }

  shouldPlaylistBeEnabled = async(id, isEnabled) => {
    const playlist = this.props.playlists.find(playlist => playlist.id === id)
    playlist.isEnabled = isEnabled
    this.forceUpdate()
    await this.submitPlaylists()
  }

  deletePlaylist = async(id) => {
    const playlists = this.props.playlists.filter(playlist => playlist.id !== id)
    this.props.onUpdatePlayLists(playlists)
    await this.submitPlaylists({ playlists })
  }

  moveUpPlayList = async(id) => {
    const index = this.props.playlists.findIndex(playlist => playlist.id === id)
    if (index <= 0) {
      return
    }
    const playlist = this.props.playlists[index]
    const playlists = this.props.playlists.filter(playlist => playlist.id !== id)
    playlists.splice(index - 1, 0, playlist)
    this.props.onUpdatePlayLists(playlists)
    await this.submitPlaylists({ playlists })
  }

  moveDownPlaylist = async(id) => {
    const index = this.props.playlists.findIndex(playlist => playlist.id === id)
    if (index >= this.props.playlists.length) {
      return
    }
    const playlist = this.props.playlists[index]
    const playlists = this.props.playlists.filter(playlist => playlist.id !== id)
    playlists.splice(index + 1, 0, playlist)
    this.props.onUpdatePlayLists(playlists)
    await this.submitPlaylists({ playlists })
  }

  AddNewPlaylist = async(id) => {
    if(this.props.playlists.find(playlist => playlist.id === id)) {
      return
    }

    const playlists = [...this.props.playlists]
    playlists.push({id, shouldAutoPlay: true, isEnabled: true})
    this.props.onUpdatePlayLists(playlists)
    await this.submitPlaylists({ playlists })
  }

  componentDidMount = async() => {
    await this.fetchPlaylists()
  }

  render() {
    return <div className={styles.Admin}>
      <div className={styles.UserIdentifier}>
        <div className={styles.UserIdentifierTitle}>
          User Identifer:
        </div>
        <div className={styles.UserIdentifierInput}>
          <input
            type="text"
            className={styles.InputText}
            placeholder='Identifier'
            name="userIdentifier"
            value={this.props.userIdentifier || ''}
            onChange={this.changeUserIdentifier}
            size={10}
          />
        </div>
        <div className={this.props.userIdentifier ? styles.smallButton : styles.disabledSmallButton} onClick={this.fetchPlaylists}>
          Fetch my list
        </div>
        <div className={this.props.playlists.length !== 0 ? styles.smallButton : styles.disabledSmallButton} onClick={this.clonePlaylists}>
          Clone
        </div>
        <div className={styles.smallButton} onClick={this.generateNewUserIdentifier}>
          Generate new
        </div>
      </div>
      <div className={styles.PlaylistsTitle}>
        Youtube playlists:
      </div>
      <div className={styles.Playlists}>
        {
          this.props.playlists.map(({id, shouldAutoPlay, isEnabled}) => <PlaylistConfiguration
            key={id}
            id={id}
            shouldAutoPlay={shouldAutoPlay}
            isEnabled={isEnabled}
            onUpdateAutoPlay={(shouldAutoPlay) => this.updateShouldPlaylistAutoPlay(id, shouldAutoPlay)}
            onUpdateEnabled={(isEnabled) => this.shouldPlaylistBeEnabled(id, isEnabled)}
            onDelete={() => this.deletePlaylist(id)}
            onMoveUp={() => this.moveUpPlayList(id)}
            onMoveDown={() => this.moveDownPlaylist(id)}
          />)
        }
        <PlaylistConfiguration
          id='new'
          onAdd={(id) => this.AddNewPlaylist(id)}
        />
      </div>
      <div className={styles.Submit}>
        <div className={styles.BigButton} onClick={() => {window.location = '/'}}>Watch Now</div>
      </div>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
