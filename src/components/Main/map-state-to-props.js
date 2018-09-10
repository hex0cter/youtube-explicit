const mapStateToProps = ({ main }) => ({
  userIdentifier: main.userIdentifier,
  videoList: main.videoList,
  playlists: main.playlists,
  selectedVideo: main.selectedVideo,
  // isVideoDisplayed: main.isVideoDisplayed
})

export default mapStateToProps
