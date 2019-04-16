const mapStateToProps = ({ main }) => ({
  userIdentifier: main.userIdentifier,
  videoList: main.videoList,
  playlists: main.playlists,
  selectedVideo: main.selectedVideo,
  maxPlayTime: main.maxPlayTime,
  minRestTime: main.minRestTime,
  uiMode: main.uiMode,
  isPlaybackInProgress: main.isPlaybackInProgress,
  player: main.player
})

export default mapStateToProps
