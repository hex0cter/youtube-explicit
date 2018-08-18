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
    await axios.post(`https://api.solna.xyz/v1/playlists`, params)
  }

  fetchPlaylists = async() => {
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

  componentDidMount = async() => {
    await this.fetchPlaylists()
  }

  render() {
    return <div className={styles.Admin}>
      User Identifer:
      <input type="input" name="userIdentifier" value={this.props.userIdentifier} onChange={this.changeUserIdentifier} />
      <button onClick={this.generateNewUserIdentifier}>Generate new</button>
      <button onClick={this.fetchPlaylists}>Fetch my list</button><br/>
      Filling in the IDs of your favourite playlists:<br/>
      <textarea rows="20" cols="50" onChange={this.updatePlaylists} value={this.props.playlists.join('\n')} />
      <br/>
      <button onClick={this.submitPlaylists}>Submit</button>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
