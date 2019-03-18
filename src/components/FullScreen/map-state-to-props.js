const mapStateToProps = ({ main }) => ({
  selectedVideo: main.selectedVideo,
  player: main.player,
  isPlaybackInProgress: main.isPlaybackInProgress,
  startPlayTime: main.startPlayTime,
  startRestTime: main.startRestTime,
  isUserInteractionAllowed: main.isUserInteractionAllowed,
  maxPlayTime: main.maxPlayTime,
  minRestTime: main.minRestTime
})

export default mapStateToProps
