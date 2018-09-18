import { updateSelectedVideo, updateUserIdentifier } from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateUserIdentifier: (userIdentifier) => dispatch(updateUserIdentifier(userIdentifier)),
  onUpdateSelectedVideo: (videoIndex) => dispatch(updateSelectedVideo(videoIndex))
})

export default mapDispatchToProps
