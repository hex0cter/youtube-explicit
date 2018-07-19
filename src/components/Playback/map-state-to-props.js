const mapStateToProps = ({ main }) => {
  return {
    videoList: main.videoList,
    selectedVideo: main.selectedVideo
  }
  }

export default mapStateToProps
