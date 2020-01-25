const mapStateToProps = ({ main }) => ({
  userIdentifier: main.userIdentifier,
  videoList: main.videoList,
  videosByTimestamp: main.videosByTimestamp,
  videosByPlaylist: main.videosByPlaylist,
  videoSortingMode: main.videoSortingMode,
  playlists: main.playlists,
  selectedVideo: main.selectedVideo,
  maxPlayTime: main.maxPlayTime,
  minRestTime: main.minRestTime,
  uiMode: main.uiMode,
  isPlaybackInProgress: main.isPlaybackInProgress,
  isUserInteractionAllowed: main.isUserInteractionAllowed,
  player: main.player,
  startRestTime: main.startRestTime,
  startPlayTime: main.startPlayTime,
  userMode: main.userMode,
  forceReposition: main.forceReposition,
  playbackProgress: main.playbackProgress
})

export default mapStateToProps
