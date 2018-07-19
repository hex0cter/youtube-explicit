import { updateListVisibilty, updateSelectedVideo } from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateListVisibilty: (visibility) => dispatch(updateListVisibilty(visibility)),
  onUpdateSelectedVideo: (videoIndex) => dispatch(updateSelectedVideo(videoIndex))
})

export default mapDispatchToProps
