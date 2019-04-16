import { updateSelectedVideo, updateUserIdentifier, updateUIMode } from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateUserIdentifier: (userIdentifier) => dispatch(updateUserIdentifier(userIdentifier)),
  onUpdateSelectedVideo: (videoIndex) => dispatch(updateSelectedVideo(videoIndex)),
  onUpdateUIMode: (mode) => dispatch(updateUIMode(mode))
})

export default mapDispatchToProps
