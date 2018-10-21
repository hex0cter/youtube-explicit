const mapStateToProps = ({ main }) => {
  return {
    videoList: main.videoList,
    selectedVideo: main.selectedVideo,
    isPlaybackInProgress: main.isPlaybackInProgress,
    playbackProgress: main.playbackProgress
  }
}

export default mapStateToProps
