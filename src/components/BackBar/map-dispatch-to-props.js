import { updateSelectedVideo, updatePlaybackProgress } from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdatePlaybackProgress: (progress) => dispatch(updatePlaybackProgress(progress)),
  onUpdateSelectedVideo: (videoIndex) => dispatch(updateSelectedVideo(videoIndex))
})

export default mapDispatchToProps
