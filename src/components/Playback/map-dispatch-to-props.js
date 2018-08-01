import { updateListVisibilty, updateSelectedVideo, updateUserIdentifier } from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateListVisibilty: (visibility) => dispatch(updateListVisibilty(visibility)),
  onUpdateSelectedVideo: (videoIndex) => dispatch(updateSelectedVideo(videoIndex)),
  onUpdateUserIdentifier: (userIdentifier) => dispatch(updateUserIdentifier(userIdentifier))
})

export default mapDispatchToProps
