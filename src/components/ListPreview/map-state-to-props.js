const mapStateToProps = ({ main }) => ({
  videoList: main.videoList,
  userIdentifier: main.userIdentifier,
  selectedVideo: main.selectedVideo
})

export default mapStateToProps
