const mapStateToProps = ({ main }) => ({
  isPlaybackInProgress: main.isPlaybackInProgress,
  selectedVideo: main.selectedVideo,
  uiMode: main.uiMode
})

export default mapStateToProps
