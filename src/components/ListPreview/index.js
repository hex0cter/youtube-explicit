import React from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'
import styles from './index.module.css'

class ListPreview extends React.Component {
  play = (videoId) => {
    console.log('playing', videoId)
    this.props.onUpdateSelectedVideo(videoId)
  }

  render() {
    console.log('ListPreview props', this.props.videoList)
    return (
      <div className={this.props.listPreviewVisibility ? styles.ListPreview : styles.Hidden}>
        {this.props.videoList.map((_v1, playlistIndex) => {
          console.log('playlistIndex', playlistIndex)
          console.log('this.props.videoList[playlistIndex]', this.props.videoList[playlistIndex])
          return this.props.videoList[playlistIndex].items.map((video, videoIndex) => {
            // debugger
            console.log('>>>>> video.snippet', video.snippet)
            return (
              <div className={styles.ListCell}
                key={`${playlistIndex}-${videoIndex}`}
                onClick={() => this.play({playlistIndex, videoIndex})}
                style={{
                  backgroundImage: `url(${video.snippet.thumbnails.medium.url})`,
                  minWidth: '320px',
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
