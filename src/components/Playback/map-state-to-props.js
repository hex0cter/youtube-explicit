const mapStateToProps = ({ main }) => {
  return {
    videoList: main.videoList,
    selectedVideo: main.selectedVideo,
    userIdentifier: main.userIdentifier
  }
}

export default mapStateToProps
