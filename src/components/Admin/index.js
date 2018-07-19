import React from 'react'
import styles from './index.module.css'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'
import shortid from 'shortid'

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
    const playlists = this.props.playlists.filter(line => line.length > 16)
    console.log('playlists', playlists)
    // TODO: update the list to the server
  }

  fetchPlaylists = async() => {
    // TODO: fetch the list from the server
  }

  render() {
    console.log('playlists', this.props.playlists)
    return <div className={styles.Admin}>
      User Identifer:
      <input type="input" name="userIdentifier" value={this.props.userIdentifier} onChange={this.changeUserIdentifier} />
      <button onClick={this.generateNewUserIdentifier}>Generate new</button>
      <button onClick={this.fetchPlaylists}>Fetch the list</button><br/>
      Filling in the IDs of your favourite playlists:<br/>
      <textarea rows="20" cols="50" onChange={this.updatePlaylists} value={this.props.playlists.join('\n')} />
      <br/>
      <button onClick={this.submitPlaylists}>Submit</button>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
