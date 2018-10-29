import React from 'react'
import styles from './index.module.css'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'
import shortid from 'shortid'
import axios from 'axios'

class Admin extends React.Component {
  generateNewUserIdentifier = () => {
    this.props.onUpdateUserIdentifier(shortid.generate())
  }

  changeUserIdentifier = (e) => {
    this.props.onUpdateUserIdentifier(e.target.value)
  }

  updatePlaylists = (e) => {
    console.log(e.target.value)
    this.props.onUpdatePlayLists(e.target.value.split('\n'))
  }

  submitPlaylists = async() => {
    const userIdentifier = this.props.userIdentifier.trim()
    localStorage.setItem('userIdentifier', userIdentifier)

    const playlists = this.props.playlists.filter(line => line.length > 16)
    const params = {
      user: userIdentifier,
      playlists
    }
    const element = document.getElementById('playlist_textarea')
    await axios.post(`https://api.solna.xyz/v1/playlists`, params)
    element.select()
  }

  fetchPlaylists = async() => {
    const userIdentifier = this.props.userIdentifier.trim()
    localStorage.setItem('userIdentifier', userIdentifier)
    const element = document.getElementById('playlist_textarea')
    element.value = ''

    const response = await axios.get(`https://api.solna.xyz/v1/playlists?user=${userIdentifier}`)
    if (response.data === '') {
      console.log('This user does not exist:', userIdentifier)
      return
    }

    const playlists = response.data.playlists
    this.props.onUpdatePlayLists(playlists)

    element.select()
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
          <input type="text" className={styles.InputText} name="userIdentifier" value={this.props.userIdentifier} onChange={this.changeUserIdentifier} />
        </div>
        <div className={styles.smallButton} onClick={this.generateNewUserIdentifier}>
          Generate new
        </div>
        <div className={styles.smallButton} onClick={this.fetchPlaylists}>Fetch my list</div>
      </div>
      <div className={styles.Playlists}>
        <div className={styles.PlaylistsTitle}>
          Youtube playlists:<br/>
        </div>
        <div>
          <textarea
            id='playlist_textarea'
            rows="10"
            cols="34"
            onChange={this.updatePlaylists}
            value={this.props.playlists.join('\n')}
            className={styles.TextArea}
          />
        </div>
      </div>
      <div className={styles.Submit}>
        <div className={styles.BigButton} onClick={() => {window.location = '/'}}>Watch</div>
        <div className={styles.BigButton} onClick={this.submitPlaylists}>
          Submit
        </div>
      </div>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
