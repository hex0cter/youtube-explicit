const mapStateToProps = ({ main }) => ({
  userIdentifier: main.userIdentifier,
  videoList: main.videoList,
  playlists: main.playlists,
  selectedVideo: main.selectedVideo,
})

export default mapStateToProps
