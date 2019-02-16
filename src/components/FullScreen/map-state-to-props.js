const mapStateToProps = ({ main }) => ({
  selectedVideo: main.selectedVideo,
  player: main.player,
  isPlaybackInProgress: main.isPlaybackInProgress,
})

export default mapStateToProps
