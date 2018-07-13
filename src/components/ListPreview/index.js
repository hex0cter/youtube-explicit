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
    const {playlistIndex, videoIndex} = this.props.selectedVideo
    return (
      <div className={this.props.listPreviewVisibility ? styles.ListPreview : styles.Hidden}>
        {this.props.videoList.map((_v1, currentPlaylistIndex) => {
          return this.props.videoList[currentPlaylistIndex].items.map((video, currentVideoIndex) => {
            return (
              <div className={currentPlaylistIndex === playlistIndex && currentVideoIndex === videoIndex ? styles.ListActiveCell : styles.ListCell}
                key={`${currentPlaylistIndex}-${currentVideoIndex}`}
                onClick={() => this.play({playlistIndex: currentPlaylistIndex, videoIndex: currentVideoIndex})}
                style={{
                  backgroundImage: `url(${video.snippet.thumbnails.high.url})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  minWidth: '300px',
                }}
              >
                {video.snippet.title}
              </div>
            )}
          )
        })}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPreview)
