import { updateSelectedVideo, updateIsPlaybackInProgress, updatePlaybackProgress } from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateSelectedVideo: (videoIndex) => dispatch(updateSelectedVideo(videoIndex)),
  onUpdatePlaybackProgress: (progress) => dispatch(updatePlaybackProgress(progress)),
  onUpdateIsPlaybackInProgress: (isPlaybackInProgress) => dispatch(updateIsPlaybackInProgress(isPlaybackInProgress))
})

export default mapDispatchToProps
