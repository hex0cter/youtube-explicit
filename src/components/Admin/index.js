import React from 'react'
import styles from './index.module.css'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'
import shortid from 'shortid'
import axios from 'axios'
import PlaylistConfiguration from './PlaylistConfiguration'
import queryString from 'query-string'

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')

class Admin extends React.Component {
  generateNewUserIdentifier = () => {
    this.props.onUpdateUserIdentifier(shortid.generate())
    this.props.onUpdatePlayLists([])
  }

  changeUserIdentifier = (e) => {
    this.props.onUpdateUserIdentifier(e.target.value)
  }

  updateMaxPlayTime = async(e) => {
    const maxPlayTime = parseInt(e.target.value)
    this.props.onUpdateMaxPlayTime(maxPlayTime)
    await this.submitPlaylists({maxPlayTime})
  }

  updateMinRestTime = async(e) => {
    const minRestTime = parseInt(e.target.value)
    this.props.onUpdateMinRestTime(minRestTime)
    await this.submitPlaylists({minRestTime})
  }

  submitPlaylists = async({
    playlists = this.props.playlists,
    userIdentifier = this.props.userIdentifier,
    maxPlayTime = this.props.maxPlayTime,
    minRestTime = this.props.minRestTime
  } = {}) => {
    if (!userIdentifier) {
      return
    }

    const trimedUserIdentifier = userIdentifier.trim()
    localStorage.setItem('userIdentifier', trimedUserIdentifier)

    const filteredPlaylists = playlists.filter(({id}) => id.length > 16)
    const params = {
      user: trimedUserIdentifier,
      playlists: filteredPlaylists,
      maxPlayTime,
      minRestTime
    }

    await axios.post(`https://api.solna.xyz/v1/playlists`, params)
  }

  fetchPlaylists = async(userIdentifier = this.props.userIdentifier) => {
    if (!userIdentifier) {
      return
    }

    userIdentifier = userIdentifier.trim()
    localStorage.setItem('userIdentifier', userIdentifier)

    const response = await axios.get(`https://api.solna.xyz/v1/playlists?user=${userIdentifier}`)
    if (response.data === '') {
      console.log('This user does not exist:', userIdentifier)
      return
    }

    const playlists = response.data.playlists
    this.props.onUpdatePlayLists(playlists)

    const maxPlayTime = response.data.maxPlayTime
    if (maxPlayTime) {
      this.props.onUpdateMaxPlayTime(maxPlayTime)
    }

    const minRestTime = response.data.minRestTime
    if (minRestTime) {
      this.props.onUpdateMinRestTime(minRestTime)
    }
  }

  onFetch = async() => {
    await this.fetchPlaylists()
  }

  clonePlaylists = async() => {
    if (this.props.playlists.length === 0) {
      return
    }

    const userIdentifier = shortid.generate()
    await this.submitPlaylists({ userIdentifier })
    this.props.onUpdateUserIdentifier(userIdentifier)
  }

  updateShouldPlaylistAutoPlay = async(id, shouldAutoPlay) => {
    const playlist = this.props.playlists.find(playlist => playlist.id === id)
    playlist.shouldAutoPlay = shouldAutoPlay
    this.forceUpdate()
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

  movePlaylistToTop = async(id) => {
    const index = this.props.playlists.findIndex(playlist => playlist.id === id)
    if (index <= 0) {
      return
    }
    const playlist = this.props.playlists[index]
    const playlists = this.props.playlists.filter(playlist => playlist.id !== id)
    playlists.splice(0, 0, playlist)
    this.props.onUpdatePlayLists(playlists)
    await this.submitPlaylists({ playlists })
  }

  movePlaylistToBottom = async(id) => {
    const index = this.props.playlists.findIndex(playlist => playlist.id === id)
    if (index >= this.props.playlists.length - 1) {
      return
    }
    const playlist = this.props.playlists[index]
    const playlists = this.props.playlists.filter(playlist => playlist.id !== id)
    playlists.push(playlist)
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
    const urlParams = this.props.location.search
    const params = queryString.parse(urlParams)
    if (params.uid) {
      this.props.onUpdateUserIdentifier(params.uid)
    }

    const userIdentifier = params.uid || this.props.userIdentifier

    await this.fetchPlaylists(userIdentifier)
  }

  render() {
    return <div className={styles.Admin}>
      <div className={styles.UserIdentifier}>
        <div className={styles.UserIdentifierInput}>
        <span className={styles.UserIdentifierTitle}>User Identifer:</span>
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
        <div className={this.props.userIdentifier ? styles.smallButton : styles.disabledSmallButton} onClick={this.onFetch}>
          Fetch lists
        </div>
        <div className={this.props.playlists.length !== 0 ? styles.smallButton : styles.disabledSmallButton} onClick={this.clonePlaylists}>
          Clone
        </div>
        <div className={styles.smallButton} onClick={this.generateNewUserIdentifier}>
          Create new
        </div>
      </div>
      <div className={styles.TimeConfiguration}>
        <div>Max play duration (min): <input type="number" value={this.props.maxPlayTime} size={5} min={10} max={180} step={5} onChange={this.updateMaxPlayTime}/></div>
        <div>Minimal break duration (min): <input type="number" value={this.props.minRestTime} size={5} min={10} max={180} step={5} onChange={this.updateMinRestTime}/></div>
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
            onMoveToTop={() => this.movePlaylistToTop(id)}
            onMoveToBottom={() => this.movePlaylistToBottom(id)}
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
