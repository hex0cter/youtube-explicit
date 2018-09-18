import { updateSelectedVideo, updateIsPlaybackInProgress } from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateSelectedVideo: (videoIndex) => dispatch(updateSelectedVideo(videoIndex)),
  onUpdateIsPlaybackInProgress: (isPlaybackInProgress) => dispatch(updateIsPlaybackInProgress(isPlaybackInProgress))
})

export default mapDispatchToProps
