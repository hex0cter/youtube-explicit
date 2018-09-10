import React from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'
import styles from './index.module.css'

class ListPreview extends React.Component {
  play = (videoIndex) => {
    this.props.onUpdateSelectedVideo(videoIndex)
  }

  render() {
    const { playlistIndex, videoIndex } = this.props.selectedVideo

    return (
      <div>
        <div className={styles.AppDescriptor}>
          <div className={styles.AppTitle}>YouTube Explicit<br/></div>
          <div className={styles.UserIdentifier}>
            <div className={styles.UserIdentifierInput}>
              <input type='text' className={styles.InputText} value={this.props.userIdentifier} onChange={this.editingUserIdentifier} placeholder='User identifier' />
            </div>
            <div className={styles.myButton} onClick={this.updateUserIdentifier}>Update</div>
            <div className={styles.myButton} onClick={() => {window.location = '/admin'}}>?</div>
          </div>
        </div>
        {this.props.videoList.map((playlist, currentPlaylistIndex) => {
          return (
            <div
              className={styles.ListPreview}
              key={currentPlaylistIndex}
            >
              {playlist.items.map((video,currentVideoIndex) => {
                return (
                  <div
                    className={styles.ListCell}
                    key={currentVideoIndex}
                    onClick={() => this.play({playlistIndex: currentPlaylistIndex, videoIndex: currentVideoIndex})}
                    style={{
                      backgroundImage: `url(${video.snippet.thumbnails.high.url})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}
                  >
                    {video.snippet.title}
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
