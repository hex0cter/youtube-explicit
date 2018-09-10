const mapStateToProps = ({ main }) => {
  return {
    videoList: main.videoList,
    selectedVideo: main.selectedVideo,
    isPlaybackInProgress: main.isPlaybackInProgress
  }
}

export default mapStateToProps
