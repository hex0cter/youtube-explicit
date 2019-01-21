const mapStateToProps = ({ main }) => ({
  isPlaybackInProgress: main.isPlaybackInProgress,
  selectedVideo: main.selectedVideo
})

export default mapStateToProps
