import { updateSelectedVideo, updatePlaybackProgress, updateUIMode } from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdatePlaybackProgress: (progress) => dispatch(updatePlaybackProgress(progress)),
  onUpdateSelectedVideo: (videoIndex) => dispatch(updateSelectedVideo(videoIndex)),
  onUpdateUIMode: (mode) => dispatch(updateUIMode(mode))
})

export default mapDispatchToProps
