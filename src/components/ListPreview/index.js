import React from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'
import styles from './index.module.css'

class ListPreview extends React.Component {
  play = (videoIndex) => {
    this.props.onUpdateSelectedVideo(videoIndex)
  }

  editingUserIdentifier = (e) => {
    console.log('editing')
    const userIdentifier = e.target.value
    this.props.onUpdateUserIdentifier(userIdentifier)
  }

  updateUserIdentifier = async() => {
    const userIdentifier = this.props.userIdentifier.trim()
    localStorage.setItem('userIdentifier', userIdentifier)
    window.location.reload()
  }

  render() {
    return (
      <div>
        <div className={styles.AppDescriptor}>
          <div className={styles.AppTitle}><img src='/logo192.png' alt='youtube' height='30px'/> YouTube</div>
          <div className={styles.UserIdentifier}>
            <div className={styles.UserIdentifierInput}>
              <input
                type='text'
                className={styles.InputText}
                onChange={this.editingUserIdentifier}
                value={this.props.userIdentifier || ''}
                placeholder='User identifier'
              />
            </div>
            <div className={styles.Button} onClick={this.updateUserIdentifier}>Update</div>
            <div className={styles.Button} onClick={() => {window.location = '/admin'}}>?</div>
          </div>
        </div>
        {this.props.videoList.map((playlist, currentPlaylistIndex) => {
          return (
            <div
              className={styles.Playlist}
              key={currentPlaylistIndex}
            >
              {playlist.items.map((video, currentVideoIndex) => {
                return (
                  <div
                    className={styles.ListCell}
                    key={currentVideoIndex}
                    onClick={() => this.play({playlistIndex: currentPlaylistIndex, videoIndex: currentVideoIndex})}
                  >
                    <div>
                      <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title}/>
                    </div>
                    <div className={styles.VideoTitle}>{video.snippet.title}</div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPreview)
