import { updateVideoList, updateIsVideoDisplayed } from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  // onUpdatePlaylists: (playlists) => dispatch(updatePlaylists(playlists)),
  onUpdateVideoList: (videoList) => dispatch(updateVideoList(videoList)),
  // onUpdateIsVideoDisplayed: (isVideoDisplayed) => dispatch(updateIsVideoDisplayed(isVideoDisplayed))
})

export default mapDispatchToProps
