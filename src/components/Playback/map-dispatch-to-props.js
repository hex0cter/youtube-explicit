import { updateListVisibilty, updateSelectedVideo } from '../../actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateListVisibilty: (visibility) => dispatch(updateListVisibilty(visibility)),
  onUpdateSelectedVideo: (videoIndex) => dispatch(updateSelectedVideo(videoIndex))
})

export default mapDispatchToProps
