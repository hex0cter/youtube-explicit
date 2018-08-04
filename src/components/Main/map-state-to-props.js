const mapStateToProps = ({ main }) => ({
  userIdentifier: main.userIdentifier,
  videoList: main.videoList,
  playlists: main.playlists
})

export default mapStateToProps
