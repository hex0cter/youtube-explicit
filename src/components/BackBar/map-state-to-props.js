const mapStateToProps = ({ main }) => {
  return {
    isPlaybackInProgress: main.isPlaybackInProgress,
    videoList: main.videoList,
    selectedVideo: main.selectedVideo
  }
}

export default mapStateToProps
