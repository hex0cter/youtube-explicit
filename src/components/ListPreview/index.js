import React from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'
import styles from './index.module.css'
import * as modes from '../Main/modes'
import WrenchIcon from '../SVG/wrench'
import QuestionIcon from '../SVG/question'
import RefreshIcon from '../SVG/refresh'

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

  componentDidMount = () => {
    const element = document.getElementById('selected-cell')
    if (element) {
      element.scrollIntoView({behavior: "auto", block: "center", inline: "center"});
    }
  }

  render() {
    const { playlistIndex, videoIndex } = this.props.selectedVideo

    return (
      <div>
        <div className={styles.TopBar}>
          <div className={styles.AppTitle}>
            <a href='/'><img src='/logo192.png' alt='youtube' className={styles.YoutubeLogo} /></a><span className={styles.LogoTitle}> YouTube </span><span className={styles.Tiny}>Explicit</span>
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
            <div className={styles.Button} onClick={this.updateUserIdentifier}>
              <RefreshIcon />
            </div>
            <div className={styles.Button} onClick={() => {window.location = '/admin'}}>
              <WrenchIcon />
            </div>
            <div className={styles.Button} onClick={() => {window.location = '/about'}}>
              <QuestionIcon />
            </div>
          </div>
        </div>
        {this.props.videoList.map((playlist, currentPlaylistIndex) => {
          return (
            <div
              className={styles.Playlist}
              key={currentPlaylistIndex}
              id={playlistIndex === currentPlaylistIndex ? 'selected-row' : null}
            >
              {playlist.items.map((video, currentVideoIndex) => {
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
                    <div className={styles.VideoTitle}>
                      <div>{video.snippet.title}</div>
                      <div className={styles.PublishedAt}>{(new Date(video.snippet.publishedAt)).toLocaleString('en-GB')}</div>
                    </div>
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
