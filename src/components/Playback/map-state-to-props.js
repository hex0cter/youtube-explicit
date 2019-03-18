const mapStateToProps = ({ main }) => {
  return {
    videoList: main.videoList,
    selectedVideo: main.selectedVideo,
    isPlaybackInProgress: main.isPlaybackInProgress,
    playbackProgress: main.playbackProgress,
    isUserInteractionAllowed: main.isUserInteractionAllowed,
    startPlayTime: main.startPlayTime
  }
}

export default mapStateToProps
