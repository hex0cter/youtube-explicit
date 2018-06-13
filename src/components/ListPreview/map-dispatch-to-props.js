import { updateSelectedVideo } from '../../actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateSelectedVideo: (videoIndex) => dispatch(updateSelectedVideo(videoIndex))
})

export default mapDispatchToProps
