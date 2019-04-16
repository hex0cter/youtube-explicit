const mapStateToProps = ({ main }) => {
  return {
    isPlaybackInProgress: main.isPlaybackInProgress,
    videoList: main.videoList,
    selectedVideo: main.selectedVideo,
    uiMode: main.uiMode
  }
}

export default mapStateToProps
