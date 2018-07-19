const mapStateToProps = ({ main }) => ({
  videoList: main.videoList,
  listPreviewVisibility: main.listPreviewVisibility,
  selectedVideo: main.selectedVideo
})

export default mapStateToProps
