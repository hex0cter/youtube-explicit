import React from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'
import styles from './index.module.css'
import * as modes from '../Main/modes'

class ListPreview extends React.Component {
  play = ({playlistIndex, videoIndex}) => {
    this.props.onUpdateSelectedVideo({playlistIndex, videoIndex})
    this.props.onUpdateUIMode(modes.UI_PLAYBACK_MODE)
  }

  editingUserIdentifier = (e) => {
    const userIdentifier = e.target.value
    this.props.onUpdateUserIdentifier(userIdentifier)
  }

  keyDownInUserIdentifier = async (e) => {
    if (e.key === 'Enter') {
      const userIdentifier = e.target.value.trim()
      localStorage.setItem('userIdentifier', userIdentifier)
      window.location.reload()
    }
  }

  updateUserIdentifier = async() => {
    if (!this.props.userIdentifier) {
      return
    }

    const userIdentifier = this.props.userIdentifier.trim()
    localStorage.setItem('userIdentifier', userIdentifier)
    window.location.reload()
  }

  focusUserIdentifier = () => {
    this.props.onUpdateSelectedVideo({playlistIndex: 0, videoIndex: null})
  }

  render() {
    const { playlistIndex, videoIndex } = this.props.selectedVideo

    return (
      <div>
        <div className={styles.TopBar}>
          <div className={styles.AppTitle}>
            <a href='/'><img src='/logo192.png' alt='youtube' className={styles.YoutubeLogo} /></a> YouTube
          </div>
          <div className={styles.UserIdentifier}>
            <div className={styles.UserIdentifierInput}>
              <input
                type='text'
                id='user-identifier-input'
                className={styles.InputText}
                onChange={this.editingUserIdentifier}
                onKeyDown={this.keyDownInUserIdentifier}
                onFocus={this.focusUserIdentifier}
                value={this.props.userIdentifier || ''}
                placeholder='Identifier'
                size={10}
              />
            </div>
            <div className={styles.Button} onClick={this.updateUserIdentifier}>Refresh</div>
            <div className={styles.Button} onClick={() => {window.location = '/about'}}>?</div>
          </div>
        </div>
        {this.props.videoList.map((playlist, currentPlaylistIndex) => {
          return (
            <div
              className={styles.Playlist}
              key={currentPlaylistIndex}
            >
              {playlist.items.map((video, currentVideoIndex) => {
                if (!video.snippet.thumbnails) {
                  return null
                }
                const isCellSeleted = playlistIndex === currentPlaylistIndex && videoIndex === currentVideoIndex
                return (
                  <div
                    className={isCellSeleted ? styles.ActiveListCell : styles.ListCell}
                    id={isCellSeleted ? 'selected-cell' : null}
                    ref={ (ref) => {if(isCellSeleted) {this.myRef=ref}} }
                    key={currentVideoIndex}
                    onClick={() => this.play({playlistIndex: currentPlaylistIndex, videoIndex: currentVideoIndex})}
                  >
                    <div className={styles.VideoImage}>
                      <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className={styles.VideoImage}/>
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
