const mapStateToProps = (state) => ({
  videoList: state.videoList,
  listPreviewVisibility: state.listPreviewVisibility,
  selectedVideo: state.selectedVideo
})

export default mapStateToProps
