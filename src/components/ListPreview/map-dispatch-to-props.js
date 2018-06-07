import { updateSelectedVideo } from '../../actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateSelectedVideo: (videoId) => dispatch(updateSelectedVideo(videoId))
})

export default mapDispatchToProps
